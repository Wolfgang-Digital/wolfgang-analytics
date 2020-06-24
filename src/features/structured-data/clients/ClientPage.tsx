import React from 'react';
import { Grid } from '@chakra-ui/core';

import ClientList from './ClientList';
import ClientPreview from './ClientPreview';

const ClientPage: React.FC = () => {
  return (
    <Grid templateColumns="1fr 1fr" columnGap={8}>
      <ClientList />
      <ClientPreview />
    </Grid>
  );
};

export default ClientPage;
