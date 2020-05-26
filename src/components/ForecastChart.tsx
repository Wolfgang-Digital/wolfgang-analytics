import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { ResponsiveContainer, XAxis, YAxis, Line, ComposedChart, Tooltip, Brush, Area, CartesianGrid, Legend } from 'recharts';
import { Box, Spinner, Text, Flex } from '@chakra-ui/core';

import { IForecast } from 'hooks/useForecast';

interface Props {
  data?: IForecast[];
  isLoading?: boolean;
}

const ForecastChart: React.FC<Props> = ({ data, isLoading }) => {
  const [dateFormat, setDateFormat] = useState('dd MMM yyyy');

  const formatDate = (date: string | number) => format(new Date(date), dateFormat);

  const chartData = useMemo(() => {
    if (!data) return undefined;

    return data.map(({ ds, y, yhat, yhat_lower, yhat_upper }) => ({
      date: ds,
      observed: y,
      predicted: Math.round(yhat),
      bounds: [Math.round(yhat_lower), Math.round(yhat_upper)]
    }));
  }, [data]);

  return (
    <Box
      background={!!data ? 'white' : 'inherit'}
      padding="16px 16px 8px 0"
      gridArea="chart"
      height="100%"
      minHeight="320px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {isLoading ? (
        <Flex align="center">
          <Spinner size="lg" color="teal.500" thickness="6px" emptyColor="gray.200" label="Loading..." />
          <Text color="gray.500" marginLeft={6}>
            Generating forecast. This can take a while...
          </Text>
        </Flex>
      ) : !!data ? (
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
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
        <Text color="gray.500">Select an account and click Generate Forecast</Text>
      )}
    </Box>
  );
};

export default ForecastChart;
