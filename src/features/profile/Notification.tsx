import React from 'react';
import { Grid, Icon, Text } from '@chakra-ui/core';

import ButtonLink from 'components/ButtonLink';
import { Notification } from './slice';
import Card from 'components/Card';

interface Props {
  notification: Notification;
  px?: number;
  py?: number;
}

const NotificationListItem: React.FC<Props> = ({ notification, ...rest }) => {
  return (
    <Card boxShadow="none" {...rest}>
      <Grid templateColumns="auto 2fr auto" columnGap={4}>
        <Icon
          name={notification.icon}
          m="auto"
          color={notification.iconColour ? `${notification.iconColour}.500` : 'purple.500'}
        />
        <Text m="auto" fontSize="0.9em" color="gray.600">
          {notification.text}
        </Text>
        {notification.actionUrl && (
          <ButtonLink
            text="View"
            linkProps={{
              to: notification.actionUrl,
              style: {
                display: 'flex',
              },
            }}
            buttonProps={{
              m: 'auto',
              size: 'sm',
              variantColor: notification.iconColour || 'purple',
              variant: 'ghost',
            }}
          />
        )}
      </Grid>
    </Card>
  );
};

export default NotificationListItem;
