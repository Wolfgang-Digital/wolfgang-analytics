import React from 'react';
import { IconButton } from '@chakra-ui/core';

interface Props {
  isVisible: boolean;
  handleScroll: () => void
}

const ScrollTop: React.FC<Props> = ({ isVisible, handleScroll }) => {
  return (
    <IconButton
      icon="arrow-up"
      aria-label="Scroll to top"
      transition="opacity 200ms ease-out"
      variantColor="teal"
      position="absolute"
      bottom="8px"
      right="8px"
      zIndex={1000}
      size="sm"
      isDisabled={!isVisible}
      _disabled={{
        opacity: 0
      }}
      cursor={isVisible ? 'pointer' : 'default'}
      onClick={handleScroll}
    />
  );
};

export default ScrollTop;
