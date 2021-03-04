import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useToast } from '@chakra-ui/core';
import { useSelector } from 'react-redux';

import BusyIndicator from 'components/BusyIndicator';
import ErrorBoundary from 'components/ErrorBoundary';
import { getStatus } from 'features/pipeline/slice';
import Navigation from 'features/pipeline/Navigation';
import EntryList from 'features/pipeline/EntryList';
import CreateEntry from 'features/pipeline/CreateEntry';

const Pipeline: React.FC = () => {
  const toast = useToast();
  const status = useSelector(getStatus);

  useEffect(() => {
    if (status.error) {
      toast({
        variant: 'left-accent',
        status: 'error',
        description: status.error,
        position: 'bottom-left',
        isClosable: true,
      });
    }
  }, [toast, status.error]);

  return (
    <>
      <BusyIndicator color="#4FD1C5" isBusy={status.isLoading} />
      <Navigation />
      <ErrorBoundary>
        <Switch>
          <Route exact path="/pipeline/create" component={CreateEntry} />
          <Route exact path="/pipeline" component={EntryList} />
        </Switch>
      </ErrorBoundary>
    </>
  );
};

export default Pipeline;
