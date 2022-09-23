import React, { useState, useEffect } from 'react';
import {
  useDisclosure,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Button,
  RadioGroup,
  Radio,
  Grid,
  Switch,
  FormLabel,
  Input,
} from '@chakra-ui/core';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';

import { useClickOutside } from 'hooks/useClickOutside';
import { formatDate } from '../Entries/utils';
import { PipelineFilter } from '../types';
// import { useDispatch } from 'react-redux';
// import { addFilter } from '../slice';

const enquiryFilters = ['Date Added', 'Date Closed', 'Status', 'Country'];

interface FilterProps {
  isOpen: boolean;
  close: () => void;
  filter?: PipelineFilter;
  handleSubmit: (values: PipelineFilter) => void;
  column: string;
}

/*
const operatorOptions = [
  { label: 'Greater Than', value: 'greater than' },
  { label: 'Less Than', value: 'less than' },
  { label: 'Between', value: 'between' },
];
const TimeFilter: React.FC<FilterProps> = ({ isOpen, close, filter, handleSubmit }) => {
  const [operator, setOperator] = useState(operatorOptions[0]);
  const [_start, setStart] = useState(0);
  const [_end, setEnd] = useState(1);

  const onSubmit = () => {
    handleSubmit({
      column: 'Time in Pipe',
      operator: operator.value,
      value: operator.value === 'between' ? `${_start} and ${_end}` : _start,
    });
    close();
  };

  return (
    <Popover placement="auto" isOpen={isOpen}>
      <PopoverTrigger>
        <div style={{ visibility: 'hidden', width: '100%', height: '100%' }}></div>
      </PopoverTrigger>
      <PopoverContent
        zIndex={100}
        _focus={{ outline: 'none' }}
        position="absolute"
        border={0}
        minWidth={350}
      >
        <PopoverHeader textAlign="center" fontWeight={700} color="gray.600">
          Time in Pipe
        </PopoverHeader>
        <PopoverBody onClick={(e) => e.stopPropagation()}>
          <Select
            value={operator}
            options={operatorOptions}
            onChange={(selected) => setOperator(selected as any)}
          />
          <Grid
            templateColumns={operator.value === 'between' ? '1fr auto 1fr' : '1fr'}
            alignItems="center"
            columnGap={3}
          >
            <InputGroup size="md" my={2}>
              <Input
                type="number"
                rounded="0"
                value={_start}
                onChange={(e: any) => setStart(e.target.value)}
                isFullWidth
                min={0}
              />
              <InputRightAddon children="days" />
            </InputGroup>
            {operator.value === 'between' && (
              <>
                <Text textAlign="center" fontWeight={500}>
                  and
                </Text>
                <InputGroup size="md" my={2}>
                  <Input
                    type="number"
                    rounded="0"
                    value={_end}
                    onChange={(e: any) => setEnd(e.target.value)}
                    isFullWidth
                    min={0}
                  />
                  <InputRightAddon children="days" />
                </InputGroup>
              </>
            )}
          </Grid>
          <Button
            size="sm"
            isFullWidth
            variantColor="blue"
            variant="ghost"
            fontWeight={400}
            onClick={onSubmit}
          >
            Apply Filter
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
*/

const DateFilter: React.FC<FilterProps & { name: string }> = ({
  isOpen,
  close,
  filter,
  handleSubmit,
  column,
  name,
}) => {
  const dates = filter ? (filter.value as string).split(' and ') : [new Date(), new Date()];

  const [_start, setStart] = useState(new Date(dates[0]));
  const [_end, setEnd] = useState(new Date(dates[1]));

  const handleChange = (range: any) => {
    setStart(range.range1.startDate);
    setEnd(range.range1.endDate);
  };

  const onSubmit = () => {
    handleSubmit({
      column: name,
      operator: 'between',
      value: `${formatDate(_start)} and ${formatDate(_end)}`,
    });
    close();
  };

  return (
    <Popover placement="auto" isOpen={isOpen}>
      <PopoverTrigger>
        <div style={{ visibility: 'hidden', width: '100%', height: '100%' }}></div>
      </PopoverTrigger>
      <PopoverContent
        zIndex={100}
        _focus={{ outline: 'none' }}
        position="absolute"
        border={0}
        minWidth={350}
      >
        <PopoverHeader textAlign="center" fontWeight={700} color="gray.600">
          {name}
        </PopoverHeader>
        <PopoverBody onClick={(e) => e.stopPropagation()}>
          <DateRange
            ranges={[
              {
                startDate: _start,
                endDate: _end,
              },
            ]}
            onChange={handleChange}
          />
          <Button
            size="sm"
            isFullWidth
            variantColor="blue"
            variant="ghost"
            fontWeight={400}
            onClick={onSubmit}
          >
            Apply Filter
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const StatusFilter: React.FC<FilterProps> = ({ filter, handleSubmit, isOpen, close }) => {
  const [status, setStatus] = useState('Open');

  const onSubmit = () => {
    handleSubmit({ column: 'Status', operator: 'is', value: status });
    close();
  };

  return (
    <Popover placement="auto" isOpen={isOpen}>
      <PopoverTrigger>
        <div style={{ visibility: 'hidden', width: '100%', height: '100%' }}></div>
      </PopoverTrigger>
      <PopoverContent zIndex={100} _focus={{ outline: 'none' }} position="absolute" border={0}>
        <PopoverHeader textAlign="center" fontWeight={700} color="gray.600">
          Status
        </PopoverHeader>
        <PopoverBody onClick={(e) => e.stopPropagation()}>
          <RadioGroup
            defaultValue={status}
            size="sm"
            onChange={(e, val) => setStatus(val as string)}
          >
            <Radio variantColor="green" value="Open">
              Open
            </Radio>
            <Radio variantColor="red" value="Closed">
              Closed
            </Radio>
          </RadioGroup>
          <Button
            size="sm"
            isFullWidth
            variantColor="blue"
            variant="ghost"
            fontWeight={400}
            onClick={onSubmit}
            mt={2}
          >
            Apply Filter
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const CountryFilter: React.FC<FilterProps> = ({ column, handleSubmit, isOpen, close }) => {
  const [country, setCountry] = useState('');
  const [operator, setOperator] = useState('is');
  // const dispatch = useDispatch();

  const handleOpertatorChange = (e: React.FormEvent<any>) => {
    const op = operator === 'is' ? 'is not' : 'is';
    setOperator(op);
  };

  // const handleSubmit = () => {
  //   dispatch(
  //     addFilter({
  //       column,
  //       operator,
  //       value: country,
  //     })
  //   );
  //   close();
  // };
  const onSubmit = () => {
    handleSubmit({ column: 'Country', operator, value: country, });
    close();
  };
  

  return (
    <Popover placement="auto" isOpen={isOpen}>
      <PopoverTrigger>
        <div style={{ visibility: 'hidden', width: '100%', height: '100%' }}></div>
      </PopoverTrigger>
      <PopoverContent
        zIndex={100}
        _focus={{ outline: 'none' }}
        position="absolute"
        border={0}
        onClick={(e: any) => e.stopPropagation()}
        onKeyDown={(e: any) => e.stopPropagation()}
        onKeyPress={(e: any) => e.stopPropagation()}
        onMouseOver={(e: any) => e.stopPropagation()}
        onFocus={(e: any) => e.stopPropagation()}
        width="fit-content"
      >
        <PopoverHeader textAlign="center" fontWeight={700} color="gray.600">
          {column}
        </PopoverHeader>
        <PopoverBody>
          <Grid alignItems="center" templateColumns="auto 42px 200px" gridColumnGap={2}>
            <Switch
              id="country-operator"
              onChange={handleOpertatorChange}
              isChecked={operator === 'is'}
            />
            <FormLabel htmlFor="country-operator" padding={0} textAlign="center">
              {operator}
            </FormLabel>
            <Input value={country} onChange={(e: any) => setCountry(e.target.value)} />
          </Grid>
          <Button
            size="sm"
            isFullWidth
            variantColor="blue"
            variant="ghost"
            fontWeight={400}
            onClick={onSubmit}
            mt={2}
          >
            Apply Filter
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};



const DurationFilter: React.FC<FilterProps> = ({ filter, handleSubmit, isOpen, close }) => {
  const [duration, setDuration] = useState('Open');

  const onSubmit = () => {
    handleSubmit({
      column: 'Duration',
      operator: 'is',
      value: duration,
      displayValue: duration === 'Ongoing' ? 'Recurring' : duration,
    });
    close();
  };

  return (
    <Popover placement="auto" isOpen={isOpen}>
      <PopoverTrigger>
        <div style={{ visibility: 'hidden', width: '100%', height: '100%' }}></div>
      </PopoverTrigger>
      <PopoverContent zIndex={100} _focus={{ outline: 'none' }} position="absolute" border={0}>
        <PopoverHeader textAlign="center" fontWeight={700} color="gray.600">
          Status
        </PopoverHeader>
        <PopoverBody onClick={(e) => e.stopPropagation()}>
          <RadioGroup
            defaultValue={duration}
            size="sm"
            onChange={(e, val) => setDuration(val as string)}
          >
            <Radio value="Once Off">Once Off</Radio>
            <Radio value="Ongoing">Recurring</Radio>
          </RadioGroup>
          <Button
            size="sm"
            isFullWidth
            variantColor="blue"
            variant="ghost"
            fontWeight={400}
            onClick={onSubmit}
            mt={2}
          >
            Apply Filter
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

interface MenuItemProps {
  label: string;
  current?: string;
  setCurrent: (label?: string) => void;
  close: () => void;
  handleSubmit: (values: any) => void;
  filter?: PipelineFilter;
  column: string;
}

const FilterMenuItem: React.FC<MenuItemProps> = ({
  label,
  current,
  setCurrent,
  close,
  handleSubmit,
  filter,
  column
}) => {
  const onClose = () => {
    setCurrent(undefined);
    close();
  };

  return (
    <>
      <MenuItem as="div" onClick={() => setCurrent(current === label ? undefined : label)}>
        <Text w="100%" fontFamily="inherit" color={current === label ? 'purple.600' : undefined}>
          {label}
        </Text>
        {label === 'Date Added' && (
          <DateFilter
            column=""
            name="Date Added"
            isOpen={current === 'Date Added'}
            close={onClose}
            handleSubmit={handleSubmit}
            filter={filter}
          />
        )}
        {label === 'Date Closed' && (
          <DateFilter
            column=""
            name="Date Closed"
            isOpen={current === 'Date Closed'}
            close={onClose}
            handleSubmit={handleSubmit}
            filter={filter}
          />
        )}
        {label === 'Status' && (
          <StatusFilter
            column=""
            isOpen={current === 'Status'}
            close={onClose}
            handleSubmit={handleSubmit}
            filter={filter}
          />
        )}
        {label === 'Country' && (
          <CountryFilter
            column=""
            isOpen={current === 'Country'}
            close={onClose}
            handleSubmit={handleSubmit}
            filter={filter}
          />
        )}
        {label === 'Duration' && (
          <DurationFilter
            column=""
            isOpen={current === 'Duration'}
            close={onClose}
            handleSubmit={handleSubmit}
            filter={filter}
          />
        )}
      </MenuItem>
    </>
  );
};

interface Props {
  filters: PipelineFilter[];
  setFilters: (filters: PipelineFilter[]) => void;
}

const FilterMenu: React.FC<Props> = ({ filters, setFilters }) => {
  const [current, setCurrent] = useState<string>();
  const { onToggle, isOpen, onClose } = useDisclosure();

  const handleClick = (e: MouseEvent) => {
    // @ts-ignore
    if (!e.path.find((x) => x.id === 'menu')) {
      setCurrent(undefined);
      onClose();
    }
  };

  const ref = useClickOutside(handleClick, isOpen);

  useEffect(() => {
    if (!current) onClose();
  }, [current, onClose]);

  const handleSubmit = (filter: PipelineFilter) => {
    const current = filters.filter((x) => x.column !== filter.column);
    setFilters([...current, filter]);
  };

  return (
    <Menu closeOnSelect={false} isOpen={isOpen}>
      <MenuButton
        as={IconButton}
        //@ts-ignore
        icon="add"
        size="sm"
        onClick={onToggle}
        mr={2}
        mb={2}
      />
      <div ref={ref}>
        <MenuList fontSize="0.85em" placement="bottom-start" id="menu">
          <MenuGroup title="Filter Column">
            {enquiryFilters.map((filter) => (
              <FilterMenuItem
                key={filter}
                label={filter}
                current={current}
                setCurrent={setCurrent}
                close={onClose}
                handleSubmit={handleSubmit}
                column={""}
              />
            ))}
          </MenuGroup>
        </MenuList>
      </div>
    </Menu>
  );
};

export default FilterMenu;