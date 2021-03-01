import React, { useState, lazy } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Grid,
  Button,
  useToast,
} from '@chakra-ui/core';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { useCurrentUser } from 'hooks/users';
import { useUserOptions } from 'hooks/users';
import { useLinkHandler } from 'hooks/useLinkHandler';
import { awsPost } from 'utils/api';
import Card from 'components/Card';
import BusyIndicator from 'components/BusyIndicator';
import ButtonLink from 'components/ButtonLink';
import { getTemplateOptions } from './slice';
import { ReviewTemplate } from './types';
import { User } from 'features/profile/slice';

const Form = lazy(() => import('./ReviewForm'));
const CreateFormPreview = lazy(() => import('./CreateFormPreview'));

const CreateReviewForm: React.FC = () => {
  const toast = useToast();
  const navigate = useLinkHandler();

  const currentUser = useCurrentUser();

  const [formData, setFormData] = useState<ReviewTemplate>();

  const { userOptions, isLoading, error } = useUserOptions();
  const [employee, setEmployee] = useState<{ label: string; value: User }>();

  const templateOptions = useSelector(getTemplateOptions);
  const [template, setTemplate] = useState<{ label: string; value: ReviewTemplate }>(
    templateOptions[0]
  );

  const handleFormSubmit = (data: ReviewTemplate) => {
    setFormData(data);
    navigate('/user/monthly-reviews/create/2');
  };

  const [submitLoading, setIsLoading] = useState(false);
  const handleCreateReview = async () => {
    const body = {
      employeeId: employee?.value.user_id,
      managerId: currentUser?.user_id,
      department: employee?.value.departments[0]?.department_name,
      formData,
    };
    setIsLoading(true);
    const result = await awsPost('/reviews', body);
    setIsLoading(false);

    if (result.success) {
      toast({
        variant: 'left-accent',
        status: 'success',
        description: 'Review created',
        position: 'bottom-left',
        isClosable: true,
      });
      navigate('/user/monthly-reviews');
    } else {
      toast({
        variant: 'left-accent',
        status: 'error',
        description: result.error,
        position: 'bottom-left',
        isClosable: true,
      });
    }
  };

  return (
    <Box pb={12}>
      <BusyIndicator color="#4FD1C5" isBusy={submitLoading} />
      <Heading size="lg" as="h1" marginBottom="2rem">
        Create a Review
      </Heading>
      <Switch>
        <Route exact path="/user/monthly-reviews/create/0">
          <Box height="calc(100vh - 300px)" display="flex" flexDirection="column" outline={0}>
            <Card maxWidth="720px" width="100%" margin="auto">
              <FormControl isRequired mb={4} isInvalid={!!error}>
                <FormLabel>Wolfganger</FormLabel>
                <Select
                  value={employee}
                  options={userOptions}
                  isLoading={isLoading}
                  onChange={(selected: any) => setEmployee(selected)}
                />
                <FormHelperText>
                  If the employee is not listed they will need to create an account
                </FormHelperText>
                <FormErrorMessage>{error}</FormErrorMessage>
              </FormControl>
              <Grid templateColumns="1fr auto" alignItems="center">
                <FormControl isRequired>
                  <FormLabel>Review Template</FormLabel>
                  <Select
                    value={template}
                    options={templateOptions}
                    onChange={(selected: any) => setTemplate(selected)}
                  />
                  <FormHelperText>Select a template to use or create a new one</FormHelperText>
                </FormControl>
                <ButtonLink
                  text="New Template"
                  linkProps={{
                    to: '/user/monthly-reviews/templates/create/0',
                  }}
                  buttonProps={{
                    ml: 2,
                  }}
                />
              </Grid>
              <Button
                isFullWidth
                variantColor="teal"
                mt={4}
                onClick={() => navigate('/user/monthly-reviews/create/1')}
                isDisabled={!employee}
              >
                Next
              </Button>
            </Card>
          </Box>
        </Route>
        <Route exact path="/user/monthly-reviews/create/1">
          <Box display="flex" flexDirection="column" outline={0}>
            <Form handleSubmit={handleFormSubmit} defaultValues={formData || template.value} />
          </Box>
        </Route>
        <Route exact path="/user/monthly-reviews/create/2">
          <CreateFormPreview
            review={formData}
            employee={employee?.value.username}
            manager={currentUser?.username}
            department={employee?.value.departments[0]?.department_name}
            handleCreate={handleCreateReview}
          />
        </Route>
      </Switch>
    </Box>
  );
};

export default CreateReviewForm;
