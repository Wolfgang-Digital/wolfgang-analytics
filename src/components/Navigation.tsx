import React from 'react';
import { Box, PseudoBox } from '@chakra-ui/core';

const Navigation: React.FC = ({ children }) => {
  return (
    <PseudoBox display="flex" alignItems="center" height={50} padding="0 1rem" background="#00454f" color="white">
      {children}
    </PseudoBox>
  );
};

export default Navigation;
