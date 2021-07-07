import React from 'react';
import { Flex, IconButton } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';

import { NavItem } from 'components/NavItem';
const Navigation: React.FC = () => {
  const history = useHistory();

  return (
    <Flex position="absolute" top="12px" zIndex={2}>
      <IconButton
        icon="arrow-left"
        aria-label="Back"
        variant="link"
        size="sm"
        mr={4}
        onClick={() => history.goBack()}
      />
      <NavItem text="Pipeline" to="/pipeline" />
      <NavItem text="New Enquiry" to="/pipeline/create" />
      <NavItem text="Dashboard" to="/pipeline/dashboard" />
      <NavItem text="Department Targets" to="/pipeline/targets" />
    </Flex>
  );
};

export default Navigation;
