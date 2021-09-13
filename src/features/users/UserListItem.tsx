import React, { useState } from 'react';
import {
  Collapse,
  Grid,
  Text,
  PseudoBox,
  useDisclosure,
  Divider,
  Stack,
  Box,
  ButtonGroup,
  Button,
  IconButton,
  useToast,
} from '@chakra-ui/core';
import Select from 'react-select';

import { awsPost } from 'utils/api';
import { departmentOptions } from 'utils/constants';
import Badge from 'components/DeptBadge';
import { User } from 'features/profile/slice';

const ROLES = [
  { label: 'Admin', value: 1 },
  { label: 'Department Head', value: 2 },
  { label: 'Client Lead', value: 3 },
];

export const UserListItem: React.FC<User> = ({ user_id, username, email, departments, roles }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const userDept = !!departments?.[0]
    ? { label: departments[0].department_name, value: departments[0].department_id }
    : undefined;
  const userRoles = roles?.map((role) => ({ label: role.role_name, value: role.role_id }));

  const [deptInput, setDeptInput] = useState(userDept);
  const [roleInput, setRoleInput] = useState(userRoles);

  const handleUpdate = async () => {
    const input: Record<string, any> = {
      userId: user_id,
      departments: [],
      roles: [],
    };

    if (deptInput) input.departments = [deptInput.value];
    if (roleInput) input.roles = roleInput.map((role) => role.value);

    setIsLoading(true);
    const res = await awsPost<{ message: string }>(`/users/u/${user_id}`, input);
    setIsLoading(false);

    toast({
      variant: 'left-accent',
      status: res.success ? 'success' : 'error',
      description: res.success ? res.data.message : res.error,
      position: 'bottom-left',
      isClosable: true,
    });
  };

  return (
    <PseudoBox
      onClick={onToggle}
      background="white"
      alignItems="center"
      p="0.5rem 1rem"
      borderRadius={2}
      fontSize="0.9em"
      borderLeft="4px solid transparent"
      borderLeftColor={isOpen ? 'teal.500' : 'transparent'}
      transition="all 200ms ease-out"
      cursor="pointer"
      mb={2}
      _hover={{
        borderLeftColor: 'purple.400',
      }}
    >
      <Grid templateColumns="repeat(4, 1fr)">
        <Text fontWeight={500}>{username}</Text>
        <Text>{email}</Text>
        <Badge department={departments?.[0]?.department_name || 'None'} mr="auto" />
        <Stack isInline>
          {roles?.map((role) => (
            <Badge key={role.role_id} department={role.role_name} mr="auto" />
          ))}
        </Stack>
      </Grid>
      <Collapse isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <Divider />
        <Grid templateColumns="repeat(3, 1fr)" columnGap={4} alignItems="flex-end">
          <Box p={4}>
            <Text fontWeight={500} mb={1}>
              Manage Department
            </Text>
            <Select
              value={deptInput}
              defaultValue={userDept}
              options={departmentOptions}
              onChange={(e: any) => setDeptInput(e)}
            />
          </Box>
          <Box p={4}>
            <Text fontWeight={500} mb={1}>
              Manage Roles
            </Text>
            <Select
              value={roleInput}
              defaultValue={userRoles}
              options={ROLES}
              isMulti
              isClearable
              onChange={(e: any) => setRoleInput(e)}
            />
          </Box>
          <ButtonGroup p={4} variant="outline" justifySelf="flex-end">
            <Button
              fontWeight={400}
              variantColor="teal"
              onClick={handleUpdate}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Update User
            </Button>
            <IconButton icon="delete" aria-label="Delete user" variantColor="red" isDisabled />
          </ButtonGroup>
        </Grid>
      </Collapse>
    </PseudoBox>
  );
};
