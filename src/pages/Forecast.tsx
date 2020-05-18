import React from 'react';
import { Box, Heading, Grid } from '@chakra-ui/core';

import AccountSelctor from 'components/AccountSelector';

const ForecastPage: React.FC = () => {
  return (
    <Box>
      <Heading marginBottom={12}>Forecasting Tool</Heading>
      <Grid templateColumns="1fr 1fr">
        <AccountSelctor />
      </Grid>
    </Box>
  );
};

export default ForecastPage;