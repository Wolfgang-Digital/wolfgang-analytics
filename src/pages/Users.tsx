import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Box, Heading } from '@chakra-ui/core';

import BusyIndicator from 'components/BusyIndicator';
import ErrorBoundary from 'components/ErrorBoundary';
import { UserList } from 'features/users/UserList';

const Pipeline: React.FC = () => {
  return (
    <Box pb={6}>
      <BusyIndicator color="#4FD1C5" isBusy={false} />
      <Heading mb={6} size="lg">
        Manage Users
      </Heading>
      <ErrorBoundary>
        <Switch>
          <Route exact path="/users" component={UserList} />
        </Switch>
      </ErrorBoundary>
    </Box>
  );
};

export default Pipeline;
