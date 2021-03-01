import React, { useMemo } from 'react';
import { Text } from '@chakra-ui/core';
import { differenceInHours, differenceInDays, differenceInMinutes } from 'date-fns';

interface Props {
  username?: string;
  created_at?: string;
}

const DateDisplay: React.FC<Props> = ({ username = 'Loading...', created_at }) => {
  const displayDate = useMemo(() => {
    if (!created_at) return '';

    const today = new Date();
    const posted = new Date(created_at);
    let str = '';
    const hours = differenceInHours(today, posted);
    if (hours >= 24) {
      const days = differenceInDays(today, posted);
      const label = days === 1 ? 'day' : 'days';
      str = `${days} ${label} ago`;
    } else if (hours < 1) {
      const mins = differenceInMinutes(today, posted);
      const label = mins === 1 ? 'minute' : 'minutes';
      str = `${mins} ${label} ago`;
    } else {
      const label = hours === 1 ? 'hour' : 'hours';
      str = `${hours} ${label} ago`;
    }
    return str;
  }, [created_at]);

  return (
    <Text fontSize="0.75rem" color="gray.500">
      Posted by {username} {displayDate}
    </Text>
  );
};

export default DateDisplay;