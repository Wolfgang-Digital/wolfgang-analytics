import React from 'react';
import { Badge } from '@chakra-ui/core';

const colours: Record<string, string> = {
  Dev: 'teal',
  PPC: 'red',
  SEO: 'orange',
  Social: 'purple',
  Content: 'cyan',
  CRO: 'blue',
  Admin: 'red',
  'Department Head': 'orange',
  'Client Lead': 'purple'
};

interface Props  {
  department?: string;
  m?: string;
}

const DeptBadge: React.FC<Props> = ({ department, ...rest }) => {
  return (
    <Badge
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={2}
      minHeight="24px"
      variantColor={colours[department || ''] || 'gray'}
      {...rest}
    >
      {department || 'None'}
    </Badge>
  );
};

export default DeptBadge;
