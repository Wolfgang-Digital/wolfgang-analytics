import React from 'react';
import { Box, Text, Skeleton, Heading, Flex } from '@chakra-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import BusyIndicator from 'components/BusyIndicator';
import { EditableText, EditableSelect } from 'components/Editable';
import { useUserRoles, Roles } from 'hooks/users';
import { getCurrentUser, updateCurrentUser } from './slice';
import Card from 'components/Card';
import DeptBadge from 'components/DeptBadge';

const options = [
  { label: 'Content', value: 5 },
  { label: 'CRO', value: 7 },
  { label: 'Dev', value: 1 },
  { label: 'PPC', value: 3 },
  { label: 'SEO', value: 4 },
  { label: 'Social', value: 6 },
];

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const profile = useSelector(getCurrentUser);

  const isAuthorised = useUserRoles([Roles.ADMIN, Roles.DEPT_HEAD]);

  const updateUsername = (value: string) => {
    dispatch(updateCurrentUser({ key: 'username', value }));
  };

  const updateDepartment = (value: any) => {
    dispatch(
      updateCurrentUser({
        key: 'department',
        value: { previousId: profile.user?.departments?.[0]?.department_id, nextId: value },
      })
    );
  };

  return (
    <Box>
      <BusyIndicator isBusy={profile.isLoading} color="#4FD1C5" />
      <Heading size="lg" as="h1" marginBottom="1rem">
        User Profile
      </Heading>
      <Card py={2}>
        <Box minHeight="58px">
          <Text fontSize="0.8em" fontWeight={500} color="gray.500">
            Username
          </Text>
          <Skeleton isLoaded={!profile.isLoading}>
            <EditableText defaultValue={profile.user?.username} onSubmit={updateUsername} />
          </Skeleton>
        </Box>
        <Box minHeight="58px">
          <Text fontSize="0.8em" fontWeight={500} color="gray.500">
            Email
          </Text>
          <Skeleton isLoaded={!profile.isLoading}>
            <Text>{profile.user?.email}</Text>
          </Skeleton>
        </Box>
        <Box minHeight="58px">
          <Text fontSize="0.8em" fontWeight={500} color="gray.500">
            Department
          </Text>
          <Skeleton isLoaded={!profile.isLoading}>
            <EditableSelect
              defaultValue={profile.user?.departments?.[0]?.department_name}
              options={options}
              onSubmit={updateDepartment}
              component={() => (
                <DeptBadge
                  department={profile.user?.departments?.[0]?.department_name}
                  m="2px auto 0 0"
                />
              )}
            />
          </Skeleton>
        </Box>
        {isAuthorised && (
          <Box minHeight="58px">
            <Text fontSize="0.8em" fontWeight={500} color="gray.500">
              Roles
            </Text>
            <Skeleton isLoaded={!profile.isLoading}>
              <Flex>
                {profile.user?.roles?.map((role) => (
                  <DeptBadge key={role.role_id} department={role.role_name} m="2px 8px 0 0" />
                ))}
              </Flex>
            </Skeleton>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default UserProfile;
