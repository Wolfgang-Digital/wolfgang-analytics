import React, { useState } from 'react';
import { Grid, Heading, Text, HeadingProps, Flex, Box } from '@chakra-ui/core';
import { setDate } from 'date-fns';

import BusyIndicator from 'components/BusyIndicator';
import { DatePopover } from 'components/DatePicker';
import { useDashboard } from './hooks';
import { StatCard } from './StatCard';

const channels = ['PPC', 'SEO', 'Social', 'Content', 'CRO', 'Email', 'Creative', 'Analytics'];

const headingProps: HeadingProps = {
  as: 'span',
  size: 'sm',
  fontWeight: 500,
};

const Dashboard: React.FC = () => {
  const [dates, setDates] = useState<any>({ start: setDate(new Date(), 1), end: new Date() });
  const { isLoading, data, error } = useDashboard(dates);

  const handeDateChange = (values: any) => {
    setDates(values);
  };

  return (
    <Box pb={6}>
      <BusyIndicator color="#4FD1C5" isBusy={isLoading} />
      <Heading mb={6} size="lg">
        Dashboard
      </Heading>
      <Flex mb={6}>
        <DatePopover startDate={dates.start} endDate={dates.end} handleChange={handeDateChange} />
      </Flex>
      {data && !isLoading && !error && (
        <>
          <Grid templateColumns="repeat(6, 1fr)" gridColumnGap={4} gridRowGap={8}>
            <StatCard
              label="Total Enquiries"
              value={data.total}
              subLabel="Total unique enquiries"
            />
            <StatCard
              label=" Open Enquiries"
              value={data.total_open}
              subLabel="Total open enquiries"
            />
            <StatCard
              label="New Client %"
              value={data.total_new_percent.toLocaleString('en-GB', { style: 'percent' })}
              subLabel="New / total enquiries"
            />
            <StatCard
              label="Existing Client %"
              value={(1 - (data.total_new_percent || 1)).toLocaleString('en-GB', {
                style: 'percent',
              })}
              subLabel="Existing / total enquiries"
            />
            <StatCard
              label="Ongoing %"
              value={data.total_ongoing_percent.toLocaleString('en-GB', { style: 'percent' })}
              subLabel="Ongoing / total enquiries"
            />
            <StatCard
              label="Once Off %"
              value={(1 - (data.total_ongoing_percent || 1)).toLocaleString('en-GB', {
                style: 'percent',
              })}
              subLabel="Once off / total enquiries"
            />
            <StatCard
              label="Pipeline Turnover"
              value={data.total_12mv
                .toLocaleString('en-GB', {
                  style: 'currency',
                  currency: 'EUR',
                })
                .replace(/.00$/, '')}
              subLabel="Total 12 month value"
            />
            <StatCard
              label="Value per Enquiry"
              value={(data.total_12mv / 12)
                .toLocaleString('en-GB', {
                  style: 'currency',
                  currency: 'EUR',
                })
                .replace(/.00$/, '')}
              subLabel="Total 12 month value / 12"
            />
            <StatCard
              label="Once Off Value"
              value={data.total_once_off_value
                .toLocaleString('en-GB', {
                  style: 'currency',
                  currency: 'EUR',
                })
                .replace(/.00$/, '')}
              subLabel="12 month once off value"
            />
            <StatCard
              label="Once Off Value %"
              value={(data.total_once_off_value / (data.total_12mv || 1)).toLocaleString('en-GB', {
                style: 'percent',
              })}
              subLabel="Once off value / 12 month value"
            />
            <StatCard
              label="Close Rate"
              value={data.close_rate.toLocaleString('en-GB', { style: 'percent' })}
              subLabel="Won / closed enquiries"
            />
            <StatCard
              label="Average Velocity"
              value={
                data.velocity != null ? data.velocity.toString().replace(/\.0$/, '') + ' days' : '-'
              }
              subLabel="Avg. time taken to close"
            />
          </Grid>
          <Grid templateColumns="200px repeat(8, 1fr)" alignItems="center" mt={12} gridGap={4}>
            <div></div>
            {channels.map((channel) => (
              <Heading key={channel} {...headingProps}>
                {channel}
              </Heading>
            ))}
            <Heading {...headingProps}>Total Enquiries</Heading>
            {channels.map((channel) => (
              <Text key={channel + '_total'}>
                {(data as any)[`${channel.toLowerCase()}_total`]}
              </Text>
            ))}
            <Heading {...headingProps}>Open Enquiries</Heading>
            {channels.map((channel) => (
              <Text key={channel + '_open'}>{(data as any)[`${channel.toLowerCase()}_open`]}</Text>
            ))}
            <Heading {...headingProps}>New %</Heading>
            {channels.map((channel) => (
              <Text key={channel + '_new_percent'}>
                {(data as any)[`${channel.toLowerCase()}_new_percent`].toLocaleString('en-GB', {
                  style: 'percent',
                })}
              </Text>
            ))}
            <Heading {...headingProps}>Existing %</Heading>
            {channels.map((channel) => (
              <Text key={channel + '_new_percent'}>
                {(1 - ((data as any)[`${channel.toLowerCase()}_new_percent`] || 1)).toLocaleString(
                  'en-GB',
                  {
                    style: 'percent',
                  }
                )}
              </Text>
            ))}
            <Heading {...headingProps}>Ongoing %</Heading>
            {channels.map((channel) => (
              <Text key={channel + '_new_percent'}>
                {(data as any)[`${channel.toLowerCase()}_ongoing_percent`].toLocaleString('en-GB', {
                  style: 'percent',
                })}
              </Text>
            ))}
            <Heading {...headingProps}>Once Off %</Heading>
            {channels.map((channel) => (
              <Text key={channel + '_new_percent'}>
                {(
                  1 - ((data as any)[`${channel.toLowerCase()}_ongoing_percent`] || 1)
                ).toLocaleString('en-GB', {
                  style: 'percent',
                })}
              </Text>
            ))}
            <Heading {...headingProps}>Pipeline Turnover</Heading>
            {channels.map((channel) => (
              <Text key={channel + '_total_12mv'}>
                {(data as any)[`${channel.toLowerCase()}_total_12mv`]
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
                {((data as any)[`${channel.toLowerCase()}_total_12mv`] / 12)
                  .toLocaleString('en-GB', {
                    style: 'currency',
                    currency: 'EUR',
                  })
                  .replace(/.00$/, '')}
              </Text>
            ))}
            <Heading {...headingProps}>Once Off Value</Heading>
            {channels.map((channel) => (
              <Text key={channel + '_once_off_value'}>
                {(data as any)[`${channel.toLowerCase()}_once_off_value`]
                  .toLocaleString('en-GB', {
                    style: 'currency',
                    currency: 'EUR',
                  })
                  .replace(/.00$/, '')}
              </Text>
            ))}
            <Heading {...headingProps}>Once Off Value %</Heading>
            {channels.map((channel) => (
              <Text key={channel + '_once_off_value_percent'}>
                {(
                  (data as any)[`${channel.toLowerCase()}_once_off_value`] /
                  ((data as any)[`${channel.toLowerCase()}_total_12mv`] || 1)
                ).toLocaleString('en-GB', {
                  style: 'percent',
                })}
              </Text>
            ))}
            <Heading {...headingProps}>Close Rate</Heading>
            {channels.map((channel) => (
              <Text key={channel + '_close_rate'}>
                {(data as any)[`${channel.toLowerCase()}_close_rate`].toLocaleString('en-GB', {
                  style: 'percent',
                })}
              </Text>
            ))}
            <Heading {...headingProps}>Velocity</Heading>
            {channels.map((channel) => (
              <Text key={channel + '_velocity'}>
                {(data as any)[`${channel.toLowerCase()}_velocity`] != null
                  ? (data as any)[`${channel.toLowerCase()}_velocity`]
                  : '-'}
                {(data as any)[`${channel.toLowerCase()}_velocity`] !== null && ' days'}
              </Text>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
