import React from 'react';
import { PseudoBox, Text, Badge } from '@chakra-ui/core';
import { format } from 'date-fns';

import { PipelineEntry } from './slice';

interface Props {
  entry: PipelineEntry;
}

const getValueString = (value?: number) => {
  return value ? value.toLocaleString('en-GB', { style: 'currency', currency: 'EUR' }).replace(/\.0*$/, '') : '';
};

const EntryListItem: React.FC<Props> = ({ entry }) => {
  return (
    <PseudoBox
      display="grid"
      alignItems="center"
      gridTemplateColumns="repeat(11, 1fr)"
      background="white"
      p="0.5rem 1rem"
      borderRadius={2}
      fontSize="0.9em"
      marginBottom={2}
      gridGap={2}
      borderLeft="4px solid transparent"
      transition="all 200ms ease-out"
      cursor="pointer"
      _hover={{
        borderLeftColor: 'purple.400',
      }}
    >
      <Text>{format(new Date(entry.created_at), 'dd-MM-yy')}</Text>
      <Text>{entry.company_name}</Text>
      <Badge variantColor={entry.is_new ? 'pink' : undefined} mr="auto">
        {entry.is_new ? 'New' : 'Existing'}
      </Badge>
      <Text>{entry.country}</Text>
      <Text>{entry.led_by}</Text>
      <Text>{entry.channels.join(' / ')}</Text>
      <Text>
        {entry.lead_contact_date ? format(new Date(entry.lead_contact_date), 'dd-MM-yy') : ''}
      </Text>
      <Text>{getValueString(entry.seo_fmv)}</Text>
      <Text>{getValueString(entry.ppc_fmv)}</Text>
      <Text>{getValueString(entry.twelve_month_value)}</Text>
      <Text>{format(new Date(entry.updated_at), 'dd-MM-yy')}</Text>
    </PseudoBox>
  );
};

export default EntryListItem;
