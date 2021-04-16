import React from 'react';
import { Flex, Grid, Button } from '@chakra-ui/core';
import { Auth } from 'aws-amplify';
import NavigationPopover from 'features/profile/NavigationPopover';

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
        <NavigationPopover />
        <Button variant="link" size="sm" onClick={() => Auth.signOut()}>
          Sign Out
        </Button>
      </Grid>
    </Flex>
  );
};

export default Header;