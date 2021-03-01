import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import ButtonLink from './ButtonLink';

interface NavItemProps {
  text: string;
  to: string;
  matchStr?: string;
}

export const NavItem: React.FC<NavItemProps> = ({ text, to, matchStr }) => {
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