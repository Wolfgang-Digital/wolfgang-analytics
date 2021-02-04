import React from 'react';
import { Box, BoxProps } from '@chakra-ui/core';

const Card: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box
    background="white"
    boxShadow="1px 1px 2px #EDF2F7"
    borderRadius={4}
    padding={4}
    {...props}
  >
    {children}
  </Box>
);

export default Card;
