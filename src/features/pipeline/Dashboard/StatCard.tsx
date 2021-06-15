import React from 'react';
import { Stat, StatLabel, StatNumber, StatHelpText, BoxProps } from '@chakra-ui/core';

interface Props {
  label: string
  value: number | string
  subLabel?: string
}

const cardProps: BoxProps = {
  background: 'white',
  border: '1px solid #E2E8F0',
  padding: 2,
  pb: 0,
  borderRadius: 4,
};

export const StatCard: React.FC<Props> = ({ label, value, subLabel }) => (
  <Stat {...cardProps}>
    <StatLabel>{label}</StatLabel>
    <StatNumber>{value}</StatNumber>
    <StatHelpText>{subLabel}</StatHelpText>
  </Stat>
);
