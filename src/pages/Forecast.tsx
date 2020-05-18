import React from 'react';
import { Box, Heading } from '@chakra-ui/core';

import AccountSelctor from 'components/AccountSelector';

const ForecastPage: React.FC = () => {
  return (
    <Box>
      <Heading>Forecasting Tool</Heading>
      <AccountSelctor />
    </Box>
  );
};

export default ForecastPage;