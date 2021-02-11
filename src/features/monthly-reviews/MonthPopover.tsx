import React, { useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Grid,
  Button,
  Text,
} from '@chakra-ui/core';
import Select from 'react-select';

import { useMonths } from 'hooks/useMonths';

interface Props {
  handleSubmit: (date: Date) => void;
  isLoading?: boolean;
}

const MonthPopover: React.FC<Props> = ({ handleSubmit, isLoading }) => {
  const options = useMonths();

  const [date, setDate] = useState(options[0]);

  return (
    <Popover usePortal>
      <PopoverTrigger>
        <Button variantColor="teal" m="auto" size="sm" fontWeight={400} isLoading={isLoading}>
          Add Response
        </Button>
      </PopoverTrigger>
      <PopoverContent
        zIndex={100}
        _focus={{ outline: 'none' }}
        minWidth={350}
        boxShadow="1px 1px 2px #EDF2F7"
      >
        <PopoverArrow border={0} />
        <PopoverCloseButton />
        <PopoverBody>
          <Text fontSize="0.8em" fontWeight={500} color="gray.500" mb={2}>
            Select Date
          </Text>
          <Grid templateColumns="1fr auto" columnGap={6}>
            <Select
              value={date}
              options={options}
              // @ts-ignore
              onChange={setDate}
            />
            <Button
              variantColor="purple"
              m="auto"
              size="sm"
              fontWeight={400}
              onClick={() => handleSubmit(date.value)}
              isLoading={isLoading}
            >
              Submit
            </Button>
          </Grid>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default MonthPopover;
