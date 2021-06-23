import React from 'react';
import { Stack, Tag, TagLabel, TagCloseButton, Text, IconButton } from '@chakra-ui/core';

import FilterMenu from './FilterMenu';
import { PipelineFilter } from '../types';

const renderDate = (filter: PipelineFilter) => {
  const dates = filter.value.toString().split(' and ');
  if (dates[0] === dates[1]) {
    return (
      <>
        {' is '}
        <Text as="span" fontWeight={700}>
          {dates[0]}
        </Text>
      </>
    );
  }
  return (
    <>
      {` ${filter.operator} `}
      <Text as="span" fontWeight={700}>
        {filter.value.toString().split(' and ')[0]}
      </Text>
      <Text as="span" fontWeight={400}>
        {' and '}
      </Text>
      <Text as="span" fontWeight={700}>
        {filter.value.toString().split(' and ')[1]}
      </Text>
    </>
  );
};

const renderContains = (filter: PipelineFilter) => {
  const values = filter.displayValue?.toString().split(',') || filter.value.toString().split(',');

  return (
    <Text as="span" fontWeight={400}>
      {` ${filter.operator} `}
      {values.map((value, i) => (
        <span key={value}>
          {i > 0 && ' or '}
          <Text as="span" fontWeight={700}>
            {value}
          </Text>
        </span>
      ))}
    </Text>
  );
};

interface Props {
  filters: PipelineFilter[];
  setFilters: (filters: PipelineFilter[]) => void;
}

export const FilterList: React.FC<Props> = ({ filters, setFilters }) => {
  const removeFilter = (filter: PipelineFilter) => {
    setFilters(filters.filter((x) => x.column !== filter.column));
  };

  return (
    <Stack isInline mb={4} align="center" className="pipeline-filters" flexWrap="wrap">
      {filters.length > 0 && (
        <IconButton
          size="sm"
          icon="delete"
          aria-label="Clear filter"
          onClick={() => setFilters([])}
          margin="0px 8px 8px 0"
          variantColor="red"
          variant="outline"
        />
      )}
      <FilterMenu filters={filters} setFilters={setFilters} />
      {filters.length === 0 && (
        <Text fontSize="0.9em" fontWeight={500} transform="translateY(-4px)">
          No Filters
        </Text>
      )}
      {filters.map((filter, i) => (
        <Tag key={i} mb={2}>
          <TagLabel fontSize="0.85rem" fontWeight={400} pr={2} color="gray.600">
            <Text as="span" fontWeight={700}>
              {filter.column}
            </Text>
            {filter.column.toLowerCase().includes('date') ? (
              renderDate(filter)
            ) : filter.operator === 'contains' ? (
              renderContains(filter)
            ) : (
              <>
                {` ${filter.operator} `}
                <Text as="span" fontWeight={700}>
                  {filter.displayValue || filter.value}{filter.column === 'Time in Pipe' && ' days'}
                </Text>
              </>
            )}
          </TagLabel>
          <TagCloseButton onClick={() => removeFilter(filter)} />
        </Tag>
      ))}
    </Stack>
  );
};
