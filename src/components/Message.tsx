import React from 'react';
import { Flex, Icon, Text, FlexProps, IconProps, BoxProps } from '@chakra-ui/core';

interface Props {
  message: string;
  flexProps?: FlexProps;
  iconProps?: IconProps;
  textProps?: BoxProps;
}

const defaultFlexProps: FlexProps = {
  align: 'center'
};

const defaultIconProps: IconProps = {
  name: 'info',
  color: 'teal.500',
  marginRight: 3
};

const defaultTextProps: BoxProps = {
  color: 'gray.500'
};

const Message: React.FC<Props> = ({ message, flexProps, iconProps, textProps }) => {
  return (
    <Flex {...defaultFlexProps} {...flexProps}>
      <Icon {...defaultIconProps} {...iconProps} />
      <Text {...defaultTextProps} {...textProps}>
        {message}
      </Text>
    </Flex>
  );
};

export default Message;