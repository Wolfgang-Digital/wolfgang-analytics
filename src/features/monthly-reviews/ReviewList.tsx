import React, { useState } from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputLeftAddon,
  Icon,
  List,
  Grid,
  Text,
  Heading,
} from '@chakra-ui/core';
import { useTransition, animated, config } from 'react-spring';

import { useAwsGet } from 'hooks/aws';
import { useUserRoles, Roles } from 'hooks/users';
import ButtonLink from 'components/ButtonLink';
import BusyIndicator from 'components/BusyIndicator';
import { Review } from './types';
import AlertBox from 'components/AlertBox';
import ReviewListItem from './ReviewListItem';

const reviewFilter = (filter: string) => (transition: { item: Review }) => {
  return (
    transition.item.employee_name.toLowerCase().includes(filter.toLowerCase()) ||
    transition.item.manager_name.toLowerCase().includes(filter.toLowerCase())
  );
};

const ReviewList: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [deleted, setDeleted] = useState<number[]>([]);
  const { data, error, isLoading } = useAwsGet<Review[]>('/reviews');

  const isAuthorised = useUserRoles([Roles.ADMIN, Roles.DEPT_HEAD]);

  const listTransitions = useTransition(data?.filter(r => !deleted.includes(r.review_id)) || [], (item) => item.review_id, {
    config: config.gentle,
    from: { opacity: 0, transform: 'translate3d(-10%, 0px, 0px)' },
    enter: { opacity: 1, transform: 'translate3d(0%, 0px, 0px)' },
    leave: { opacity: 0, height: 0, transform: 'translate3d(10%, 0px, 0px)' },
    trail: 100,
  });

  const onDelete = (id: number) => {
    setDeleted(current => [...current, id]);
  };

  return (
    <Box>
      <BusyIndicator isBusy={isLoading} color="#4FD1C5" />
      <Heading size="lg" as="h1" marginBottom="1rem">
        My Reviews
      </Heading>
      <Grid templateColumns="1fr 1fr">
        <InputGroup marginBottom="1rem">
          <InputLeftAddon children={<Icon name="search" />} />
          <Input
            roundedLeft="0"
            placeholder="Filter by user"
            value={filter}
            onChange={(e: any) => setFilter(e.target.value)}
          />
        </InputGroup>
        <Box textAlign="right">
          {isAuthorised && (
            <ButtonLink
              text="Create Review"
              linkProps={{ to: '/user/monthly-reviews/create/0' }}
              buttonProps={{
                size: 'md',
                ml: 'auto',
                fontWeight: 400,
                variant: 'outline',
                variantColor: 'teal',
              }}
            />
          )}
        </Box>
      </Grid>
      {!!error && (
        <AlertBox
          status="error"
          title="Oops! Something wen't wrong"
          description={error}
          margin="32px 0"
        />
      )}
      <Grid
        templateColumns="2fr 2fr 1fr 1fr 1fr"
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
        <Text>Employee</Text>
        <Text>Manager</Text>
        <Text>Department</Text>
        <Text>Created</Text>
      </Grid>
      <List>
        {listTransitions.filter(reviewFilter(filter)).map(({ item, key, props }) => (
          <animated.li key={key} style={props}>
            <ReviewListItem review={item} isAuthorised={isAuthorised} handleDelete={onDelete} />
          </animated.li>
        ))}
      </List>
    </Box>
  );
};

export default ReviewList;
