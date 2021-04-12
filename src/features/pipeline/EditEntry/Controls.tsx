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
import { format } from 'date-fns';

import { toTitleCase } from 'utils/format';
import { getOutcomeColour } from '../Entries/utils';
import { getStatus } from '../slice';
import CloseEntryDialogue from './CloseEntryDialogue';

interface Props {
  tab: 'ENQUIRY' | 'PROPOSAL' | 'MONEY';
  setTab: (tab: Props['tab']) => void;
  name?: string;
  status?: string;
  outcome?: string;
  onUpdate: () => void;
  dateClosed?: string;
  id?: string | number;
}

const Controls: React.FC<Props> = ({
  id,
  tab,
  setTab,
  name,
  outcome,
  status,
  onUpdate,
  dateClosed,
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const { isLoading } = useSelector(getStatus);

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
        <Text color="gray.500" fontSize="sm" fontWeight={500}>
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
        <Text color="gray.500" fontSize="sm" fontWeight={500}>
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
