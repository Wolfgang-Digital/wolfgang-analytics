import React, { useState } from 'react';
import {
  PseudoBox,
  Text,
  Flex,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  RadioGroup,
  Radio,
  Button,
  PopoverHeader,
} from '@chakra-ui/core';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';

interface Props {
  mode: string;
  setMode: (mode: string) => void;
  range?: { range1: { startDate: Date; endDate: Date } };
  setRange: (range: { range1: { startDate: Date; endDate: Date } }) => void;
}

export const ComparisonSelect: React.FC<Props> = ({ range, setRange, mode, setMode }) => {
  const [innerRange, setInnerRange] = useState(range);

  const handleSubmit = () => {
    setRange(innerRange as any);
  };

  return (
    <Flex align="center" justify="space-between" mb={6}>
      <Flex
        align="center"
        border="1px solid rgba(0,0,0,0.1)"
        maxW="fit-content"
        h={42}
        px={3}
        borderRadius={4}
      >
        <Text fontSize="14px" color="#4A5568" fontWeight={500}>
          Dynamic comparison:
        </Text>
        <RadioGroup
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          isInline
          size="sm"
          alignItems="center"
          ml={2}
          pt={1}
          spacing={4}
        >
          <Radio value="off" variantColor="red">
            Off
          </Radio>
          <Radio value="range">Range</Radio>
          <Radio value="month">Month</Radio>
          <Radio value="year">Year</Radio>
        </RadioGroup>
      </Flex>
      <Popover placement="right-end">
        <PopoverTrigger>
          <PseudoBox
            display="grid"
            gridTemplateColumns="repeat(1, max-content)"
            gridGap={4}
            border="1px solid rgba(0,0,0,0.1)"
            maxW="fit-content"
            h={42}
            px={3}
            borderRadius={4}
            alignItems="center"
            cursor="pointer"
            transition="background 200ms ease-out"
            _hover={{ backgroundColor: '#EDF2F7 !important' }}
          >
            <Flex align="center">
              <Icon
                name="calendar"
                aria-hidden
                mr={2}
                color="#4A5568"
                transform="translateY(-1px)"
              />
              {range && innerRange ? (
                <>
                  <Text fontSize="14px" color="#4A5568" mr={1}>
                    Comparing to
                  </Text>
                  <Text fontSize="14px" color="#4A5568" fontWeight={500}>
                    {format(range.range1.startDate, 'dd MMM yy')}
                  </Text>
                  <Text fontSize="14px" color="#4A5568" mx={2}>
                    -
                  </Text>
                  <Text fontSize="14px" color="#4A5568" fontWeight={500}>
                    {format(range.range1.endDate, 'dd MMM yy')}
                  </Text>
                </>
              ) : (
                <Text fontSize="14px" color="#4A5568" fontWeight={500}>
                  Comparison unavailable
                </Text>
              )}
            </Flex>
          </PseudoBox>
        </PopoverTrigger>
        {range && innerRange && (
          <PopoverContent
            zIndex={100}
            _focus={{ outline: 'none' }}
            minWidth="fit-content"
            border={0}
          >
            <PopoverHeader
              textAlign="center"
              fontWeight={700}
              color="gray.600"
              fontSize="14px"
              pb={1}
            >
              Compare To
            </PopoverHeader>
            <PopoverBody
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <DateRange ranges={[innerRange.range1]} onChange={setInnerRange as any} />
              <Button
                size="sm"
                isFullWidth
                variantColor="blue"
                variant="ghost"
                fontWeight={400}
                onClick={handleSubmit}
              >
                Apply Filter
              </Button>
            </PopoverBody>
          </PopoverContent>
        )}
      </Popover>
    </Flex>
  );
};
