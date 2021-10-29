import React from 'react';
import { Heading, Box, Divider, Text, Flex } from '@chakra-ui/core';

import BusyIndicator from 'components/BusyIndicator';
import { useFilters, useOverview, useChannelBreakdown, useQueryString, DateRange } from './hooks';
import { FilterList } from './Filters';
import { OverviewDisplay } from './OverviewDisplay';
import { ComparisonSelect } from './ComparisonSelect';
import { DownloadButton } from './DownloadButton';

const Dashboard: React.FC = () => {
  const { filters, setFilters, mode, setMode, range, setRange } = useFilters();
  const query = useQueryString({ filters, comparison: range });
  const overview = useOverview(query);
  const channelBreakdown = useChannelBreakdown(query);

  const manuallySetRange = (newRange: DateRange) => {
    setRange(newRange);
    setMode('off');
  };

  return (
    <Box pb={6}>
      <BusyIndicator color="#4FD1C5" isBusy={overview.isLoading} />
      <Heading mb={6} size="lg">
        Dashboard
      </Heading>
      <FilterList filters={filters} setFilters={setFilters} />
      <ComparisonSelect mode={mode} setMode={setMode} range={range} setRange={manuallySetRange} />
      <OverviewDisplay
        title="Overall Pipeline Stats"
        data={overview?.overall}
        comparison={overview?.overallComparison}
        hideComparison={!range}
      >
        <DownloadButton type="overview" query={query} />
      </OverviewDisplay>
      <Flex align="baseline">
        <Heading my={4} size="sm" fontWeight={500}>
          Breakdown by{' '}
          <Text as="span" color="purple.500">
            Work Duration
          </Text>
        </Heading>
        <DownloadButton type="breakdown" query={query} />
      </Flex>
      {overview?.durationBreakdown?.map((data) => (
        <OverviewDisplay
          key={data.duration}
          duration={data.duration}
          data={data}
          comparison={data.comparison}
          hideComparison={!range}
        />
      ))}
      <Flex align="baseline">
        <Heading my={4} size="sm" fontWeight={500}>
          Breakdown by{' '}
          <Text as="span" color="purple.500">
            Client Type
          </Text>
        </Heading>
      </Flex>
      {overview?.clientTypeBreakdown?.map((data) => (
        <OverviewDisplay
          key={data.client_type}
          duration={data.client_type}
          data={data}
          comparison={data.comparison}
          hideComparison={!range}
        />
      ))}
      <Divider />
      <Flex align="baseline">
        <Heading my={4} size="sm" fontWeight={500}>
          Breakdown by{' '}
          <Text as="span" color="teal.500">
            Channel
          </Text>
        </Heading>
      </Flex>
      {channelBreakdown?.data?.map(({ data, comparison }) => (
        <OverviewDisplay
          key={data.channel}
          channel={data.channel}
          data={data}
          comparison={comparison}
          hideComparison={!range}
        />
      ))}
    </Box>
  );
};

export default Dashboard;
