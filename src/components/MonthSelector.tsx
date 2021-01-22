import React, { useState } from 'react';
import { Flex, Box, Text, IconButton, BoxProps } from '@chakra-ui/core';
import { format, addMonths, subMonths, isSameMonth } from 'date-fns';

interface Props {
  onNext?: (date: Date) => void
  onPrevious?: (date: Date) => void
  boxProps?: BoxProps
}

const today = new Date();

const MonthSelector: React.FC<Props> = ({ onNext, onPrevious, boxProps }) => {
  const [current, setCurrent] = useState(() => new Date());

  const handleNext = () => {
    const next = addMonths(current, 1);
    setCurrent(next);
    onNext?.(next);
  };

  const handlePrevious = () => {
    const previous = subMonths(current, 1);
    setCurrent(previous);
    onPrevious?.(previous);
  };

  return (
    <Box {...boxProps}>
      <Flex
        justify="space-between"
        alignItems="center"
        borderRadius={4}
        border="1px solid rgba(0, 0, 0, 0.1)"
      >
        <IconButton
          aria-label="Previous"
          icon="arrow-back"
          size="sm"
          borderTopRightRadius={0}
          borderBottomRightRadius={0}
          onClick={handlePrevious}
        />
        <Text fontSize="sm" width="200px" color="#718096" textAlign="center">
          {format(current, 'MMMM yyyy')}
        </Text>
        <IconButton
          aria-label="Next"
          icon="arrow-forward"
          size="sm"
          borderTopLeftRadius={0}
          borderBottomLeftRadius={0}
          onClick={handleNext}
          isDisabled={isSameMonth(current, today)}
        />
      </Flex>
    </Box>
  );
};

export default MonthSelector;
