import React from 'react';
import { Button, useColorMode } from '@chakra-ui/core';

const ColourModeToggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode} variant="ghost">
      {colorMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </Button>
  );
};

export default ColourModeToggle;