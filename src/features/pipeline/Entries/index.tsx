import React, { useEffect } from 'react';
import { Heading, Box, Skeleton, Flex, Text, ButtonGroup, IconButton, Grid } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchEntries,
  getQueryString,
  getStatus,
  getPagination,
  incrementOffset,
  decrementOffset,
} from '../slice';
import Table from './Table';
import TabControls from './TabControls';
import Searchbar from './Searchbar';
import FilterList from './FilterList';

const placeholder = new Array(6).fill(0);

const Entries: React.FC = () => {
  const dispatch = useDispatch();
  const query = useSelector(getQueryString);
  const { isLoading } = useSelector(getStatus);

  useEffect(() => {
    dispatch(fetchEntries(query));
  }, [query, dispatch]);

  const { offset, limit, total, current } = useSelector(getPagination);

  const increment = () => {
    dispatch(incrementOffset());
  };

  const decrement = () => {
    dispatch(decrementOffset());
  };

  return (
    <Box>
      <Heading mb={6} size="lg">
        Pipeline
      </Heading>
      <Searchbar />
      <FilterList />
      <Flex align="flex-end" justify="space-between">
        <TabControls />
        <Grid templateColumns="auto auto" columnGap={2} alignItems="flex-end">
          <Text fontSize="0.9em" color="gray.600">
            {current > 0
              ? `Showing ${offset + 1} to ${offset + current} of ${total}`
              : 'No results'}
          </Text>
          <ButtonGroup size="xs">
            <IconButton
              icon="arrow-left"
              aria-label="Previous page"
              onClick={decrement}
              isDisabled={offset === 0}
            />
            <IconButton
              icon="arrow-right"
              aria-label="Next page"
              onClick={increment}
              isDisabled={current < limit}
            />
          </ButtonGroup>
        </Grid>
      </Flex>
      {isLoading ? (
        placeholder.map((x, i) => <Skeleton key={i} height="36px" my="8px" />)
      ) : (
        <Table />
      )}
    </Box>
  );
};

export default Entries;
