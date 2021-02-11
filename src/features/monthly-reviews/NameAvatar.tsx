import React from 'react';
import { Avatar, AvatarProps } from '@chakra-ui/core';

import { getInitials } from 'utils/format';

interface Props {
  name: string;
  size?: AvatarProps['size'];
  color?: AvatarProps['color'];
  backgroundColor?: AvatarProps['backgroundColor'];
}

const defaultProps: Omit<AvatarProps, 'name'> = {
  size: 'xs',
  color: 'white',
  backgroundColor: 'purple.500'
};

export const NameAvatar: React.FC<Props> = ({ name, ...rest }) => {
  return <Avatar name={getInitials(name)} {...defaultProps} {...rest} />;
};
