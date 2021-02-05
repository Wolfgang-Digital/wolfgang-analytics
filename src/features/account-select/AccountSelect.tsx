import React, { useEffect, useCallback } from 'react';
import { Box, Stack, FormControl, FormLabel, FormErrorMessage, BoxProps } from '@chakra-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import Select, { Styles } from 'react-select';

import { SelectOption } from 'types';
import BusyIndicator from 'components/BusyIndicator';
import {
  getSelection,
  fetchAccountProperties,
  accountOptions,
  getLoadingState,
  setSelectedAccount,
  getPropertyOptions,
  getViewOptions,
  setSelectedProperty,
  setSelectedView
} from './slice';

const selectStyles: Styles = {
  loadingIndicator: base => ({
    ...base,
    color: '#6b46c1'
  })
};

const AccountSelect: React.FC<BoxProps> = ({ ...props }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getLoadingState);
  const { selectedAccount, selectedProperty, selectedView } = useSelector(getSelection);
  const propertyOptions = useSelector(getPropertyOptions);
  const viewOptions = useSelector(getViewOptions);

  const updateProperties = useCallback(() => {
    if (selectedAccount) {
      dispatch(fetchAccountProperties(selectedAccount.value));
    }
  }, [selectedAccount, dispatch]);

  useEffect(() => {
    updateProperties();
  }, [updateProperties]);

  return (
    <Box fontSize="14px" {...props}>
      <BusyIndicator isBusy={isLoading} color="#4FD1C5" />
      <Stack spacing={2}>
        <FormControl isRequired>
          <FormLabel>Account</FormLabel>
          <Select
            placeholder="Select account..."
            value={selectedAccount}
            options={accountOptions}
            isLoading={isLoading}
            isDisabled={isLoading}
            styles={selectStyles}
            onChange={selected => {
              dispatch(setSelectedAccount(selected as SelectOption));
              updateProperties();
            }}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Property</FormLabel>
          <Select
            placeholder="Select property..."
            value={selectedProperty}
            isDisabled={!selectedAccount || isLoading}
            options={propertyOptions}
            isLoading={isLoading}
            styles={selectStyles}
            onChange={selected => {
              dispatch(setSelectedProperty(selected as SelectOption));
            }}
          />
        </FormControl>
        <FormControl isRequired isInvalid={!!error}>
          <FormLabel>View</FormLabel>
          <Select
            placeholder="Select view..."
            value={selectedView}
            isDisabled={!selectedAccount || !selectedProperty || isLoading}
            options={viewOptions}
            isLoading={isLoading}
            styles={selectStyles}
            onChange={selected => {
              dispatch(setSelectedView(selected as SelectOption));
            }}
          />
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default AccountSelect;
