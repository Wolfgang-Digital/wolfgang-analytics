import React from 'react';
import { Box, Flex, Grid, Button, Link, Image, Heading, PseudoBox, useColorMode } from '@chakra-ui/core';
import { Auth } from 'aws-amplify';
import { useRouteMatch, Link as RouterLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <Flex
      alignItems="center"
      gridArea="header"
      background="#006867"
      padding="0 1rem 0 0.5rem"
      boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
      zIndex={1}
    >
      <RouterLink to="/">
        <Image src="/static/wg_logo_white.png" alt="Wolfgang Digital" height="40px" justifySelf="flex-start" />
      </RouterLink>
      <Grid gridTemplateColumns="auto auto" maxWidth={300} marginLeft="auto" gridColumnGap="1rem">
        <Button variant="link" color="white" size="sm" onClick={() => Auth.signOut()}>
          Sign Out
        </Button>
      </Grid>
    </Flex>
  );
};

const SidebarLink: React.FC<{ to: string }> = ({ to, children }) => {
  const match = useRouteMatch(to);

  return (
    <PseudoBox
      py={1}
      color="gray.700"
      _hover={{ transform: 'translateX(4px)' }}
      transition="200ms ease-out"
      cursor="pointer"
      width="100%"
    >
      <Link
        // @ts-ignore
        as={RouterLink}
        to={to}
        display="flex"
        _focus={{ boxShadow: 0 }}
        _hover={{ textDecoration: 0 }}
        color={!!match ? 'purple.500' : 'gray.500'}
        width="100%"
        fontSize="0.85rem"
        fontWeight={700}
      >
        {children}
      </Link>
    </PseudoBox>
  );
};

const Sidebar: React.FC = () => {
  const { colorMode } = useColorMode();
  const bgColour = { light: '#F7FAFC', dark: '#1A202C' };

  return (
    <Grid
      gridTemplateRows="repeat(3, 30px)"
      gridArea="sidebar"
      background={bgColour[colorMode]}
      height="100vh"
      borderRight="1px solid #E2E8F0"
      padding={4}
    >
      <Heading as="h3" size="sm" color="gray.600">
        Tools
      </Heading>
      <SidebarLink to="/forecast">METRIC FORECASTING</SidebarLink>
      <SidebarLink to="/structured-data">SCHEMA GENERATOR</SidebarLink>
    </Grid>
  );
};

const Navigation: React.FC = ({ children }) => {
  const { colorMode } = useColorMode();
  const bgColour = { light: '#F7FAFC', dark: '#1A202C' };

  return (
    <Grid templateColumns="185px 1fr" templateRows="40px 1fr" templateAreas='"header header" "sidebar main"'>
      <Header />
      <Sidebar />
      <Box gridArea="main" background={bgColour[colorMode]} maxHeight="calc(100vh - 40px)" overflowY="auto" paddingY={6} paddingX={8}>
        {children}
      </Box>
    </Grid>
  );
};

export default Navigation;
