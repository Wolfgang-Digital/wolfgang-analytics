import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useToast } from '@chakra-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import BusyIndicator from 'components/BusyIndicator';
import ErrorBoundary from 'components/ErrorBoundary';
import { getStatus, clearMessage } from 'features/pipeline/slice';
import Navigation from 'features/pipeline/Navigation';
import Entries from 'features/pipeline/Entries';
import CreateEntry from 'features/pipeline/CreateEntry';
import EditEntry from 'features/pipeline/EditEntry';
import Dashboard from 'features/pipeline/Dashboard';
import Targets from 'features/pipeline/Targets';

const Pipeline: React.FC = () => {
  const toast = useToast();
  const status = useSelector(getStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status.error) {
      toast({
        variant: 'left-accent',
        status: 'error',
        description: status.error,
        position: 'bottom-left',
        isClosable: true,
      });
      dispatch(clearMessage());
    } else if (status.message) {
      toast({
        variant: 'left-accent',
        status: 'success',
        description: status.message,
        position: 'bottom-left',
        isClosable: true,
      });
    }
  }, [toast, status, dispatch]);

  return (
    <>
      <BusyIndicator color="#4FD1C5" isBusy={status.isLoading} />
      <Navigation />
      <ErrorBoundary>
        <Switch>
          <Route exact path="/pipeline" component={Entries} />
          <Route exact path="/pipeline/create" component={CreateEntry} />
          <Route exact path="/pipeline/e/:id" component={EditEntry} />
          <Route exact path="/pipeline/dashboard" component={Dashboard} />
          <Route exact path="/pipeline/targets" component={Targets} />
        </Switch>
      </ErrorBoundary>
    </>
  );
};

export default Pipeline;
