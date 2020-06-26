import React, { useMemo, useState } from 'react';
import { format } from 'date-fns';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  ComposedChart,
  Tooltip,
  Brush,
  Area,
  CartesianGrid,
  Legend
} from 'recharts';
import { Box, Spinner, Text, Flex, Icon, ButtonGroup, Button, Grid } from '@chakra-ui/core';

import { Forecast } from './hooks';
import { groupByMonth } from './utils';
import { formatNumberString } from 'utils/format';

interface Props {
  data?: Forecast[];
  isLoading?: boolean;
  error?: string;
}

const ForecastChart: React.FC<Props> = ({ data, isLoading, error }) => {
  const [viewAs, setViewAs] = useState('month');

  const formatDate = (date: string | number) =>
    format(new Date(date), viewAs === 'month' ? 'MMM yy' : 'dd MMM yy');

  const formatValue = (value: any | any[]) => {
    if (Array.isArray(value) && value.length > 1) {
      return `${formatNumberString(value[0])} ~ ${formatNumberString(value[1])}`;
    }
    return formatNumberString(value);
  };

  const chartData = useMemo(() => {
    if (!data) return [];

    const groupedData = viewAs === 'month' ? groupByMonth(data) : data;

    return groupedData.map(({ ds, y, yhat, yhat_lower, yhat_upper }) => ({
      date: ds,
      observed: isNaN(y) ? null : y,
      predicted: yhat,
      bounds: [yhat_lower, yhat_upper]
    }));
  }, [data, viewAs]);

  return (
    <Box
      background={!!data && !error && !isLoading ? 'white' : 'inherit'}
      padding={4}
      gridArea="chart"
      height="100%"
      minHeight="350px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      boxShadow={!!data && !isLoading && !error ? 'rgba(0, 0, 0, 0.15) 1px 1px 4px 0px' : 0}
    >
      {!!error ? (
        <Flex align="center">
          <Icon name="warning-2" color="red.500" marginRight={3} />
          <Text color="red.500">{error}</Text>
        </Flex>
      ) : isLoading ? (
        <Flex align="center">
          <Spinner
            size="lg"
            color="teal.500"
            thickness="6px"
            emptyColor="gray.200"
            label="Loading..."
          />
          <Text color="gray.500" marginLeft={6}>
            Generating forecast. This can take a while...
          </Text>
        </Flex>
      ) : Array.isArray(data) && data.length > 0 ? (
        <Grid gridTemplateRows="auto 1fr" width="100%" height="100%">
          <Flex>
            <Text as="span" ml="auto" fontSize="12px" alignSelf="center">
              View As
            </Text>
            <ButtonGroup size="xs" mx={4}>
              <Button
                variantColor={viewAs === 'day' ? 'teal' : undefined}
                onClick={() => setViewAs('day')}
              >
                Daily
              </Button>
              <Button
                variantColor={viewAs === 'month' ? 'teal' : undefined}
                onClick={() => setViewAs('month')}
              >
                Monthly
              </Button>
            </ButtonGroup>
          </Flex>
          <ResponsiveContainer width="100%" height="100%" maxHeight="500px">
            <ComposedChart data={chartData} margin={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                domain={['dataMin', 'dataMax']}
                scale="time"
                type="number"
                tickFormatter={formatDate}
                minTickGap={100}
              />
              <Brush dataKey="date" tickFormatter={formatDate} height={20} />
              <YAxis tickFormatter={formatNumberString} />
              <Legend />
              <Tooltip labelFormatter={formatDate} formatter={value => formatValue(value)} />
              <Line name="Observed" type="monotone" dataKey="observed" dot={false} />
              <Line
                name="Predicted"
                type="monotone"
                dataKey="predicted"
                dot={false}
                stroke="#f44336"
                strokeDasharray="3 3"
              />
              <Area
                name="Bounds"
                type="monotone"
                dataKey="bounds"
                fillOpacity={0.1}
                strokeOpacity={0.5}
                fill="#ffa726"
                stroke="#ffa726"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Grid>
      ) : (
        <Flex align="center">
          <Icon name="info" marginRight={3} color="teal.500" />
          <Text color="gray.500">Select an account and click Generate Forecast</Text>
        </Flex>
      )}
    </Box>
  );
};

export default ForecastChart;
