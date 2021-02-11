import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  IconButton,
  Box,
  AvatarBadge,
} from '@chakra-ui/core';
import { useSelector } from 'react-redux';

import NotificationList from './NotificationList';
import { getNumNotifications } from './slice';

const NavigationPopover: React.FC = () => {
  const numNotifications = useSelector(getNumNotifications);

  return (
    <Popover usePortal gutter={0}>
      <PopoverTrigger>
        <Box position="relative">
          <IconButton
            icon="bell"
            aria-label="Notifications"
            isRound
            variant="ghost"
            variantColor="purple"
            size="lg"
            outline="none"
            _focus={{ outline: 'none' }}
          />
          {numNotifications > 0 && (
            <AvatarBadge
              bg="red.500"
              zIndex={200}
              size="16px"
              fontSize="8px"
              fontWeight={300}
              lineHeight={1}
              color="white"
              top="6px"
              right="8px"
              borderWidth="1px"
            >
              {numNotifications}
            </AvatarBadge>
          )}
        </Box>
      </PopoverTrigger>
      <PopoverContent zIndex={100} _focus={{ outline: 'none' }} minWidth={350} border={0}>
        <PopoverArrow border={0} />
        <PopoverCloseButton />
        <PopoverBody>
          <NotificationList px={0} py={0} withDivider />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default NavigationPopover;
