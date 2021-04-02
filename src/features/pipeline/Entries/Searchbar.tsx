import React, { useState } from 'react';
import {
  Input,
  InputGroup,
  InputLeftAddon,
  Icon,
  Grid,
  Button,
  IconButton,
} from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { setQuery, getStatus, getQuery, clearFilters } from '../slice';

const Searchbar: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(getStatus);
  const query = useSelector(getQuery);

  const [_query, _setQuery] = useState(query);

  const handleSearch = (e: any) => {
    e.preventDefault();
    dispatch(setQuery(_query));
  };

  const clear = () => {
    _setQuery('');
    dispatch(setQuery(''));
    dispatch(clearFilters());
  };

  return (
    <Grid templateColumns="1fr 200px" gridColumnGap={4} as="form" onSubmit={handleSearch}>
      <InputGroup size="sm" mb={2}>
        <InputLeftAddon children={<Icon name="search" />} borderRadius="4px 0 0 4px" />
        <Input
          value={_query}
          onChange={(e: any) => _setQuery(e.target.value)}
          placeholder="Search by company name or client lead"
          borderRadius="0 4px 4px 0"
        />
      </InputGroup>
      <Grid templateColumns="1fr auto" columnGap={2}>
        <Button
          size="sm"
          isFullWidth
          fontWeight={400}
          variantColor="teal"
          type="submit"
          isDisabled={isLoading}
        >
          Search
        </Button>
        <IconButton
          icon="delete"
          aria-label="Clear filters"
          onClick={clear}
          variant="outline"
          variantColor="red"
          size="sm"
        />
      </Grid>
    </Grid>
  );
};

export default Searchbar;
