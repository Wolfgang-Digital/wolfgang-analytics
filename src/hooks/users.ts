import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getCurrentUser, User } from 'features/profile/slice';
import { useAwsGet } from './aws';

export const Roles = {
  ADMIN: 'Admin',
  DEPT_HEAD: 'Department Head',
  CLIENT_LEAD: 'Client Lead'
};

export const useUserRoles = (roles: string | string[]) => {
  const profile = useSelector(getCurrentUser);

  if (!profile.user) return false;

  if (Array.isArray(roles)) {
    return profile.user.roles?.map(r => r.role_name).some(r => roles.includes(r));
  }

  return profile.user.roles?.map(r => r.role_name).includes(roles);
};

export const useUserOptions = () => {
  const { data, isLoading, error } = useAwsGet<User[]>('/users');

  return useMemo(() => {
    return {
      isLoading,
      error,
      userOptions: data
        ? data.map(user => ({
          label: user.username,
          value: user
        }))
        : []
    };
  }, [data, isLoading, error]);
};

export const useUserId = () => {
  const profile = useSelector(getCurrentUser);
  return profile.user?.user_id;
};

export const useCurrentUser = () => {
  const profile = useSelector(getCurrentUser);
  return profile.user;
};