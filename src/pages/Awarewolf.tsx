import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Heading, useToast } from '@chakra-ui/core';
import { useSelector } from 'react-redux';

import { getLoadingState } from 'features/awarewolf/slice';
import BusyIndicator from 'components/BusyIndicator';
import ErrorBoundary from 'components/ErrorBoundary';
import Navigation from 'features/awarewolf/Navigation';
import PostList from 'features/awarewolf/PostList';
import CreatePost from 'features/awarewolf/CreatePost';
import ViewPost from 'features/awarewolf/ViewPost';

const Awarewolf: React.FC = () => {
  const toast = useToast();
  const { isLoading, error } = useSelector(getLoadingState);

  useEffect(() => {
    if (error) {
      toast({
        variant: 'left-accent',
        status: 'error',
        description: error,
        position: 'bottom-left',
        isClosable: true,
      });
    }
  }, [toast, error]);

  return (
    <>
      <BusyIndicator color="#4FD1C5" isBusy={isLoading} />
      <Navigation />
      <ErrorBoundary>
        <Switch>
          <Route exact path="/awarewolf">
            <Heading size="lg" as="h1" marginBottom="1rem">
              Awarewolf
            </Heading>
            <PostList />
          </Route>
          <Route exact path="/awarewolf/create" component={CreatePost} />
          <Route exact path="/awarewolf/posts/p/:id" component={ViewPost} />
        </Switch>
      </ErrorBoundary>
    </>
  );
};

export default Awarewolf;
