import React, { useEffect, useState } from 'react';
import { Box, Button, Heading, Grid, Text, List } from '@chakra-ui/core';
import { useParams } from 'react-router-dom';
import { useTransition, animated, config } from 'react-spring';
import { useSelector, useDispatch } from 'react-redux';

import { useUserRoles, Roles } from 'hooks/users';
import { awsPost, awsDelete } from 'utils/api';
import BusyIndicator from 'components/BusyIndicator';
import { fetchResponses, getResponse } from './slice';
import Card from 'components/Card';
import AlertBox from 'components/AlertBox';
import LabelledValue from 'components/LabelledValue';
import ResponseListItem from './ResponseListItem';

const ReviewList: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResponses(id));
  }, [id, dispatch]);

  const { data, error, isLoading } = useSelector(getResponse);

  const isAuthorised = useUserRoles([Roles.ADMIN, Roles.DEPT_HEAD]);

  const listTransitions = useTransition(data?.responses || [], (item) => item.response_id, {
    config: config.gentle,
    from: { opacity: 0, transform: 'translate3d(-10%, 0px, 0px)' },
    enter: { opacity: 1, transform: 'translate3d(0%, 0px, 0px)' },
    leave: { opacity: 0, height: 0, transform: 'translate3d(10%, 0px, 0px)' },
    trail: 100,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async () => {
    setIsSubmitting(true);
    const res = await awsPost(`/reviews/r/${id}/response`, { date: new Date() });
    if (res.success) {
      dispatch(fetchResponses(id));
    } else {
      console.log(res.error);
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (e: any, responseId: number) => {
    e.stopPropagation();
    const res = await awsDelete(`/reviews/response/${responseId}`);
    if (res.success) {
      dispatch(fetchResponses(id));
    } else {
      console.log(res.error);
    }
  };

  return (
    <Box>
      <BusyIndicator isBusy={isLoading} color="#4FD1C5" />
      <Heading size="lg" as="h1" marginBottom="1rem">
        Review Responses
      </Heading>
      <Card display="grid" gridTemplateColumns="1fr auto" mb={6}>
        <Box>
          <LabelledValue label="Employee" value={data?.employee_name || ''} />
          <LabelledValue label="Manager" value={data?.manager_name || ''} />
          <LabelledValue label="Department" value={data?.department || ''} />
        </Box>
        {isAuthorised && (
          <Button variantColor="teal" m="auto" size="sm" fontWeight={400} onClick={handleCreate} isLoading={isSubmitting}>
            Add Response
          </Button>
        )}
      </Card>
      {!!error && (
        <AlertBox
          status="error"
          title="Oops! Something wen't wrong"
          description={error}
          margin="32px 0"
        />
      )}
      <Grid
        templateColumns="repeat(4, 1fr)"
        background="#EDF2F7"
        p="0.5rem 1rem"
        borderRadius={2}
        fontSize="0.9em"
        fontWeight={500}
        marginBottom={2}
        position="sticky"
        top={1}
        zIndex={100}
      >
        <Text>Review Date</Text>
        <Text>Manager Input</Text>
        <Text>Employee Input</Text>
      </Grid>
      <List>
        {listTransitions.map(({ item, key, props }) => (
          <animated.li key={key} style={props}>
            <ResponseListItem
              reviewId={data?.review_id}
              response={item}
              isAuthorised={isAuthorised}
              handleDelete={handleDelete}
            />
          </animated.li>
        ))}
      </List>
    </Box>
  );
};

export default ReviewList;
