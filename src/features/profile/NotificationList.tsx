import React from 'react';
import { Stack, Text, Box, Skeleton, Divider } from '@chakra-ui/core';
import { useSelector } from 'react-redux';

import { getNotifications, getIsLoading, Notification } from './slice';
import NotificationListItem from './Notification';
import Message from 'components/Message';

interface Props {
  px?: number;
  py?: number;
  withDivider?: boolean;
}

const NotificationList: React.FC<Props> = ({ withDivider, ...rest }) => {
  const notifications: Notification[] = useSelector(getNotifications);
  const isLoading = useSelector(getIsLoading);

  return (
    <Box>
      <Text fontSize="0.8em" fontWeight={500} color="gray.500" mb={2}>
        Notifications
      </Text>
      <Skeleton isLoaded={!isLoading}>
        <Stack spacing={2}>
          {notifications.length > 0 ? (
            notifications.map((notification, i) => (
              <div key={i}>
                <NotificationListItem notification={notification} {...rest} />
                {withDivider && i < notifications.length - 1 ? <Divider /> : null}
              </div>
            ))
          ) : (
            <Message
              message="You have no new notifications"
              iconProps={{
                name: 'info',
                color: 'purple.400',
                marginRight: 3,
                transform: 'translateY(1px)',
              }}
              textProps={{
                fontSize: '0.85em',
              }}
            />
          )}
        </Stack>
      </Skeleton>
    </Box>
  );
};

export default NotificationList;
