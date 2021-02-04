import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Hub } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp } from '@aws-amplify/ui-react';

import { fetchCurrentUser } from './slice';

const Authenticator: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const updateUser = () => {
      dispatch(fetchCurrentUser());
    };
    Hub.listen('auth', updateUser);
    return () => Hub.remove('auth', updateUser);
  }, [dispatch]);

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
