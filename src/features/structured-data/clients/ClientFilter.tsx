import React from 'react';
import { Input, InputLeftAddon, InputGroup, Icon } from '@chakra-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { setFilter, getFilter } from './slice';

const ClientFilter: React.FC = () => {
  const dispatch = useDispatch();

  const filter = useSelector(getFilter);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <InputGroup>
      <InputLeftAddon children={<Icon name="search" color="#A0AEC0" />} />
      <Input value={filter} roundedLeft="0" onChange={handleChange} />
    </InputGroup>
  );
};

export default ClientFilter;
