import { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getCurrentUser } from 'features/profile/slice';
import { fetchUsers, getUsersState } from 'features/users/slice';

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

interface UserOptionParams {
  idAsValue?: boolean
}

export const useUserOptions = (params?: UserOptionParams) => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector(getUsersState);

  useEffect(() => {
    if (!isLoading && !error && users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [error, isLoading, users.length, dispatch]);

  return useMemo(() => {
    return {
      isLoading,
      error,
      userOptions: users
        ? users.map(user => ({
          label: user.username,
          value: params?.idAsValue ? user.user_id : user
        }))
        : []
    };
  }, [users, isLoading, error, params]);
};

export const useUserId = () => {
  const profile = useSelector(getCurrentUser);
  return profile.user?.user_id;
};

export const useCurrentUser = () => {
  const profile = useSelector(getCurrentUser);
  return profile.user;
};