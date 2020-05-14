import React from 'react';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp } from '@aws-amplify/ui-react';

const Authenticator: React.FC = ({ children }) => {
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
