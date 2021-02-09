import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Grid,
  Button,
  useToast,
} from '@chakra-ui/core';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { saveState } from 'utils/storage';
import { useLinkHandler } from 'hooks/useLinkHandler';
import Card from 'components/Card';
import { ReviewTemplate } from './types';
import { getSavedTemplates, createTemplate } from './slice';
import ReviewForm from './ReviewForm';

const CreateTemplate: React.FC = () => {
  const toast = useToast();
  const navigate = useLinkHandler();
  const dispatch = useDispatch();
  const templates = useSelector(getSavedTemplates);
  const [name, setName] = useState(`New Template ${templates.length + 1}`);
  const [template, setTemplate] = useState<ReviewTemplate>();

  const handleChange = (event: any) => setName(event.target.value);

  const handleSubmit = (data: ReviewTemplate) => {
    data.name = name;
    setTemplate(data);
    navigate('/user/monthly-reviews/templates/create/1');
  };

  const handleSave = () => {
    if (template) {
      templates.push(template);
      saveState('reviewTemplates', templates);
      dispatch(createTemplate(template));
      toast({
        variant: 'left-accent',
        status: 'success',
        description: 'Template saved',
        position: 'bottom-left',
        isClosable: true,
      });
      navigate('/user/monthly-reviews/create/0');
    }
  };

  return (
    <Box display="flex" flexDirection="column" pb={6}>
      <Heading size="lg" as="h1" marginBottom="2rem">
        Create a Template
      </Heading>
      <Card maxWidth="1080px" width="100%" margin="auto">
        <Switch>
          <Route exact path="/user/monthly-reviews/templates/create/0">
            <ReviewForm handleSubmit={handleSubmit} />
          </Route>
          <Route exact path="/user/monthly-reviews/templates/create/1">
            <Grid templateColumns="1fr auto" columnGap={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="templateName">Template Name</FormLabel>
                <Input name="templateName" value={name} onChange={handleChange} />
              </FormControl>
              <Button
                marginTop="auto"
                rightIcon="download"
                minWidth="150px"
                variantColor="teal"
                onClick={handleSave}
              >
                Save
              </Button>
            </Grid>
          </Route>
        </Switch>
      </Card>
    </Box>
  );
};

export default CreateTemplate;
