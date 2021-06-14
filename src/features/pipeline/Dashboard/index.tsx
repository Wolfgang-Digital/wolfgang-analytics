import React from 'react';
import { Grid, Heading, Text } from '@chakra-ui/core';

import { useDashboard } from './hooks';
import { StatCard } from './StatCard';

const channels = ['PPC', 'SEO', 'Social', 'Content', 'CRO', 'Email', 'Creative', 'Analytics'];

const Dashboard: React.FC = () => {
  const { isLoading, data } = useDashboard();

  return (
    <>
      <Heading mb={6} size="lg">
        Dashboard
      </Heading>
      {data && !isLoading && (
        <>
          <Grid templateColumns="repeat(6, 1fr)" gridGap={4}>
            <StatCard label="Total Enquiries" value={data.total} subLabel="Total clients in pipe" />
            <StatCard
              label=" Open Enquiries"
              value={data.total_open}
              subLabel="Total open clients in pipe"
            />
            <StatCard
              label="New Client %"
              value={data.total_new_percent.toLocaleString('en-GB', { style: 'percent' })}
              subLabel="New / total clients"
            />
            <StatCard
              label="Existing Client %"
              value={(1 - data.total_new_percent).toLocaleString('en-GB', { style: 'percent' })}
              subLabel="Exiting / total clients"
            />
            <StatCard
              label="Average Velocity"
              value={data.velocity.replace(/\.0$/, '') + ' days'}
              subLabel="Avg. time taken to close (does not include open enquiries)"
            />
            <StatCard
              label="Close Rate"
              value={data.close_rate.toLocaleString('en-GB', { style: 'percent' })}
              subLabel="Won / closed enquiries"
            />
            <StatCard
              label="Pipeline Turnover"
              value={parseFloat(data.total_12mv).toLocaleString('en-GB', {
                style: 'currency',
                currency: 'EUR',
              })}
              subLabel="Total 12 month value"
            />
            <StatCard
              label="Value per Enquiry"
              value={(data.total_12mv / 12).toLocaleString('en-GB', {
                style: 'currency',
                currency: 'EUR',
              })}
              subLabel="Total 12 month value / 12 (should this be value per month?)"
            />
          </Grid>
          <Grid templateColumns="200px repeat(8, 1fr)" alignItems="center" mt={12} gridGap={4}>
            <div></div>
            {channels.map((channel) => (
              <Heading key={channel} as="span" size="sm">
                {channel}
              </Heading>
            ))}
            <Heading as="span" size="sm">
              Total Enquiries
            </Heading>
            {channels.map((channel) => (
              <Text key={channel + '_total'}>{data[`${channel.toLowerCase()}_total`]}</Text>
            ))}
            <Heading as="span" size="sm">
              Open Enquiries
            </Heading>
            {channels.map((channel) => (
              <Text key={channel + '_open'}>{data[`${channel.toLowerCase()}_open`]}</Text>
            ))}
            <Heading as="span" size="sm">
              Close Rate
            </Heading>
            {channels.map((channel) => (
              <Text key={channel + '_close_rate'}>
                {data[`${channel.toLowerCase()}_close_rate`].toLocaleString('en-GB', {
                  style: 'percent',
                })}
              </Text>
            ))}
            <Heading as="span" size="sm">
              New %
            </Heading>
            {channels.map((channel) => (
              <Text key={channel + '_new_percent'}>
                {data[`${channel.toLowerCase()}_new_percent`].toLocaleString('en-GB', {
                  style: 'percent',
                })}
              </Text>
            ))}
            <Heading as="span" size="sm">
              Existing %
            </Heading>
            {channels.map((channel) => (
              <Text key={channel + '_new_percent'}>
                {(1 - data[`${channel.toLowerCase()}_new_percent`]).toLocaleString('en-GB', {
                  style: 'percent',
                })}
              </Text>
            ))}
            <Heading as="span" size="sm">
              Pipeline Turnover
            </Heading>
            {channels.map((channel) => (
              <Text key={channel + '_total_12mv'}>
                {parseFloat(data[`${channel.toLowerCase()}_total_12mv`]).toLocaleString('en-GB', {
                  style: 'currency',
                  currency: 'EUR',
                })}
              </Text>
            ))}
            <Heading as="span" size="sm">
              Value per Enquiry
            </Heading>
            {channels.map((channel) => (
              <Text key={channel + '_total_12mv'}>
                {(isNaN(
                  data[`${channel.toLowerCase()}_total_12mv`] /
                    data[`${channel.toLowerCase()}_total`]
                )
                  ? 0
                  : data[`${channel.toLowerCase()}_total_12mv`] /
                    data[`${channel.toLowerCase()}_total`]
                ).toLocaleString('en-GB', {
                  style: 'currency',
                  currency: 'EUR',
                })}
              </Text>
            ))}
            <Heading as="span" size="sm">
              Velocity
            </Heading>
            {channels.map((channel) => (
              <Text key={channel + '_velocity'}>{data[`${channel.toLowerCase()}_velocity`] || '-'}</Text>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default Dashboard;
