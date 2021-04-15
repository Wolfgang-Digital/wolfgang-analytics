import React from 'react';
import { Stack, Tag, TagLabel, TagCloseButton, Text } from '@chakra-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { getFilters, removeFilter } from '../slice';
import FilterMenu, { PresetFilterMenu } from './FilterMenu';
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

const FilterList: React.FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector(getFilters);

  return (
    <Stack isInline mb={4} align="center" className="pipeline-filters" flexWrap="wrap">
      <PresetFilterMenu />
      <FilterMenu />
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
                  {filter.displayValue || filter.value}
                </Text>
              </>
            )}
          </TagLabel>
          <TagCloseButton onClick={() => dispatch(removeFilter(filter))} />
        </Tag>
      ))}
    </Stack>
  );
};

export default FilterList;
