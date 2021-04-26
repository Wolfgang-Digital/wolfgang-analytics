import React from 'react';
import {
  Box,
  Flex,
  Image,
  Heading,
  PseudoBox,
  Icon,
  Spinner,
  useDisclosure,
} from '@chakra-ui/core';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

import { useUserRoles, Roles } from 'hooks/users';
import { userMenuItems, toolsMenuItems, adminMenuItems } from './utils';
import SidebarLink from './SidebarLink';

const SidebarHeading: React.FC = ({ children }) => {
  return (
    <Heading
      as="h3"
      size="xs"
      color="white"
      mb={2}
      borderBottom="1px solid #2a4865"
      padding="8px 12px"
      fontWeight={400}
      minHeight="34px"
      whiteSpace="nowrap"
    >
      {children}
    </Heading>
  );
};

const Sidebar: React.FC<{ username?: string; isLoading?: boolean }> = ({
  username = 'User',
  isLoading,
}) => {
  const isAdmin = useUserRoles([Roles.ADMIN, Roles.CLIENT_LEAD, Roles.DEPT_HEAD]);
  const isLarge = window.matchMedia('(min-width: 1400px)');

  const { isOpen, onToggle } = useDisclosure(isLarge.matches);

  const sidebarSpring = useSpring({
    to: { width: isOpen ? '210px' : '50px' },
    config: {
      duration: 200
    }
  });

  const buttonSpring = useSpring({
    to: {
      transform: isOpen ? 'rotate(0deg)' : 'rotate(-180deg)',
      position: 'relative',
      right: isOpen ? '0px' : '10px',
    },
    config: {
      duration: 150,
    },
  });
  const iconSpring = useSpring({
    to: { opacity: isOpen ? 1 : 0, visibility: isOpen ? 'visible' : 'hidden' },
    config: { duration: 200 },
  });

  return (
    <Box
      as={animated.div}
      style={sidebarSpring}
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
      <Flex
        align="center"
        borderBottom="1px solid #2a4865"
        height="50px"
        justify="space-between"
        pr={4}
      >
        <animated.div style={iconSpring}>
          <Link to="/">
            <Image
              src="/static/wg_logo_white.png"
              alt="Wolfgang Digital"
              height="38px"
              justifySelf="flex-start"
              rounded="full"
              mx={3}
            />
          </Link>
        </animated.div>
        <animated.div style={buttonSpring}>
          <Icon
            name="chevron-left"
            size="24px"
            color="gray.400"
            onClick={onToggle}
            justifySelf="flex-end"
            cursor="pointer"
          />
        </animated.div>
      </Flex>
      <Box borderBottom="1px solid #2a4865" pb={2}>
        <SidebarHeading>
          {isOpen ? isLoading ? <Spinner size="sm" /> : username : null}
        </SidebarHeading>
        {userMenuItems.map((item) => (
          <SidebarLink key={item.label} isOpen={isOpen} {...item} />
        ))}
      </Box>
      <Box borderBottom="1px solid #2a4865" pb={2}>
        <SidebarHeading>{isOpen ? 'Tools' : null}</SidebarHeading>
        {toolsMenuItems.map((item) => (
          <SidebarLink key={item.label} isOpen={isOpen} {...item} />
        ))}
      </Box>
      {isAdmin && (
        <Box borderBottom="1px solid #2a4865" pb={2}>
          <SidebarHeading>{isOpen ? 'Admin' : null}</SidebarHeading>
          {adminMenuItems.map((item) => (
            <SidebarLink key={item.label} isOpen={isOpen} {...item} />
          ))}
        </Box>
      )}
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
        <Flex whiteSpace="nowrap">
          <Icon name="external-link" size="24px" mr={2} pb={1} />
          {isOpen ? 'Sign Out' : null}
        </Flex>
      </PseudoBox>
    </Box>
  );
};

export default Sidebar;
