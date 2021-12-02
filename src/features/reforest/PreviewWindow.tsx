import React from 'react';
import { Box, Spinner } from '@chakra-ui/core';

interface Props {
  src: string;
  isLoading: boolean;
}

export const PreviewWindow: React.FC<Props> = ({ src, isLoading }) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="purple.500" size="xl" />
      </Box>
    );
  }

  return (
    <Box borderRadius={4} overflow="hidden" minHeight="500px">
      <iframe title="Preview" src={src} width="100%" height="100%" />
    </Box>
  );
};
