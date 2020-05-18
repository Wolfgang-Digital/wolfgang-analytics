import React, { useState, useMemo } from 'react';
import { Box, Stack, FormControl, FormLabel } from '@chakra-ui/core';
import Select from 'react-select';

import { useViews } from 'hooks/useViews';
import BusyIndicator from './BusyIndicator';

interface IOption {
  label: string;
  value: string;
}

const accounts = ['analytics@wolfgangdigital.com'].sort().map(value => ({
  label: value,
  value
}));

const AccountSelector: React.FC = () => {
  const [account, setAccount] = useState<IOption>(accounts[0]);
  const [property, setProperty] = useState<IOption>();
  const [view, setView] = useState<IOption>();

  const { data, isLoading, error } = useViews(account.value);

  const propertyOptions = useMemo(() => {
    return data.map(p => ({
      label: p.name,
      value: p.id
    }));
  }, [data]);

  const viewOptions = useMemo(() => {
    if (!property) return [];

    const propertyData = data.find(p => p.id === property.value);

    if (propertyData) {
      return propertyData.views.map(v => ({
        label: v.name,
        value: v.id
      }));
    }
    return [];
  }, [data, property]);

  return (
    <Box borderRadius={4} padding={4} background="white">
      <BusyIndicator isBusy={isLoading} color="#38B2AC" />
      <Stack spacing={4}>
        <Box>
          <FormControl>
            <FormLabel>Account</FormLabel>
            <Select
              placeholder="Select account..."
              defaultValue={account}
              options={accounts}
              isLoading={isLoading}
              onChange={selected => {
                if ((selected as IOption).value !== account.value) {
                  setProperty(undefined);
                  setView(undefined);
                }
                setAccount(selected as IOption);
              }}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>Property</FormLabel>
            <Select
              placeholder="Select property..."
              value={property}
              isDisabled={!account}
              options={propertyOptions}
              isLoading={isLoading}
              onChange={selected => {
                if ((selected as IOption).value !== property?.value) {
                  setView(undefined);
                }
                setProperty(selected as IOption);
              }}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>View</FormLabel>
            <Select
              placeholder="Select view..."
              value={view}
              isLoading={isLoading}
              isDisabled={!property || !viewOptions}
              options={viewOptions}
              onChange={selected => {
                setView(selected as IOption);
              }}
            />
          </FormControl>
        </Box>
      </Stack>
    </Box>
  );
};

export default AccountSelector;
