import React, { useRef } from 'react';
import { Stack, Icon, Text } from '@chakra-ui/core';

export const Rating: React.FC<{ value?: number | string }> = ({ value }) => {
  const ref = useRef(null);

  const rating = parseInt(value as string);
  if (!rating) return null;

  const arr = new Array(rating).fill(0);

  const isLargeScreen = window.matchMedia('(min-width: 1440px)').matches;

  return (
    <Stack ref={ref} isInline align="center" flexWrap="wrap">
      {(rating > 4 && !isLargeScreen) || (rating > 5 && isLargeScreen) ? (
        <>
          <Icon name="star" color="yellow.500" mr={2} transform="translateY(-1px)" />
          <Text fontWeight={700} fontSize="1.1em" color="gray.600">{rating}</Text>
        </>
      ) : (
        arr.map((n, i) => <Icon key={i} name="star" size="12px" color="yellow.500" />)
      )}
    </Stack>
  );
};
