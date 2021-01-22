import React from 'react';
import { Badge } from '@chakra-ui/core';

const colours: Record<string, string> = {
  Dev: 'orange',
};

interface Props {
  department: string;
  m?: string
}

const DeptBadge: React.FC<Props> = ({ department, ...rest }) => {
  return (
    <Badge variantColor={colours[department] || 'gray'} {...rest}>
      {department}
    </Badge>
  );
};

export default DeptBadge;
