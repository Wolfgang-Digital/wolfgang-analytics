import React from 'react';
import { Box, Heading, Text, Grid, Image, Stack } from '@chakra-ui/core';
import { useSelector } from 'react-redux';

import Card from 'components/Card';
import PageList from '../web-pages/PageList';
import { getSelectedClient } from './slice';

const ClientPreview: React.FC = () => {
  const client = useSelector(getSelectedClient);

  return client ? (
    <Stack spacing={6}>
      <Card>
        <Grid templateColumns="auto 64px">
          <Box>
            <Heading as="h4" size="sm">
              {client.name}
            </Heading>
            <Text>{client.type}</Text>
            <Text>{client.url}</Text>
          </Box>
          <Image
            src={client.logo}
            size="64px"
            marginY="auto"
            objectFit="contain"
            rounded="full"
            border="1px solid #CBD5E0"
          />
        </Grid>
      </Card>
      <PageList />
    </Stack>
  ) : null;
};

export default ClientPreview;
