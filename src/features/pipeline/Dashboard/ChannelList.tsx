import React, { useState } from 'react';
import {
  Box,
  Heading,
  StatLabel,
  BoxProps,
  Stat,
  StatHelpText,
  StatNumber,
  Flex,
  Input,
} from '@chakra-ui/core';

import { formatNumberString } from 'utils/format';
import { ChannelReport } from '../types';

interface ChannelListProps {
  reports?: ChannelReport[];
}

interface MetricProps {
  label: string;
  value?: string | number;
  secondaryValue?: string | number;
  text?: string | number;
  asCard?: boolean;
}

const cardProps: BoxProps = {
  background: 'white',
  border: '1px solid #E2E8F0',
  padding: 2,
  borderRadius: 4,
  mb: 2,
};

export const getVelocityText = (num?: number) => {
  if (!num) return 'N/A';
  return `${num.toFixed(1)} days`;
};

interface VelocityData {
  avg_win_velocity?: number | string
  avg_loss_velocity?: number | string
  avg_recurring_velocity?: number | string
}

export const getVelocityBreakdown = ({
  avg_win_velocity,
  avg_loss_velocity,
  avg_recurring_velocity,
}: Partial<VelocityData>) => {
  const win = avg_win_velocity === undefined ? 'N/A' : avg_win_velocity;
  const loss = avg_loss_velocity === undefined ? 'N/A' : avg_loss_velocity;
  const recurring = avg_recurring_velocity === undefined ? 'N/A' : avg_recurring_velocity;
  return `${win} | ${loss} | ${recurring}`;
};

export const getRate = (a: number, b: number) => {
  return (a / (b === 0 ? 1 : b)).toLocaleString('en-GB', { style: 'percent' }).replace(/\.0+$/, '');
};

export const Metric: React.FC<MetricProps> = ({
  label,
  value = '-',
  secondaryValue,
  text,
  asCard,
}) => {
  return (
    <Stat p={0} {...(asCard ? cardProps : {})}>
      <StatLabel>{label}</StatLabel>
      <StatNumber>{value}</StatNumber>
      <StatHelpText m={0}>{secondaryValue}</StatHelpText>
      <StatHelpText m={0}>{text}</StatHelpText>
    </Stat>
  );
};

const ChannelList: React.FC<ChannelListProps> = ({ reports }) => {
  const [filter, setFilter] = useState('');

  const list = reports
    ? filter.length > 0
      ? reports.filter((x) => x.channel.toLowerCase().includes(filter))
      : reports
    : [];

  return (
    <Box>
      <Flex justify="space-between" alignItems="flex-end" mb={2}>
        <Heading size="sm" fontWeight={500}>
          Channel Breakdown
        </Heading>
        <Input
          size="sm"
          maxWidth="300px"
          placeholder="Filter by channel"
          onChange={(e: any) => setFilter(e.target.value)}
        />
      </Flex>
      {list.map((report) => (
        <Flex key={report.channel} justifyContent="space-between" {...cardProps}>
          <Stat p={0} maxW="140px">
            <StatLabel>Channel</StatLabel>
            <StatNumber>{report.channel}</StatNumber>
          </Stat>
          <Metric
            label="Enquiries"
            value={report.total}
            secondaryValue={`${report.total_open} | ${report.total_new} | ${report.total_recurring}`}
            text="Open | New | Recurring"
          />
          <Metric
            label="Wins"
            value={report.total_won}
            secondaryValue={`${report.new_won} | ${report.recurring_won}`}
            text="New | Recurring"
          />
          <Metric
            label="Pipeline Turnover"
            value={formatNumberString(report.total_revenue, '€')}
            secondaryValue={`${formatNumberString(report.total_new_revenue)} | ${formatNumberString(
              report.total_won_revenue
            )} | ${formatNumberString(report.total_recurring_revenue)}`}
            text="New | Won | Recurring"
          />
          <Metric
            label="Value per Month"
            value={formatNumberString(report.total_revenue / 12, '€')}
            secondaryValue={`${formatNumberString(
              report.total_new_revenue / 12
            )} | ${formatNumberString(report.total_won_revenue / 12)} | ${formatNumberString(
              report.total_recurring_revenue / 12
            )}`}
            text="New | Won | Recurring"
          />
          <Metric
            label="Avg. Velocity"
            value={getVelocityText(report.avg_velocity)}
            secondaryValue={getVelocityBreakdown(report)}
            text="Won | Lost | Recurring"
          />
          <Metric
            label="Close Rate"
            value={getRate(report.total_won, report.total)}
            secondaryValue={`${getRate(report.new_won, report.total_new)} | ${getRate(
              report.recurring_won,
              report.total_recurring
            )}`}
            text="New | Recurring"
          />
        </Flex>
      ))}
    </Box>
  );
};

export default ChannelList;
