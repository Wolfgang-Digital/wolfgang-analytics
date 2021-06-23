import React from 'react';
import { Grid, Heading, Text, HeadingProps, Box } from '@chakra-ui/core';

import BusyIndicator from 'components/BusyIndicator';
import { useDashboard } from './hooks';
import { StatCard } from './StatCard';
import { FilterList } from './Filters';

const channels = ['PPC', 'SEO', 'Social', 'Content', 'CRO', 'Email', 'Creative', 'Analytics'];

const headingProps: HeadingProps = {
  as: 'span',
  size: 'sm',
  fontWeight: 500,
};

const Dashboard: React.FC = () => {
  const { res, filters, setFilters } = useDashboard();

  return (
    <Box pb={6}>
      <BusyIndicator color="#4FD1C5" isBusy={res.isLoading} />
      <Heading mb={6} size="lg">
        Dashboard
      </Heading>
      <FilterList filters={filters} setFilters={setFilters} />
      {res.data && !res.isLoading && !res.error && (
        <>
          <Grid templateColumns="repeat(6, 1fr)" gridColumnGap={4} gridRowGap={8}>
            <StatCard label="Enquiries" value={res.data.total} subLabel="Total enquiries" />
            <StatCard
              label=" Open Enquiries"
              value={res.data.total_open}
              subLabel="Total open enquiries"
            />
            <StatCard label="New Clients" value={res.data.total_new} subLabel="Total new clients" />
            <StatCard
              label="Existing Clients"
              value={res.data.total - res.data.total_new}
              subLabel="Total existing clients"
            />
            <StatCard
              label="Recurring Enquiries"
              value={res.data.total_ongoing}
              subLabel="Total recurring enquiries"
            />
            <StatCard
              label="Average Velocity"
              value={
                res.data.velocity != null ? res.data.velocity.toString().replace(/\.0$/, '') + ' days' : '-'
              }
              subLabel="Avg. time taken to close"
            />
            <StatCard
              label="Pipeline Turnover"
              value={res.data.total_12mv
                .toLocaleString('en-GB', {
                  style: 'currency',
                  currency: 'EUR',
                })
                .replace(/.00$/, '')}
              subLabel="Total 12 month value"
            />
            <StatCard
              label="Value per Enquiry"
              value={(res.data.total_12mv / 12)
                .toLocaleString('en-GB', {
                  style: 'currency',
                  currency: 'EUR',
                })
                .replace(/.00$/, '')}
              subLabel="Total 12 month value / 12"
            />
            <StatCard
              label="New Client Revenue"
              value={res.data.total_new_12mv
                .toLocaleString('en-GB', {
                  style: 'currency',
                  currency: 'EUR',
                })
                .replace(/.00$/, '')}
              subLabel="12 month value from new clients"
            />
            <StatCard
              label="Existing Client Revenue"
              value={(res.data.total_12mv - res.data.total_new_12mv)
                .toLocaleString('en-GB', {
                  style: 'currency',
                  currency: 'EUR',
                })
                .replace(/.00$/, '')}
              subLabel="12 month value from existing clients"
            />
            <StatCard
              label="Recurring Revenue"
              value={res.data.total_ongoing_12mv
                .toLocaleString('en-GB', {
                  style: 'currency',
                  currency: 'EUR',
                })
                .replace(/.00$/, '')}
              subLabel="12 month recurring value"
            />
            <StatCard
              label="Close Rate"
              value={res.data.close_rate.toLocaleString('en-GB', { style: 'percent' })}
              subLabel="Won / closed enquiries"
            />
          </Grid>
          <Grid templateColumns="200px repeat(8, 1fr)" alignItems="center" mt={12} gridGap={4}>
            <div></div>
            {channels.map((channel) => (
              <Heading key={channel} {...headingProps}>
                {channel}
              </Heading>
            ))}
            <Heading {...headingProps}>Enquiries</Heading>
            {channels.map((channel) => (
              <Text key={channel + '_total'}>
                {(res.data as any)[`${channel.toLowerCase()}_total`]}
              </Text>
            ))}
            <Heading {...headingProps}>Open Enquiries</Heading>
            {channels.map((channel) => (
              <Text key={channel + '_open'}>{(res.data as any)[`${channel.toLowerCase()}_open`]}</Text>
            ))}
            <Heading {...headingProps}>New Clients</Heading>
            {channels.map((channel) => (
              <Text key={channel + '_new'}>{(res.data as any)[`${channel.toLowerCase()}_new`]}</Text>
            ))}
            <Heading {...headingProps}>Existing Clients</Heading>
            {channels.map((channel) => (
              <Text key={channel + '_existing'}>
                {(res.data as any)[`${channel.toLowerCase()}_total`] -
                  (res.data as any)[`${channel.toLowerCase()}_new`]}
              </Text>
            ))}
            <Heading {...headingProps}>Recurring Enquiries</Heading>
            {channels.map((channel) => (
              <Text key={channel + '_ongoing'}>
                {(res.data as any)[`${channel.toLowerCase()}_ongoing`]}
              </Text>
            ))}
            <Heading {...headingProps}>Pipeline Turnover</Heading>
            {channels.map((channel) => (
              <Text key={channel + '_total_12mv'}>
                {(res.data as any)[`${channel.toLowerCase()}_total_12mv`]
                  .toLocaleString('en-GB', {
                    style: 'currency',
                    currency: 'EUR',
                  })
                  .replace(/.00$/, '')}
              </Text>
            ))}
            <Heading {...headingProps}>Value per Enquiry</Heading>
            {channels.map((channel) => (
              <Text key={channel + '_total_12mv'}>
                {((res.data as any)[`${channel.toLowerCase()}_total_12mv`] / 12)
                  .toLocaleString('en-GB', {
                    style: 'currency',
                    currency: 'EUR',
                  })
                  .replace(/.00$/, '')}
              </Text>
            ))}
            <Heading {...headingProps}>New Client Revenue</Heading>
            {channels.map((channel) => (
              <Text key={channel + '_new_12mv'}>
                {(res.data as any)[`${channel.toLowerCase()}_new_12mv`]
                  .toLocaleString('en-GB', {
                    style: 'currency',
                    currency: 'EUR',
                  })
                  .replace(/.00$/, '')}
              </Text>
            ))}
            <Heading {...headingProps}>Existing Client Revenue</Heading>
            {channels.map((channel) => (
              <Text key={channel + '_existing_12mv'}>
                {(
                  (res.data as any)[`${channel.toLowerCase()}_total_12mv`] -
                  (res.data as any)[`${channel.toLowerCase()}_new_12mv`]
                )
                  .toLocaleString('en-GB', {
                    style: 'currency',
                    currency: 'EUR',
                  })
                  .replace(/.00$/, '')}
              </Text>
            ))}
            <Heading {...headingProps}>Recurring Revenue</Heading>
            {channels.map((channel) => (
              <Text key={channel + '_ongoing_12mv'}>
                {(res.data as any)[`${channel.toLowerCase()}_ongoing_12mv`]
                  .toLocaleString('en-GB', {
                    style: 'currency',
                    currency: 'EUR',
                  })
                  .replace(/.00$/, '')}
              </Text>
            ))}
            <Heading {...headingProps}>Velocity</Heading>
            {channels.map((channel) => (
              <Text key={channel + '_velocity'}>
                {(res.data as any)[`${channel.toLowerCase()}_velocity`] != null
                  ? (res.data as any)[`${channel.toLowerCase()}_velocity`]
                  : '-'}
                {(res.data as any)[`${channel.toLowerCase()}_velocity`] !== null && ' days'}
              </Text>
            ))}
            <Heading {...headingProps}>Close Rate</Heading>
            {channels.map((channel) => (
              <Text key={channel + '_close_rate'}>
                {(res.data as any)[`${channel.toLowerCase()}_close_rate`].toLocaleString('en-GB', {
                  style: 'percent',
                })}
              </Text>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
