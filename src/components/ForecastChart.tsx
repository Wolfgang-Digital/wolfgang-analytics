import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { ResponsiveContainer, XAxis, YAxis, Line, ComposedChart, Tooltip, Brush, Area, CartesianGrid, Legend } from 'recharts';
import { Box, Spinner, Text, Flex, Icon } from '@chakra-ui/core';

import { IForecast } from 'hooks/useForecast';

interface Props {
  data?: IForecast[];
  isLoading?: boolean;
  error?: string;
}

const ForecastChart: React.FC<Props> = ({ data, isLoading, error }) => {
  const formatDate = (date: string | number) => format(new Date(date), 'dd MMM yyyy');

  const chartData = useMemo(() => {
    if (!data) return [];

    return data.map(({ ds, y, yhat, yhat_lower, yhat_upper }) => ({
      date: ds,
      observed: y,
      predicted: yhat,
      bounds: [yhat_lower, yhat_upper]
    }));
  }, [data]);

  return (
    <Box
      background={!!data && !error && !isLoading ? 'white' : 'inherit'}
      padding="24px 32px 8px 8px"
      gridArea="chart"
      height="100%"
      minHeight="320px"
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
          <Spinner size="lg" color="teal.500" thickness="6px" emptyColor="gray.200" label="Loading..." />
          <Text color="gray.500" marginLeft={6}>
            Generating forecast. This can take a while...
          </Text>
        </Flex>
      ) : !!data ? (
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              domain={['dataMin', 'dataMax']}
              scale="time"
              type="number"
              tickFormatter={formatDate}
              tickCount={5}
              minTickGap={100}
            />
            <Brush dataKey="date" tickFormatter={formatDate} />
            <YAxis />
            <Legend />
            <Tooltip labelFormatter={formatDate} />
            <Line name="Observed" type="monotone" dataKey="observed" dot={false} />
            <Line name="Predicted" type="monotone" dataKey="predicted" dot={false} stroke="#f44336" strokeDasharray="3 3" />
            <Area name="Bounds" type="monotone" dataKey="bounds" fillOpacity={0.1} strokeOpacity={0.5} fill="#ffa726" stroke="#ffa726" />
          </ComposedChart>
        </ResponsiveContainer>
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
