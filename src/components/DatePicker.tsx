import React from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker, DateRange, Calendar } from 'react-date-range';
import {
  Popover,
  PopoverTrigger,
  PseudoBox,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Grid,
  Text,
  IconButton,
  Icon,
} from '@chakra-ui/core';
import { format } from 'date-fns';

interface Props {
  startDate?: Date;
  endDate?: Date;
  handleChange: (val: any) => void;
}

const DatePicker: React.FC<Props> = ({
  startDate = new Date(),
  endDate = new Date(),
  handleChange,
}) => {
  return (
    <DateRangePicker
      ranges={[
        {
          startDate,
          endDate,
        },
      ]}
      onChange={handleChange}
    />
  );
};

export const DatePopover: React.FC<Props> = ({
  startDate = new Date(),
  endDate = new Date(),
  handleChange,
}) => {
  return (
    <Popover usePortal gutter={0} placement="bottom-start">
      <PopoverTrigger>
        <PseudoBox
          display="flex"
          alignItems="center"
          cursor="pointer"
          borderRadius={4}
          border="1px solid #E2E8F0"
          px={4}
          py={2}
          transition="all 200ms ease-out"
          _hover={{
            background: 'white',
          }}
        >
          <Icon name="calendar" color="teal.500" />
          <Text as="span" transform="translateY(1px)" ml={2}>
            <Text as="span" fontWeight={500}>
              {format(startDate, 'dd MMMM yy')}
            </Text>{' '}
            to{' '}
            <Text as="span" fontWeight={500}>
              {format(endDate, 'dd MMMM yy')}
            </Text>
          </Text>
        </PseudoBox>
      </PopoverTrigger>
      <PopoverContent zIndex={100} _focus={{ outline: 'none' }} minWidth={350} border={0}>
        <PopoverArrow border={0} />
        <PopoverBody>
          <DateRange
            ranges={[
              {
                startDate,
                endDate,
              },
            ]}
            onChange={handleChange}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

interface CalendarProps {
  date?: Date;
  setDate: (date: Date) => void;
}

export const CalendarPicker: React.FC<CalendarProps> = ({ date, setDate }) => {
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Grid cursor="pointer" minWidth="100px" templateColumns="1fr auto" alignItems="center">
          <Text>{date ? format(date, 'dd MMM yyyy') : 'Not Set'}</Text>
          <IconButton icon="edit" size="xs" aria-label="Edit date" />
        </Grid>
      </PopoverTrigger>
      <PopoverContent zIndex={100} _focus={{ outline: 'none' }} minWidth={350} border={0}>
        <PopoverBody display="flex" justifyContent="center" alignItems="center">
          <Calendar date={date as any} onChange={(_date: any) => setDate(_date)} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
