import React from 'react';
import { Flex, IconButton } from '@chakra-ui/core';
import { useRouteMatch, useHistory } from 'react-router-dom';

import ButtonLink from 'components/ButtonLink';
import { useUserRoles, Roles } from 'hooks/users';

interface NavItemProps {
  text: string;
  to: string;
  matchStr?: string;
}

const NavItem: React.FC<NavItemProps> = ({ text, to, matchStr }) => {
  const match = useRouteMatch(matchStr || to);

  return (
    <ButtonLink
      text={text}
      linkProps={{ to }}
      buttonProps={{
        variant: 'link',
        mr: 6,
        size: 'sm',
        minWidth: 80,
        isActive: !!match && match.isExact,
        _active: {
          color: 'purple.500',
        },
      }}
    />
  );
};

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
