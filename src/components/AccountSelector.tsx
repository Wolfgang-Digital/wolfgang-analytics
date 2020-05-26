import React, { useState, useMemo } from 'react';
import { Box, Stack, FormControl, FormLabel } from '@chakra-ui/core';
import Select from 'react-select';

import { useViews } from 'hooks/useViews';
import BusyIndicator from './BusyIndicator';

interface Props {
  account?: IOption;
  property?: IOption;
  view?: IOption;
  marginBottom?: number;
  setAccount: (option?: IOption) => void;
  setProperty: (option?: IOption) => void;
  setView: (option?: IOption) => void;
}

interface IOption {
  label: string;
  value: string;
}

const accounts = ['analytics@wolfgangdigital.com', 'ga@wolfgangdigital.com', 'ga.wolfgang@wolfgangdigital.com'].sort().map(value => ({
  label: value,
  value
}));

const AccountSelector: React.FC<Props> = ({ account, property, view, marginBottom, setAccount, setProperty, setView }) => {
  const { data, isLoading } = useViews(account?.value);

  const propertyOptions = useMemo(() => {
    return data.map(p => ({
      label: `${p.name} (${p.websiteUrl})`,
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
    <Box marginBottom={marginBottom}>
      <BusyIndicator isBusy={isLoading} color="#6b46c1" />
      <Stack spacing={3}>
        <Box>
          <FormControl>
            <FormLabel>Account</FormLabel>
            <Select
              placeholder="Select account..."
              defaultValue={account}
              options={accounts}
              isLoading={isLoading}
              onChange={selected => {
                if ((selected as IOption).value !== account?.value) {
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
