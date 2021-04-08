import React, { useEffect } from 'react';
import { Heading, Box, Skeleton, Flex, Text } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { fetchEntries, getQueryString, getStatus, getEntryCount } from '../slice';
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

  const count = useSelector(getEntryCount);

  return (
    <Box>
      <Heading mb={6} size="lg">
        Pipeline
      </Heading>
      <Searchbar />
      <FilterList />
      <Flex align="flex-end" justify="space-between">
        <TabControls />
        <Text fontSize="0.9em" color="gray.600">{`Showing ${count} of ${count}`}</Text>
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
