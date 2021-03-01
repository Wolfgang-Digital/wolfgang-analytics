import React from 'react';
import { Flex, IconButton } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';

import { NavItem } from 'components/NavItem';
import { useUserRoles, Roles } from 'hooks/users';

const Navigation: React.FC = () => {
  const history = useHistory();

  const isAuthorised = useUserRoles([Roles.ADMIN, Roles.DEPT_HEAD]);

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
      <NavItem text="My Reviews" to="/user/monthly-reviews" />
      {isAuthorised && (
        <>
          <NavItem
            text="Create Review"
            to="/user/monthly-reviews/create/0"
            matchStr="/user/monthly-reviews/create/*"
          />
          <NavItem
            text="Create Template"
            to="/user/monthly-reviews/templates/create/0"
            matchStr="/user/monthly-reviews/templates/create/*"
          />
          <NavItem
            text="Department Reports"
            to="/user/monthly-reviews/department"
            matchStr="/user/monthly-reviews/department"
          />
        </>
      )}
    </Flex>
  );
};

export default Navigation;
