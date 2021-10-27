import React from 'react';
import {
  StatLabel,
  BoxProps,
  Stat,
  StatHelpText,
  StatNumber,
  Text,
  Skeleton,
  StatArrow,
  Tooltip,
} from '@chakra-ui/core';

import { getPercentDiff } from 'utils/format';

const cardProps: BoxProps = {
  background: 'white',
  border: '1px solid #E2E8F0',
  padding: 2,
  borderRadius: 4,
  mb: 2,
};

interface MetricProps {
  label: string;
  subLabel?: string;
  value?: string | number;
  secondaryValue?: string | number;
  text?: string | number;
  asCard?: boolean;
  isLoading?: boolean;
  gridCol?: string;
  format?: (num?: number) => string;
  invertColours?: boolean;
  hideComparison?: boolean;
}

export const Metric: React.FC<MetricProps> = ({
  label,
  subLabel,
  value = '-',
  secondaryValue,
  text,
  asCard,
  isLoading,
  gridCol,
  format,
  invertColours,
  hideComparison,
}) => {
  const diff = secondaryValue && getPercentDiff(value as any, secondaryValue as any);

  const arrowProps =
    invertColours && diff && secondaryValue
      ? {
          color: secondaryValue < value ? 'red.500' : 'green.500',
        }
      : {};

  return (
    <Stat p={0} {...(asCard ? cardProps : {})} gridColumn={gridCol}>
      <StatLabel color="gray.600">
        {label}
        {subLabel && (
          <Text as="span" fontWeight={400}>
            {subLabel}
          </Text>
        )}
      </StatLabel>
      <Skeleton isLoaded={!isLoading}>
        <StatNumber>{format?.(value as number) || value}</StatNumber>
        {secondaryValue && typeof diff !== 'undefined' ? (
          <Tooltip
            placement="bottom-start"
            showDelay={100}
            label={`Previous ${label.toLowerCase()}: ${
              format?.(secondaryValue as number) || secondaryValue
            }`}
            aria-label="Actual previous value"
          >
            <StatHelpText m={0} cursor="help">
              {diff !== 0 && (
                <StatArrow
                  type={secondaryValue < value ? 'increase' : 'decrease'}
                  {...arrowProps}
                />
              )}
              {diff.toLocaleString('en-GB', { style: 'percent' }).replace('-', '')}
            </StatHelpText>
          </Tooltip>
        ) : !hideComparison ? (
          <StatHelpText m={0}>No Data</StatHelpText>
        ) : null}
        <StatHelpText m={0}>{text}</StatHelpText>
      </Skeleton>
    </Stat>
  );
};
