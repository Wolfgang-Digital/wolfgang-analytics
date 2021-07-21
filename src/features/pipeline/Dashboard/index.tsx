import React from 'react';
import { Heading, Box, Grid, Divider } from '@chakra-ui/core';

import BusyIndicator from 'components/BusyIndicator';
import { useChannelReports, useOverview } from './hooks';
import { FilterList } from './Filters';
import ChannelList, { Metric, getRate, getVelocityText, getVelocityBreakdown } from './ChannelList';
import { formatNumberString } from 'utils/format';

const Dashboard: React.FC = () => {
  const { channelReports, filters, setFilters } = useChannelReports();
  const overview = useOverview(filters, channelReports.data || []);

  return (
    <Box pb={6}>
      <BusyIndicator color="#4FD1C5" isBusy={channelReports.isLoading || overview.isLoading} />
      <Heading mb={6} size="lg">
        Dashboard
      </Heading>
      <FilterList filters={filters} setFilters={setFilters} />
      <Heading size="sm" fontWeight={500} mb={2}>
        Overview
      </Heading>
      <Grid templateColumns="repeat(6, 1fr)" columnGap={4}>
        <Metric
          label="Enquiries"
          value={overview.data.total}
          secondaryValue={`${overview.data.total_open} | ${overview.data.total_new} | ${overview.data.total_recurring}`}
          text="Open | New | Recurring"
          asCard
        />
        <Metric
          label="Wins"
          value={overview.data.total_won}
          secondaryValue={`${overview.data.new_won} | ${overview.data.recurring_won}`}
          text="New | Recurring"
          asCard
        />
        <Metric
          label="Pipeline Turnover"
          value={formatNumberString(overview.data.total_revenue, '€')}
          secondaryValue={`${formatNumberString(
            overview.data.total_new_revenue
          )} | ${formatNumberString(overview.data.total_won_revenue)} | ${formatNumberString(
            overview.data.total_recurring_revenue
          )}`}
          text="New | Won | Recurring"
          asCard
        />
        <Metric
          label="Value per Month"
          value={formatNumberString(overview.data.total_revenue / 12, '€')}
          secondaryValue={`${formatNumberString(
            overview.data.total_new_revenue / 12
          )} | ${formatNumberString(overview.data.total_won_revenue / 12)} | ${formatNumberString(
            overview.data.total_recurring_revenue / 12
          )}`}
          text="New | Won | Recurring"
          asCard
        />
        <Metric
          label="Avg. Velocity"
          value={getVelocityText(overview.data.avg_velocity)}
          secondaryValue={getVelocityBreakdown(overview.data)}
          text="Won | Lost | Recurring"
          asCard
        />
        <Metric
          label="Close Rate"
          value={getRate(overview.data.total_won, overview.data.total)}
          secondaryValue={`${getRate(overview.data.new_won, overview.data.total_new)} | ${getRate(
            overview.data.recurring_won,
            overview.data.total_recurring
          )}`}
          text="New | Recurring"
          asCard
        />
      </Grid>
      <Divider my={6} />
      <ChannelList reports={channelReports.data} />
    </Box>
  );
};

export default Dashboard;
