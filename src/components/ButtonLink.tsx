import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/core';
import { Link, LinkProps } from 'react-router-dom';

interface Props {
  text: string;
  buttonProps?: Omit<ButtonProps, 'children'>;
  linkProps: LinkProps;
}

const ButtonLink: React.FC<Props> = ({ text, buttonProps, linkProps }) => (
  <Link {...linkProps}>
    <Button {...buttonProps}>{text}</Button>
  </Link>
);

export default ButtonLink;