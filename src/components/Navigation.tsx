import React, { useState, useRef } from 'react';
import { Box, Flex, Grid, Button, Link, Image, Heading, PseudoBox, Icon } from '@chakra-ui/core';
import { Auth } from 'aws-amplify';
import { useRouteMatch, Link as RouterLink } from 'react-router-dom';
import { MdTrendingUp } from 'react-icons/md';
import { BsFileCode } from 'react-icons/bs';
import { FaRegUserCircle } from 'react-icons/fa';

import { useCurrentUser } from 'hooks/users';
import ScrollTop from './ScrollTop';

interface HeaderProps {
  isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrolled }) => {
  return (
    <Flex
      position="sticky"
      top={0}
      alignItems="center"
      gridArea="header"
      padding="0 1rem 0 0.5rem"
      zIndex={1}
      transition="all 200ms ease-in-out"
      boxShadow={isScrolled ? '1px 2px 2px rgba(0, 0, 0, 0.15)' : 'none'}
    >
      <Grid gridTemplateColumns="auto auto" maxWidth={300} marginLeft="auto" gridColumnGap="1rem">
        <Button variant="link" size="sm" onClick={() => Auth.signOut()}>
          Sign Out
        </Button>
      </Grid>
    </Flex>
  );
};

const SidebarLink: React.FC<{ to: string; onClick?: () => void }> = ({ to, children, onClick }) => {
  const match = useRouteMatch(to);

  return (
    <PseudoBox
      py={2}
      _hover={{ transform: 'translateX(4px)' }}
      transition="200ms ease-out"
      cursor="pointer"
      width="100%"
      px={4}
      onClick={onClick}
    >
      <Link
        // @ts-ignore
        as={RouterLink}
        to={to}
        display="flex"
        alignItems="center"
        _focus={{ boxShadow: 0 }}
        _hover={{ textDecoration: 0 }}
        color={!!match ? 'teal.400' : 'gray.500'}
        width="100%"
        fontSize="0.9rem"
        fontWeight={400}
      >
        {children}
      </Link>
    </PseudoBox>
  );
};

const Sidebar: React.FC<{ username?: string }> = ({ username = 'User' }) => {
  return (
    <Box
      gridArea="sidebar"
      backgroundColor="rgb(5, 30, 52)"
      backgroundImage="url('/static/background_pattern.png')"
      backgroundSize="220px 556px"
      backgroundPosition="left 0 bottom 0"
      backgroundRepeat="no-repeat"
      height="100vh"
      display="flex"
      flexDirection="column"
    >
      <Flex align="center" borderBottom="1px solid #2a4865" height="50px">
        <RouterLink to="/">
          <Image
            src="/static/wg_logo_white.png"
            alt="Wolfgang Digital"
            height="38px"
            justifySelf="flex-start"
            rounded="full"
            mx={3}
          />
        </RouterLink>
      </Flex>
      <Box borderBottom="1px solid #2a4865" pb={2}>
        <Heading
          as="h3"
          size="xs"
          color="white"
          px={4}
          mb={2}
          borderBottom="1px solid #2a4865"
          padding="8px 16px"
          fontWeight={400}
        >
          {username}
        </Heading>
        <SidebarLink to="/user/profile">
        <Box as={FaRegUserCircle} size="18px" mr={2} />
          My Profile
        </SidebarLink>
        <SidebarLink to="/user/monthly-reviews">
          <Icon name="calendar" size="18px" mr={2} transform="translateY(-2px)" fontWeight={400} />
          Monthly Reviews
        </SidebarLink>
      </Box>
      <Box borderBottom="1px solid #2a4865" pb={2}>
        <Heading
          as="h3"
          size="xs"
          color="white"
          px={4}
          mb={2}
          borderBottom="1px solid #2a4865"
          padding="8px 16px"
          fontWeight={400}
        >
          Tools
        </Heading>
        <SidebarLink to="/forecast">
          <Box as={MdTrendingUp} size="24px" mr={2} />
          Metric Forecasting
        </SidebarLink>
        <SidebarLink to="/structured-data">
          <Box as={BsFileCode} size="24px" mr={2} pb={1} />
          Schema Generator
        </SidebarLink>
      </Box>
      <PseudoBox
        borderTop="1px solid #2a4865"
        mt="auto"
        p={4}
        onClick={() => Auth.signOut()}
        cursor="pointer"
        color="gray.500"
        _hover={{ color: 'white' }}
        transition="color 200ms ease-out"
      >
        <Flex>
          <Icon name="external-link" size="24px" mr={2} pb={1} />
          Sign Out
        </Flex>
      </PseudoBox>
    </Box>
  );
};

const Navigation: React.FC = ({ children }) => {
  const user = useCurrentUser();

  const ref = useRef<any>(null);

  const [isScrolled, setIsScrolled] = useState(ref.current?.scrollTop > 0);

  const handleScroll = () => {
    if (!isScrolled && ref.current?.scrollTop > 2) {
      setIsScrolled(true);
    } else if (isScrolled && ref.current?.scrollTop <= 2) {
      setIsScrolled(false);
    }
  };

  const scrollTop = () => {
    ref.current?.scrollTo?.({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Grid
      templateColumns="220px 1fr"
      templateRows="50px 1fr"
      templateAreas='"sidebar header" "sidebar main"'
    >
      <Header isScrolled={isScrolled} />
      <Sidebar username={user?.username} />
      <Box
        ref={ref}
        onScroll={handleScroll}
        height="calc(100vh - 50px)"
        overflowY="auto"
        overflowX="hidden"
        paddingBottom={6}
        paddingX={8}
      >
        {children}
      </Box>
      <ScrollTop isVisible={isScrolled} handleScroll={scrollTop} />
    </Grid>
  );
};

export default Navigation;
