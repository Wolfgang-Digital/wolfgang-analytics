import React from 'react';
import { PseudoBox, PseudoBoxProps } from '@chakra-ui/core';

const Card: React.FC<PseudoBoxProps> = ({ children, ...props }) => (
  <PseudoBox
    background="white"
    boxShadow="1px 1px 2px #EDF2F7"
    borderRadius={4}
    padding={4}
    {...props}
  >
    {children}
  </PseudoBox>
);

export default Card;
