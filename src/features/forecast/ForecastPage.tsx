import React, { useState } from 'react';
import { Grid, FormControl, FormLabel, NumberInput, Input, Flex, Button } from '@chakra-ui/core';
import Select from 'react-select';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

import { useAnalyticsParams, AnalyticsParamsCTX, metricOptions, channelOptions } from 'hooks/useAnalyticsParams';
import AccountSelect from 'features/account-select/AccountSelect';
import { getSelection } from 'features/account-select/slice';
import Card from 'components/Card';
import DatePicker from 'components/DatePicker';
import { useForecast } from './hooks';
import ForecastChart from './ForecastChart';

const ForecastPage: React.FC = () => {
  const { selectedAccount, selectedView } = useSelector(getSelection);

  const [numDays, setNumDays] = useState(90);

  const analytics = useAnalyticsParams();
  const forecast = useForecast();

  const handleDateChange = (dates: { range1: { startDate: Date; endDate: Date } }) => {
    analytics.setDateRange(dates.range1);
  };

  const generateForecast = async () => {
    const params: any = {
      gaAccount: selectedAccount?.value.split('@')[0] || '',
      viewId: selectedView?.value || '',
      metric: analytics.metric?.value || '',
      startDate: format(analytics.startDate, 'yyyy-MM-dd'),
      endDate: format(analytics.endDate, 'yyyy-MM-dd'),
      numDays: numDays || 0,
      channel: analytics.channel?.value || undefined
    };

    if (analytics.sourceMedium.length > 0) params.sourceMedium = analytics.sourceMedium;

    await forecast.fetchData(params);
  };

  const submitButtonEnabled =
    selectedAccount && selectedView && analytics.metric && analytics.startDate && analytics.endDate && numDays && !forecast.isLoading;

  return (
    <AnalyticsParamsCTX.Provider value={analytics}>
      <Grid templateColumns="auto 1fr" templateRows="auto 1fr" templateAreas="'date input''chart chart'" gap={6} minHeight="100%">
        <Card gridArea="date">
          <DatePicker handleChange={handleDateChange} startDate={analytics.startDate} endDate={analytics.endDate} />
          <FormControl isRequired>
            <FormLabel fontSize="14px">Number of days to forecast</FormLabel>
            <NumberInput size="sm" zIndex={0} value={numDays} onChange={value => setNumDays(parseInt(value as string))} />
          </FormControl>
        </Card>
        <Card gridArea="input" fontSize="14px" display="flex" flexDir="column">
          <AccountSelect />
          <FormControl isRequired mt={2}>
            <FormLabel>Metric</FormLabel>
            <Select
              placeholder="Select metric..."
              value={analytics.metric}
              options={metricOptions}
              onChange={selected => {
                analytics.setMetric(selected);
              }}
            />
          </FormControl>
          <Flex mt={2} justify="space-between">
            <FormControl w="100%" mr={4}>
              <FormLabel>Channel Grouping</FormLabel>
              <Select
                placeholder="Select channel..."
                value={analytics.channel}
                options={channelOptions}
                isClearable
                onChange={selected => {
                  analytics.setChannel(selected);
                }}
              />
            </FormControl>
            <FormControl w="100%">
              <FormLabel>Source / Medium</FormLabel>
              <Input
                placeholder="e.g. google / organic"
                value={analytics.sourceMedium}
                onChange={(e: any) => analytics.setSource(e.target.value)}
              />
            </FormControl>
          </Flex>
          <Button size="sm" w="100%" variantColor="teal" mt="auto" onClick={generateForecast} isDisabled={!submitButtonEnabled}>
            Generate Forecast
          </Button>
        </Card>
        <ForecastChart data={forecast.data} isLoading={forecast.isLoading} error={forecast.error} />
      </Grid>
    </AnalyticsParamsCTX.Provider>
  );
};

export default ForecastPage;
