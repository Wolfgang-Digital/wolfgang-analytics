import React, { useEffect, useState, Suspense } from 'react';
import { ThemeProvider, CSSReset, Box, PseudoBox, ColorModeProvider } from '@chakra-ui/core';
import { Hub } from 'aws-amplify';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import routes from './routes';
import store from './store';
import theme from './theme';
import { UserCtx, User } from './utils/context';
import { awsGet } from './utils/api';
import Authenticator from './components/Authenticator';
import Navigation from './components/Navigation';
import { Routes } from './components/Routes';
import BusyIndicator from './components/BusyIndicator';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const updateUser = async () => {
      try {
        const res = await awsGet<any>('/users/me');
        setUser((res as any).data); 
      } catch {
        setUser(null);
      }
    };
    Hub.listen('auth', updateUser);
    updateUser();
    return () => Hub.remove('auth', updateUser);
  }, []);

  return (
    <UserCtx.Provider value={user}>
      <PseudoBox paddingTop={!!user ? 0 : [0, 100]} transition="all 200ms ease-in-out">
        <Authenticator>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <ColorModeProvider>
                <CSSReset />
                <Box width="100vw">
                  <Router>
                    <Navigation>
                      <Switch>
                        <Suspense fallback={<BusyIndicator isBusy color="#4FD1C5" />}>
                          <Routes routes={routes} />
                        </Suspense>
                      </Switch>
                    </Navigation>
                  </Router>
                </Box>
              </ColorModeProvider>
            </ThemeProvider>
          </Provider>
        </Authenticator>
      </PseudoBox>
    </UserCtx.Provider>
  );
};

export default App;
