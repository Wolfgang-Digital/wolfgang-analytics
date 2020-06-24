import React from 'react';
import { Box, BoxProps } from '@chakra-ui/core';

const Card: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box background="white" boxShadow="1px 1px 4px rgba(0, 0, 0, 0)" borderRadius={2} padding={4} {...props}>
    {children}
  </Box>
);

export default Card;
