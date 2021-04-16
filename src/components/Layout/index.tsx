import React, { useState, useRef } from 'react';
import { Box, Grid } from '@chakra-ui/core';

import { useCurrentUser } from 'hooks/users';
import ScrollTop from '../ScrollTop';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout: React.FC = ({ children }) => {
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
      templateColumns="auto 1fr"
      templateRows="50px 1fr"
      templateAreas='"sidebar header" "sidebar main"'
    >
      <Header isScrolled={isScrolled} />
      <Sidebar username={user?.username} isLoading={!user} />
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

export default Layout;
