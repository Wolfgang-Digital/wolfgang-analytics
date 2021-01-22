import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getIsLoading } from 'features/monthly-reviews/slice';
import BusyIndicator from 'components/BusyIndicator';
import ErrorBoundary from 'components/ErrorBoundary';
import Navigation from 'features/monthly-reviews/Navigation';
import ReviewList from 'features/monthly-reviews/ReviewList';
import CreateReview from 'features/monthly-reviews/CreateReview';
import ResponseList from 'features/monthly-reviews/ResponseList';
import ResponseForm from 'features/monthly-reviews/ResponseForm';
import ResponseDisplay from 'features/monthly-reviews/ResponseDisplay';
import FormPreview from 'features/monthly-reviews/FormPreview';

const Reviews: React.FC = () => {
  const isLoading = useSelector(getIsLoading);

  return (
    <>
      <BusyIndicator color="#4FD1C5" isBusy={isLoading} />
      <Navigation />
      <ErrorBoundary>
        <Switch>
          <Route
            exact
            path="/user/monthly-reviews/r/:reviewId/response/:responseId/edit/:role"
            component={ResponseForm}
          />
          <Route
            exact
            path="/user/monthly-reviews/r/:reviewId/response/:responseId"
            component={ResponseDisplay}
          />
          <Route exact path="/user/monthly-reviews/r/:id/preview" component={FormPreview} />
          <Route exact path="/user/monthly-reviews/r/:id" component={ResponseList} />
          <Route exact path="/user/monthly-reviews" component={ReviewList} />
          <Route path="/user/monthly-reviews/create" component={CreateReview} />
        </Switch>
      </ErrorBoundary>
    </>
  );
};

export default Reviews;