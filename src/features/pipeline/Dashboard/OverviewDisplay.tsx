import React from 'react';
import { Box, Heading, Grid, Flex, Badge, BoxProps, BadgeProps } from '@chakra-ui/core';

import { formatNumberString, getDurationString } from 'utils/format';
import { PipelineOverview } from '../types';
import { Metric } from './Metric';

const colours: Record<string, any> = {
  New: 'purple',
  Recurring: 'purple',
};

const cardProps: BoxProps = {
  background: 'white',
  border: '1px solid #E2E8F0',
  padding: 2,
  borderRadius: 4,
  mb: 2,
  px: 4,
  pr: 1,
};

const badgeProps: BadgeProps = {
  mr: 2,
  mb: 2,
  py: 1,
  w: '82px',
  textAlign: 'center',
};

export const getCurrencyText = (num?: number) => formatNumberString(num || 0, '€');

export const getCloseRateText = (num?: number) => {
  return typeof num === 'number'
    ? num.toLocaleString('en-GB', {
        style: 'percent',
        maximumFractionDigits: typeof num === 'number' && num > 0 && num < 0.01 ? 2 : 0,
      })
    : '-';
};

export const OverviewDisplay: React.FC<{
  title?: string;
  type?: string;
  duration?: string;
  channel?: string;
  data?: Omit<PipelineOverview, 'client_type' | 'duration'>;
  comparison?: Omit<PipelineOverview, 'client_type' | 'duration'>;
  hideComparison?: boolean;
}> = ({ data, title, type, duration, comparison, hideComparison, children, channel }) => {
  return (
    <Box mb={4}>
      <Flex alignItems="center">
        {title && (
          <Heading size="sm" fontWeight={500} mb={2}>
            {title}
          </Heading>
        )}
        {channel && (
          <Badge {...badgeProps} variantColor="teal">
            {channel}
          </Badge>
        )}
        {type && (
          <Badge variantColor={colours[type]} {...badgeProps}>
            {type}
          </Badge>
        )}
        {duration && (
          <Badge variantColor={colours[duration]} {...badgeProps}>
            {duration}
          </Badge>
        )}
        {children}
      </Flex>
      <Grid gridTemplateColumns="minmax(220px, auto) repeat(2, auto)" columnGap={4}>
        <Grid gridTemplateColumns="repeat(3, 1fr)" columnGap={4} {...cardProps}>
          <Metric
            label="Total"
            value={data?.total}
            secondaryValue={comparison?.total}
            isLoading={!!!data}
            hideComparison={hideComparison}
          />
          <Metric
            label="Open"
            value={data?.open_enquiries}
            secondaryValue={comparison?.open_enquiries}
            isLoading={!!!data}
            hideComparison={hideComparison}
          />
          <Metric
            label="Wins"
            value={data?.wins}
            secondaryValue={comparison?.wins}
            isLoading={!!!data}
            hideComparison={hideComparison}
          />
        </Grid>
        <Grid gridTemplateColumns="repeat(3, 1fr)" columnGap={4} {...cardProps}>
          <Metric
            label="Pipeline Turnover"
            value={data?.pipeline_turnover}
            secondaryValue={comparison?.pipeline_turnover}
            isLoading={!!!data}
            format={getCurrencyText}
            hideComparison={hideComparison}
          />
          <Metric
            label="Pitched Revenue"
            value={data?.estimated_won_revenue}
            secondaryValue={comparison?.estimated_won_revenue}
            isLoading={!!!data}
            format={getCurrencyText}
            hideComparison={hideComparison}
          />
          <Metric
            label="Won Revenue"
            value={data?.actual_won_revenue}
            secondaryValue={comparison?.actual_won_revenue}
            isLoading={!!!data}
            format={getCurrencyText}
            hideComparison={hideComparison}
          />
        </Grid>
        <Grid gridTemplateColumns="repeat(3, 1fr)" columnGap={4} {...cardProps}>
          <Metric
            label="Avg. Velocity"
            value={data?.avg_velocity}
            secondaryValue={comparison?.avg_velocity}
            isLoading={!!!data}
            format={getDurationString}
            invertColours
            hideComparison={hideComparison}
          />
          <Metric
            label="Close Rate"
            value={data?.close_rate}
            secondaryValue={comparison?.close_rate}
            isLoading={!!!data}
            format={getCloseRateText}
            hideComparison={hideComparison}
          />
          <Metric
            label="Revenue Close Rate"
            value={data?.revenue_close_rate}
            secondaryValue={comparison?.revenue_close_rate}
            isLoading={!!!data}
            format={getCloseRateText}
            hideComparison={hideComparison}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
