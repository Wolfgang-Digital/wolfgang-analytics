import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Heading } from '@chakra-ui/core';

import { getCurrentUser } from 'features/profile/slice';
import BusyIndicator from 'components/BusyIndicator';
import ErrorBoundary from 'components/ErrorBoundary';
import UserProfile from 'features/profile/UserProfile';
import Notifications from 'features/profile/NotificationList';

const Reviews: React.FC = () => {
  const profile = useSelector(getCurrentUser);

  return (
    <>
      <BusyIndicator color="#4FD1C5" isBusy={profile.isLoading} />
      <Heading size="lg" as="h1" marginBottom="1rem">
        User Profile
      </Heading>
      <ErrorBoundary>
        <Grid templateColumns="1fr 1fr" columnGap={4}>
          <UserProfile />
          <Notifications />
        </Grid>
      </ErrorBoundary>
    </>
  );
};

export default Reviews;
