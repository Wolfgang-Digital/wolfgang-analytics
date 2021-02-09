import React, { useState } from 'react';
import { Box, Heading, Button, useToast } from '@chakra-ui/core';
import { Switch, Route, useParams } from 'react-router-dom';

import { awsPost } from 'utils/api';
import { useAwsGet } from 'hooks/aws';
import { useLinkHandler } from 'hooks/useLinkHandler';
import { Review } from './types';
import ReviewForm from './ReviewForm';
import Preview from './FormPreview';

const UpdateReview: React.FC = () => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useLinkHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Review['form_data']>();
  const { data } = useAwsGet<Review>(`/reviews/r/${id}/form`);

  const saveChanges = (data: Review['form_data']) => {
    setFormData(data);
    navigate(`/user/monthly-reviews/r/${id}/edit/1`);
  };

  const uploadChanges = async () => {
    setIsLoading(true);
    const res = await awsPost(`/reviews/r/${id}/form`, { data: formData });
    if (res.success) {
      toast({
        variant: 'left-accent',
        status: 'success',
        description: 'Review created',
        position: 'bottom-left',
        isClosable: true,
      });
    } else {
      toast({
        variant: 'left-accent',
        status: 'error',
        description: res.error,
        position: 'bottom-left',
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  return (
    <Box display="flex" flexDirection="column" pb={6}>
      <Heading size="lg" as="h1" marginBottom="2rem">
        Update Review Questions
      </Heading>
      <Switch>
        <Route exact path="/user/monthly-reviews/r/:id/edit/0">
          {data?.form_data && (
            <ReviewForm handleSubmit={saveChanges} defaultValues={data.form_data} />
          )}
        </Route>
        <Route exact path="/user/monthly-reviews/r/:id/edit/1">
          <Preview
            handleCreate={uploadChanges}
            review={formData}
            employee={data?.employee_name}
            manager={data?.manager_name}
            department={data?.department}
            button={() => (
              <Button
                variantColor="teal"
                m="auto"
                size="sm"
                fontWeight={400}
                onClick={uploadChanges}
                isDisabled={!formData}
                isLoading={isLoading}
              >
                Update Review
              </Button>
            )}
          />
        </Route>
      </Switch>
    </Box>
  );
};

export default UpdateReview;
