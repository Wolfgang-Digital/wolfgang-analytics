import React, { Suspense } from 'react';
import { ThemeProvider, CSSReset, Box } from '@chakra-ui/core';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import routes from './routes';
import store from './store';
import theme from './theme';
import Navigation from './components/Navigation';
import Authenticator from './features/profile/Authenticator';
import { Routes } from './components/Routes';
import BusyIndicator from './components/BusyIndicator';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Authenticator>
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
      </Authenticator>
    </Provider>
  );
};

export default App;
