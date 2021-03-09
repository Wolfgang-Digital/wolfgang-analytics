import React, { useState, useMemo } from 'react';
import {
  Box,
  Text,
  Stack,
  Collapse,
  Button,
  useDisclosure,
  Grid,
  Input,
  IconButton,
} from '@chakra-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';

import {
  PipelineFilter,
  getFilters,
  addFilter,
  removeFilter,
  clearFilters,
  fetchEntries,
  getQueryString,
} from './slice';
import { channels } from './CreateEntry';

const columns = [
  { label: 'Date', value: 'created_at' },
  { label: 'Company', value: 'company_name' },
  { label: 'Country', value: 'country' },
  { label: 'Leads', value: 'led_by' },
  { label: 'Channels', value: 'channels' },
  { label: 'Source', value: 'source' },
  { label: 'SEO FMV', value: 'seo_fmv' },
  { label: 'PPC FMV', value: 'ppc_fmv' },
  { label: '12M Value', value: 'twelve_month_value' },
];

const operators = [
  { label: 'Contains', value: 'ILIKE' },
  { label: 'Equals', value: '=' },
  { label: 'Between', value: 'BETWEEN' },
];

const FilterItem: React.FC<{ filter: PipelineFilter }> = ({ filter }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeFilter(filter));
  };

  const value =
    typeof filter.value === 'string'
      ? filter.value.replace(/'|"|\{|\}/g, '').replace(/,/g, ', ')
      : filter.value;

  return (
    <Grid
      mt={2}
      templateColumns="auto 1fr"
      columnGap={2}
      backgroundColor="gray.200"
      borderRadius={4}
      fontSize="0.85em"
      fontWeight={500}
      p={2}
      alignItems="center"
    >
      <IconButton
        icon="delete"
        aria-label="Remove filter"
        variantColor="red"
        size="xs"
        variant="ghost"
        onClick={handleDelete}
      />
      <Text>{`${filter.column.label} ${filter.operator.label.toLowerCase()} ${value}`}</Text>
    </Grid>
  );
};

const Filters: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, onToggle } = useDisclosure();
  const [column, setColumn] = useState<typeof columns[number]>();
  const [operator, setOperator] = useState<typeof operators[number]>();
  const [value, setValue] = useState<string | number>('');
  const [altValue, setAltValue] = useState<string | number>('');
  const [channel, setChannels] = useState<string[]>([]);

  const filters = useSelector(getFilters);
  const query = useSelector(getQueryString);

  const handleColumnChange = (column: typeof columns[number]) => {
    if (['company_name', 'led_by', 'country', 'channels', 'source'].includes(column.value)) {
      setOperator(operators[0]);
    } else if (['ppc_fmv', 'seo_fmv', 'twelve_month_value'].includes(column.value)) {
      setOperator(operators[1]);
    }
    setColumn(column);
  };

  const handleAdd = (e: any) => {
    e.preventDefault();
    if (
      column &&
      operator &&
      ((typeof value === 'string' && value.length > 0) || column?.value === 'channels')
    ) {
      const valueStr =
        column.value === 'channels'
          ? channel.join(',')
          : operator.value === 'BETWEEN'
          ? `'${value}' and '${altValue}'`
          : typeof value === 'string'
          ? `'${value}'`
          : value;

      dispatch(
        addFilter({
          column: column,
          operator: operator,
          value: valueStr,
        })
      );
      setValue('');
      setAltValue('');
    }
  };

  const handleApply = () => {
    dispatch(fetchEntries(query));
  };

  const handleMultiSelectChange = (values: any) => {
    setChannels(values?.map((v: any) => v.value) || []);
  };

  const currentChannels = useMemo(() => {
    return channel.map((c: any) => ({ label: c, value: c }));
  }, [channel]);

  const renderControls = () => {
    switch (column?.value) {
      case undefined:
        return null;

      case 'channels':
        return (
          <>
            <Text fontWeight={500} color="gray.600">
              Contains
            </Text>
            <Select
              value={currentChannels}
              placeholder="Select channels..."
              options={channels}
              isMulti
              styles={{
                container: (base) => ({
                  ...base,
                  minWidth: '200px',
                }),
              }}
              onChange={handleMultiSelectChange}
            />
          </>
        );

      case 'created_at':
        return (
          <>
            <Select
              value={operator}
              placeholder="Select operator..."
              options={operators.filter((o) => o.value !== 'like')}
              styles={{
                container: (base) => ({
                  ...base,
                  minWidth: '200px',
                }),
              }}
              onChange={(selected: any) => setOperator(selected)}
            />
            {operator?.value === 'BETWEEN' ? (
              <Grid templateColumns="1fr 1fr" columnGap={4}>
                <Input
                  placeholder="Start date (yyyy-mm-dd)"
                  value={value}
                  onChange={(e: any) => setValue(e.target.value)}
                />
                <Input
                  placeholder="End date (yyyy-mm-dd)"
                  value={altValue}
                  onChange={(e: any) => setAltValue(e.target.value)}
                />
              </Grid>
            ) : (
              <Input value={value} onChange={(e: any) => setValue(e.target.value)} />
            )}
          </>
        );

      default:
        return (
          <>
            <Text fontWeight={500} color="gray.600">
              {operator?.label}
            </Text>
            <Input value={value} onChange={(e: any) => setValue(e.target.value)} />
          </>
        );
    }
  };

  return (
    <Box>
      <Stack align="center" isInline spacing={4}>
        <Button
          leftIcon={isOpen ? 'minus' : 'add'}
          fontWeight={400}
          size="xs"
          variantColor="blue"
          onClick={onToggle}
        >
          Filters
        </Button>
        <Button
          fontWeight={400}
          size="xs"
          variantColor="red"
          onClick={() => dispatch(clearFilters())}
        >
          Clear Filters
        </Button>
        <Button fontWeight={400} size="xs" variantColor="teal" onClick={handleApply}>
          Apply Filters
        </Button>
        <Text fontSize="0.9rem" color="gray.500">
          Current: {filters.length}
        </Text>
      </Stack>
      <Collapse isOpen={isOpen}>
        <Grid templateColumns="200px 1fr" mt={2} gridColumnGap={4} alignItems="center">
          <Select
            value={column}
            placeholder="Select column..."
            options={columns}
            onChange={handleColumnChange as any}
          />
          <Grid
            as="form"
            onSubmit={handleAdd}
            templateColumns="auto 1fr auto"
            alignItems="center"
            gridColumnGap={4}
          >
            {renderControls()}
            <IconButton
              icon="add"
              aria-label="Add filter"
              variantColor="blue"
              onClick={handleAdd}
              isDisabled={!column}
            />
          </Grid>
        </Grid>
        <Stack spacing={2}>
          {filters.map((filter, i) => (
            <FilterItem key={i} filter={filter} />
          ))}
        </Stack>
      </Collapse>
    </Box>
  );
};

export default Filters;
