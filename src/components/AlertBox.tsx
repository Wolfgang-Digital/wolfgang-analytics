import React from 'react';
import { Alert, AlertIcon, AlertTitle, AlertDescription, AlertProps } from '@chakra-ui/core';

interface Props {
  status: AlertProps['status'];
  title: string;
  description: string;
  margin?: string
}

const AlertBox: React.FC<Props> = ({ status, title, description, children, ...rest }) => (
  <Alert
    status={status}
    variant="subtle"
    flexDirection="column"
    justifyContent="center"
    textAlign="center"
    height="200px"
    borderRadius={4}
    minWidth="100%"
    {...rest}
  >
    <AlertIcon size="40px" mr={0} />
    <AlertTitle mt={4} mb={1} fontSize="lg">
      {title}
    </AlertTitle>
    <AlertDescription maxWidth="sm">
      {description}
    </AlertDescription>
    {children}
  </Alert>
);

export default AlertBox;