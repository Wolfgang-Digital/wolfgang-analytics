import { useContext, useMemo } from 'react';

import { UserCtx, User } from 'utils/context';
import { useAwsGet } from './aws';

export const Roles = {
  ADMIN: 'Admin',
  DEPT_HEAD: 'Department Head'
};

export const useUserRoles = (roles: string | string[]) => {
  const user = useContext(UserCtx);

  if (!user) return false;

  if (Array.isArray(roles)) {
    return user.roles?.map(r => r.role_name).some(r => roles.includes(r));
  }

  return user.roles?.map(r => r.role_name).includes(roles);
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
  const user = useContext(UserCtx);
  return user?.user_id;
};