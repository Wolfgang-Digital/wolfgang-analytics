import React from 'react';
import { Grid, Icon, Text } from '@chakra-ui/core';

import ButtonLink from 'components/ButtonLink';
import { Notification } from './slice';
import Card from 'components/Card';

interface Props {
  notification: Notification;
}

const NotificationListItem: React.FC<Props> = ({ notification }) => {
  return (
    <Card boxShadow="none" py={2}>
      <Grid templateColumns="auto 2fr auto" columnGap={4}>
        <Icon name={notification.icon} m="auto" color="blue.600" />
        <Text m="auto" fontSize="0.9em" color="gray.600">{notification.text}</Text>
        {notification.actionUrl && (
          <ButtonLink
            text="View"
            linkProps={{
              to: notification.actionUrl,
            }}
            buttonProps={{
              m: 'auto',
              size: 'sm',
              variantColor: 'blue',
              variant: 'ghost'
            }}
          />
        )}
      </Grid>
    </Card>
  );
};

export default NotificationListItem;
