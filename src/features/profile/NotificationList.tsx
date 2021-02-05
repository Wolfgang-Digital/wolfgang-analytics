import React from 'react';
import { Stack, Text, Box } from '@chakra-ui/core';
import { useSelector } from 'react-redux';

import { getNotifications, Notification } from './slice';
import NotificationListItem from './Notification';

const NotificationList: React.FC = () => {
  const notifications: Notification[] = useSelector(getNotifications);

  return (
    <Box>
      <Text fontSize="0.8em" fontWeight={500} color="gray.500" mb={2}>
        Notifications
      </Text>
      <Stack>
        {notifications.map((notification, i) => (
          <NotificationListItem key={i} notification={notification} />
        ))}
      </Stack>
    </Box>
  );
};

export default NotificationList;
