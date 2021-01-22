import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/core';

import Card from './Card';

const LabelledValue: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  return (
    <Flex>
      <Text as="span" fontWeight={500} width="100px">
        {`${label}: `}
      </Text>
      <Text>{value}</Text>
    </Flex>
  );
};

interface InfoCardProps {
  items?: {
    label: string;
    value: string;
  }[];
}

const InfoCard: React.FC<InfoCardProps> = ({ items, children }) => {
  return (
    <Card display="grid" gridTemplateColumns="1fr auto">
      <Box>
        {items?.map((item, i) => (
          <LabelledValue key={i} label={item.label} value={item.value} />
        ))}
      </Box>
      <Box display="flex">
        {children}
      </Box>
    </Card>
  );
};

export default InfoCard;