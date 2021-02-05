import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@chakra-ui/core';

import { getCurrentUser } from 'features/profile/slice';
import BusyIndicator from 'components/BusyIndicator';
import ErrorBoundary from 'components/ErrorBoundary';
import UserProfile from 'features/profile/UserProfile';

const Reviews: React.FC = () => {
  const profile = useSelector(getCurrentUser);

  return (
    <>
      <BusyIndicator color="#4FD1C5" isBusy={profile.isLoading} />
      <ErrorBoundary>
        <Grid templateColumns="1fr 1fr">
          <UserProfile />
        </Grid>
      </ErrorBoundary>
    </>
  );
};

export default Reviews;
