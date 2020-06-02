import React, { useState } from 'react';
import { Heading, Grid, Box, FormLabel, Button, NumberInput, Flex, FormControl } from '@chakra-ui/core';
import Select from 'react-select';
import { format } from 'date-fns';

import { useForecast } from 'hooks/useForecast';
import AccountSelector from 'components/AccountSelector';
import Chart from 'components/ForecastChart';
import DatePicker from 'components/DatePicker';

interface IOption {
  label: string;
  value: string;
}

const metricOptions = [
  { label: 'Sessions', value: 'sessions' },
  { label: 'Transactions', value: 'transactions' },
  { label: 'Goal Completions', value: 'goalCompletionsAll' },
  { label: 'Goal Conversion Rate', value: 'goalConversionRateAll' },
  { label: 'CPC', value: 'CPC' },
  { label: 'Transaction Revenue', value: 'transactionRevenue' },
  { label: 'Impressions', value: 'impressions' },
  { label: 'Clicks', value: 'adClicks' },
  { label: 'Cost', value: 'adCost' },
  { label: 'CTR', value: 'CTR' },
  { label: 'ROAS', value: 'ROAS' }
];

const channelOptions = [
  { label: 'Organic', value: 'organic' },
  { label: 'CPC', value: 'cpc' },
  { label: 'Social', value: 'social' }
];

const ForecastPage: React.FC = () => {
  const [account, setAccount] = useState<IOption>();
  const [property, setProperty] = useState<IOption>();
  const [view, setView] = useState<IOption>();
  const [channel, setChannel] = useState<IOption>();

  const [start, setStartDate] = useState(new Date());
  const [end, setEndDate] = useState(new Date());

  const handleDateChange = (dates: { range1: { startDate: Date; endDate: Date } }) => {
    setStartDate(dates.range1.startDate);
    setEndDate(dates.range1.endDate);
  };

  const [metric, setMetric] = useState<IOption>();

  const [numDays, setNumDays] = useState<number>();

  const { fetchData, data, isLoading, error } = useForecast();

  const generateForecast = async () => {
    const params = {
      gaAccount: account?.value.split('@')[0] || '',
      viewId: view?.value || '',
      metric: metric?.value || '',
      startDate: format(start, 'yyyy-MM-dd'),
      endDate: format(end, 'yyyy-MM-dd'),
      numDays: numDays || 0,
      channel: channel?.value || undefined
    };

    await fetchData(params);
  };

  return (
    <Grid
      templateColumns="auto 1fr"
      templateRows="auto auto 1fr"
      templateAreas="'title title''input account''chart chart'"
      gap={6}
      minHeight="100%"
    >
      <Heading gridArea="title">Forecasting Tool</Heading>
      <Box gridArea="input" background="white" boxShadow="rgba(0, 0, 0, 0.15) 1px 1px 4px 0px">
        <DatePicker handleChange={handleDateChange} startDate={start} endDate={end} />
      </Box>
      <Box
        borderRadius={4}
        padding={4}
        background="white"
        gridArea="account"
        display="flex"
        flexDirection="column"
        boxShadow="rgba(0, 0, 0, 0.15) 1px 1px 4px 0px"
      >
        <AccountSelector
          marginBottom={2}
          account={account}
          property={property}
          view={view}
          setAccount={setAccount}
          setProperty={setProperty}
          setView={setView}
        />
        <Flex>
          <FormControl width="100%">
            <FormLabel>Channel</FormLabel>
            <Select
              value={channel}
              options={channelOptions}
              placeholder="Select channel..."
              onChange={selected => {
                setChannel(selected as IOption);
              }}
              isClearable
            />
          </FormControl>
          <FormControl width="100%" mx={4}>
            <FormLabel>Metric</FormLabel>
            <Select
              value={metric}
              options={metricOptions}
              placeholder="Select metric..."
              onChange={selected => {
                setMetric(selected as IOption);
              }}
            />
          </FormControl>
          <FormControl width="100%">
            <FormLabel>Number of Days</FormLabel>
            <NumberInput value={numDays} onChange={value => setNumDays(parseInt(value as string))} />
          </FormControl>
        </Flex>
        <Button
          marginLeft="auto"
          marginTop={3}
          variantColor="purple"
          isDisabled={!start || !end || !metric || !numDays || !account || !view}
          onClick={generateForecast}
          fontWeight={400}
        >
          Generate Forecast
        </Button>
      </Box>
      <Chart isLoading={isLoading} data={data} error={error} />
    </Grid>
  );
};

export default ForecastPage;
