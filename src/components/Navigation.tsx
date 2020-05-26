import React from 'react';
import { Box, Flex, Grid, Button, Link, Image, Heading, PseudoBox } from '@chakra-ui/core';
import { Auth } from 'aws-amplify';
import { useRouteMatch, Link as RouterLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <Flex alignItems="center" gridArea="header" background="#006867" padding="0 1rem 0 0.25rem">
      <Image src="/static/wg_logo_white.png" alt="Wolfgang Digital" height="100%" justifySelf="flex-start" />
      <Grid maxWidth={300} marginLeft="auto">
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
      px={3}
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
        fontWeight={700}
      >
        {children}
      </Link>
    </PseudoBox>
  );
};

const Sidebar: React.FC = () => {
  return (
    <Grid
      gridTemplateRows="repeat(3, 30px)"
      gridArea="sidebar"
      background="white"
      height="100vh"
      borderRight="1px solid #E2E8F0"
      padding={4}
    >
      <Heading as="h3" size="sm" color="gray.600">
        Tools
      </Heading>
      <SidebarLink to="/forecast">Forecast</SidebarLink>
      <SidebarLink to="/something">Something</SidebarLink>
    </Grid>
  );
};

const Navigation: React.FC = ({ children }) => {
  return (
    <Grid templateColumns="200px 1fr" templateRows="40px 1fr" templateAreas='"header header" "sidebar main"'>
      <Header />
      <Sidebar />
      <Box gridArea="main" maxHeight="calc(100vh - 40px)" overflowY="auto" paddingY={6} paddingX={8}>
        {children}
      </Box>
    </Grid>
  );
};

export default Navigation;
