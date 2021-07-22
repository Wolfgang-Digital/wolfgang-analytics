import React from 'react';
import {
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  BoxProps,
  StatHelpText,
  StatArrow,
  Text,
  Flex,
} from '@chakra-ui/core';
import { format } from 'date-fns';

import { TargetReport } from './hooks';

interface Props {
  report: TargetReport;
  previousReport?: TargetReport;
}

const cardProps: BoxProps = {
  background: 'white',
  border: '1px solid #E2E8F0',
  padding: 2,
  borderRadius: 4,
  mb: 2,
};

const getColour = (num: number) => {
  return num >= 1 ? 'green.500' : 'inherit';
};

const getPercent = (v1: number, v2: number) =>
  (v1 / (v2 === 0 ? 1 : v2)).toLocaleString('en-GB', { style: 'percent' });

const getCurrency = (num: number) =>
  num.toLocaleString('en-GB', { style: 'currency', currency: 'EUR' }).replace(/.0?0$/, '');

const getArrow = (key1: string, key2: string, report: any, previousReport?: any) => {
  if (!previousReport) return null;

  const pcNew = report[key1] / (report[key2] === 0 ? 1 : report[key2]);
  const pcOld = previousReport[key1] / (previousReport[key2] === 0 ? 1 : previousReport[key2]);

  const diff = pcNew > pcOld ? 'increase' : pcOld > pcNew ? 'decrease' : undefined;

  return diff ? (
    <Flex display="inline" ml={2}>
      <StatArrow type={diff} />
      <Text as="span" fontSize="14px" color="gray.500" fontWeight={400}>
        {(pcNew - pcOld).toLocaleString('en-GB', { style: 'percent' }).replace(/-/, '')}
      </Text>
    </Flex>
  ) : null;
};

export const ListItem: React.FC<Props> = ({ report, previousReport }) => {
  const {
    target_date,
    target_enquiries,
    target_value,
    target_wins,
    target_revenue,
    enquiries,
    enquiry_value,
    wins,
    revenue,
  } = report;

  return (
    <Grid templateColumns="repeat(5, 1fr) auto" gridColumnGap={4} {...cardProps}>
      <Stat p={0}>
        <StatLabel>Target Date</StatLabel>
        <StatNumber as="div">{format(new Date(target_date), 'MMMM yyyy')}</StatNumber>
      </Stat>
      <Stat p={0}>
        <StatLabel>Enquiries</StatLabel>
        <StatNumber as="div" color={getColour(enquiries / target_enquiries)}>
          {getPercent(enquiries, target_enquiries)}
          {getArrow('enquiries', 'target_enquiries', report, previousReport)}
        </StatNumber>
        <StatHelpText m={0}>
          {enquiries} / {target_enquiries}
        </StatHelpText>
      </Stat>
      <Stat p={0}>
        <StatLabel>Enquiry Value</StatLabel>
        <StatNumber as="div" color={getColour(enquiry_value / target_value)}>
          {getPercent(enquiry_value, target_value)}
          {getArrow('enquiry_value', 'target_value', report, previousReport)}
        </StatNumber>
        <StatHelpText m={0}>
          {getCurrency(enquiry_value)} / {getCurrency(target_value)}
        </StatHelpText>
      </Stat>
      <Stat p={0}>
        <StatLabel>Wins</StatLabel>
        <StatNumber as="div" color={getColour(wins / target_wins)}>
          {getPercent(wins, target_wins)}
          {getArrow('wins', 'target_wins', report, previousReport)}
        </StatNumber>
        <StatHelpText m={0}>
          {wins} / {target_wins}
        </StatHelpText>
      </Stat>
      <Stat p={0}>
        <StatLabel>Revenue</StatLabel>
        <StatNumber as="div" color={getColour(revenue / target_revenue)}>
          {getPercent(revenue, target_revenue)}
          {getArrow('revenue', 'target_revenue', report, previousReport)}
        </StatNumber>
        <StatHelpText m={0}>
          {getCurrency(revenue)} / {getCurrency(target_revenue)}
        </StatHelpText>
      </Stat>
    </Grid>
  );
};
