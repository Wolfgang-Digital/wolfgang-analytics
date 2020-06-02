import React, { useEffect, useState, Suspense } from 'react';
import { ThemeProvider, CSSReset, Box, PseudoBox } from '@chakra-ui/core';
import { Auth, Hub } from 'aws-amplify';
import { BrowserRouter as Router, Switch, useHistory } from 'react-router-dom';

import routes from './routes';
import Authenticator from './components/Authenticator';
import Navigation from './components/Navigation';
import { Routes } from './components/Routes';
import BusyIndicator from './components/BusyIndicator';

const App: React.FC = () => {
  const { push } = useHistory();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const updateUser = async () => {
      try {
        const user = await Auth.currentUserInfo();
        setUser(user);
      } catch {
        setUser(null);
        push('/');
      }
    };
    Hub.listen('auth', updateUser);
    updateUser();
    return () => Hub.remove('auth', updateUser);
  }, []);

  return (
    <PseudoBox paddingTop={!!user ? 0 : [0, 100]} transition="all 200ms ease-in-out">
      <Authenticator>
        <ThemeProvider>
          <CSSReset />
          <Box width="100vw">
            <Router>
              <Navigation>
                <Switch>
                  <Suspense fallback={<BusyIndicator isBusy color="#6b46c1" />}>
                    <Routes routes={routes} />
                  </Suspense>
                </Switch>
              </Navigation>
            </Router>
          </Box>
        </ThemeProvider>
      </Authenticator>
    </PseudoBox>
  );
};

export default App;
