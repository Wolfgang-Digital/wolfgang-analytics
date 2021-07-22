import React from 'react';
import { Heading, Box, Grid, Flex } from '@chakra-ui/core';
import Select from 'react-select';

import { useTargets } from './hooks';
import { channels } from '../utils';
import BusyIndicator from 'components/BusyIndicator';
import ButtonLink from 'components/ButtonLink';
import { ListItem } from './ListItem';

const channelOptions = channels.map((channel) => ({ label: channel, value: channel }));

const Targets: React.FC = () => {
  const { channel, setChannel, data, isLoading } = useTargets();

  return (
    <Box pb={6}>
      <BusyIndicator color="#4FD1C5" isBusy={isLoading} />
      <Heading mb={6} size="lg">
        Targets
      </Heading>
      <Grid templateColumns="180px 180px 1fr" alignItems="center" mb={6}>
        <Heading as="h3" size="md">
          Select a Channel
        </Heading>
        <Select
          value={channel}
          onChange={(value: any) => setChannel(value)}
          options={channelOptions}
        />
        <Flex justifyContent="flex-end">
          <ButtonLink
            text="New Target"
            buttonProps={{
              fontWeight: 500
            }}
            linkProps={{
              to: `/pipeline/targets/${channel.value}`
            }}
          />
        </Flex>
      </Grid>
      {data && data.length > 0 ? (
        data.map((item, i) => (
          <ListItem
            key={item.target_date}
            report={item}
            previousReport={i < data.length - 1 ? data[i + 1] : undefined}
          />
        ))
      ) : (
        <Heading as="h3" size="sm">
          No Results
        </Heading>
      )}
    </Box>
  );
};

export default Targets;
