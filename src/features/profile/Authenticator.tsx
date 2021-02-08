import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Hub } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp } from '@aws-amplify/ui-react';

import { fetchCurrentUser, getCurrentUser, fetchNotifications } from './slice';

const Authenticator: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const profile = useSelector(getCurrentUser);

  useEffect(() => {
    const updateUser = () => {
      dispatch(fetchCurrentUser());
    };
    Hub.listen('auth', updateUser);
    return () => Hub.remove('auth', updateUser);
  }, [dispatch]);

  useEffect(() => {
    if (profile.user) {
      dispatch(fetchNotifications());
    }
  }, [dispatch, profile.user, profile.update]);

  return (
    <AmplifyAuthenticator usernameAlias="email">
      <AmplifySignIn slot="sign-in" usernameAlias="email" />
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[
          {
            type: 'name',
            label: 'Name *',
            placeholder: 'Enter your name',
            required: true
          },
          {
            type: 'email'
          },
          {
            type: 'password'
          }
        ]}
      />
      {children}
    </AmplifyAuthenticator>
  );
};

export default Authenticator;
