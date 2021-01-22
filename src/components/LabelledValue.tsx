import React from 'react';
import { Flex, Text } from '@chakra-ui/core';

const LabelledValue: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  return (
    <Flex>
      <Text as="span" fontWeight={500} width="120px">
        {`${label}: `}
      </Text>
      <Text>{value}</Text>
    </Flex>
  );
};

export default LabelledValue;