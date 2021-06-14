import React from 'react';
import { Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/core';

interface Props {
  label: string
  value: number | string
  subLabel?: string
}

export const StatCard: React.FC<Props> = ({ label, value, subLabel }) => (
  <Stat>
    <StatLabel>{label}</StatLabel>
    <StatNumber>{value}</StatNumber>
    <StatHelpText>{subLabel}</StatHelpText>
  </Stat>
);
