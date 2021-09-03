import React, { useState, useEffect } from 'react';
import { Stack, Grid, Text, Input, Flex, useToast } from '@chakra-ui/core';
import { sortBy } from 'lodash';

import BusyIndicator from 'components/BusyIndicator';
import { useAwsGet } from 'hooks/aws';
import { User } from 'features/profile/slice';
import { UserListItem } from './UserListItem';

export const UserList: React.FC = () => {
  const toast = useToast();
  const [filter, setFilter] = useState('');

  const { data, isLoading, error } = useAwsGet<User[]>('/users/info');

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
  }, [error, toast]);

  const displayData = data
    ? filter.length > 0
      ? sortBy(
          data.filter((user) => user.username.toLowerCase().includes(filter.toLowerCase())),
          'username'
        )
      : sortBy(data, 'username')
    : [];

  return (
    <>
      <BusyIndicator color="#4FD1C5" isBusy={isLoading} />
      <Flex align="center" justify="space-between">
        <Input
          mb={6}
          size="sm"
          maxW="500px"
          value={filter}
          onChange={(e: any) => setFilter(e.target.value)}
          placeholder="Filter by name"
        />
        <Text fontSize="0.9em" mr={4}>
          Total:{' '}
          <Text as="span" fontWeight={700}>
            {data?.length}
          </Text>
        </Text>
      </Flex>
      <Grid
        templateColumns="repeat(4, 1fr)"
        padding="0.5rem 1rem"
        borderRadius={2}
        background="#EDF2F7"
        fontSize="0.9em"
        fontWeight={500}
        gridGap={4}
        mb={2}
      >
        <Text>Username</Text>
        <Text>Email</Text>
        <Text>Department</Text>
        <Text>Roles</Text>
      </Grid>
      <Stack>
        {displayData.map((user) => (
          <UserListItem key={user.user_id} {...user} />
        ))}
      </Stack>
    </>
  );
};
