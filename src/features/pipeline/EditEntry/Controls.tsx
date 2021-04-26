import React from 'react';
import {
  Box,
  ButtonGroup,
  Button,
  Divider,
  Text,
  Badge,
  Flex,
  IconButton,
  Collapse,
  useDisclosure,
} from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import { format, differenceInDays } from 'date-fns';

import { toTitleCase } from 'utils/format';
import { getOutcomeColour } from '../Entries/utils';
import { getStatus } from '../slice';
import CloseEntryDialogue from './CloseEntryDialogue';
import { ChannelData } from '../types';
import { getOutcome } from '../utils';

interface Props {
  tab: 'ENQUIRY' | 'PROPOSAL' | 'MONEY';
  setTab: (tab: Props['tab']) => void;
  name?: string;
  status?: string;
  channelData?: ChannelData
  onUpdate: () => void;
  dateClosed?: string;
  dateAdded?: string;
  id?: string | number;
  lastUpdated?: string;
}

const Controls: React.FC<Props> = ({
  id,
  tab,
  setTab,
  name,
  channelData,
  status,
  onUpdate,
  dateClosed,
  dateAdded,
  lastUpdated,
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const { isLoading } = useSelector(getStatus);

  const lastDay = dateClosed ? new Date(dateClosed) : new Date();
  const timeInPipe = dateAdded ? differenceInDays(lastDay, new Date(dateAdded)) : '--';

  const outcome = getOutcome(channelData);

  return (
    <Box
      background="white"
      borderRadius={4}
      border="1px solid #E2E8F0"
      flexGrow={1}
      mb="auto"
      p={4}
      position="sticky"
      top="16px"
    >
      <Text fontWeight={700} color="gray.700" fontSize="lg">
        {name}
      </Text>
      <Divider />
      <ButtonGroup size="sm" justifyContent="space-between" display="flex">
        <Button
          fontWeight={400}
          variantColor={tab === 'ENQUIRY' ? 'purple' : undefined}
          onClick={() => setTab('ENQUIRY')}
        >
          The Enquiry
        </Button>
        <Button
          fontWeight={400}
          variantColor={tab === 'PROPOSAL' ? 'purple' : undefined}
          onClick={() => setTab('PROPOSAL')}
        >
          The Proposal
        </Button>
        <Button
          fontWeight={400}
          iconSpacing={4}
          variantColor={tab === 'MONEY' ? 'purple' : undefined}
          onClick={() => setTab('MONEY')}
        >
          The Money
        </Button>
      </ButtonGroup>
      <Divider />
      <Box>
        <Text color="gray.500" fontSize="xs" fontWeight={500}>
          Date Added
        </Text>
        {dateAdded && (
          <Text mb={0} fontSize="0.9em">
            {format(new Date(dateAdded), 'dd MMM yyyy')}
          </Text>
        )}
      </Box>
      <Divider />
      <Box>
        <Text color="gray.500" fontSize="xs" fontWeight={500}>
          Last Updated
        </Text>
        {lastUpdated && (
          <Text mb={0} fontSize="0.9em">
            {format(new Date(lastUpdated), 'dd MMM yyyy')}
          </Text>
        )}
      </Box>
      <Divider />
      <Box>
        <Text color="gray.500" fontSize="xs" fontWeight={500}>
          Time in Pipe
        </Text>
        {dateAdded && (
          <Text mb={0} fontSize="0.9em">
            {timeInPipe} days
          </Text>
        )}
      </Box>
      <Divider />
      <Box>
        <Text color="gray.500" fontSize="xs" fontWeight={500}>
          Status
        </Text>
        <Flex align="center" justify="space-between">
          <Badge variantColor={status === 'Open' ? 'teal' : 'red'} mr="auto">
            {status}
          </Badge>
          <IconButton
            size="xs"
            icon="edit"
            aria-label="Edit status"
            transform="translateY(-8px)"
            onClick={onToggle}
            variantColor={isOpen ? 'purple' : undefined}
          />
        </Flex>
        {dateClosed && (
          <Text mt={1} fontSize="sm">
            Closed on:{' '}
            <Text as="span" fontWeight={500}>
              {format(new Date(dateClosed), 'dd MMM yy')}
            </Text>
          </Text>
        )}
      </Box>
      <Collapse isOpen={isOpen}>
        <CloseEntryDialogue id={id} isClosed={status === 'Closed'} />
      </Collapse>
      <Divider />
      <Box>
        <Text color="gray.500" fontSize="xs" fontWeight={500}>
          Outcome
        </Text>
        <Badge variantColor={getOutcomeColour(outcome)} mr="auto">
          {outcome || 'Pending'}
        </Badge>
      </Box>
      <Divider />
      <Button
        variantColor="teal"
        isFullWidth
        size="sm"
        fontWeight={400}
        onClick={onUpdate}
        isDisabled={isLoading}
      >
        Update {toTitleCase(tab)}
      </Button>
    </Box>
  );
};

export default Controls;
