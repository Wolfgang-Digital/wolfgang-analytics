import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Button, Text } from '@chakra-ui/core';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import { updateEntry, getCurrentEntry } from '../slice';
import { isCloseable, getOutcome } from '../utils';

const lossReasonOptions = [
  { label: 'Price', value: 'Price' },
  { label: 'Forecast Results', value: 'Forecast Results' },
  { label: 'Questions around Strategy', value: 'Questions around Strategy' },
  { label: 'Timing of our response', value: 'Timing of our response' },
  { label: 'Issues with Contract', value: 'Issues with Contract' },
  { label: 'Other', value: 'Other' },
];

const CloseEntryDialogue: React.FC = () => {
  const dispatch = useDispatch();
  const entry = useSelector(getCurrentEntry);
  const [lossReason, setLossReason] = useState<typeof lossReasonOptions[number]>();

  const handleCloseEntry = () => {
    if (entry) {
      const values: Record<string, any> = {
        status: 'Closed',
        loss_reason: lossReason?.value,
        date_closed: new Date(),
      };
      dispatch(updateEntry({ id: entry.id, values }));
    }
  };

  const handleOpenEntry = () => {
    if (entry) {
      const values = {
        status: 'Open',
        loss_reason: null,
        date_closed: null,
      };
      dispatch(updateEntry({ id: entry.id, values }));
    }
  };

  const closeable = isCloseable(entry);
  const outcome = getOutcome(entry?.channel_data);

  return (
    <Box>
      {entry?.status === 'Closed' && (
        <Button
          mt={2}
          variantColor="red"
          size="sm"
          fontWeight={400}
          isFullWidth
          onClick={handleOpenEntry}
        >
          Re-Open Entry
        </Button>
      )}
      {entry?.status === 'Open' && !closeable && (
        <Text color="orange.500" fontSize="sm" pt={1}>
          Please ensure all monetary values and outcomes are filled in before closing
        </Text>
      )}
      {entry?.status === 'Open' && closeable && outcome === 'Lost' && (
        <FormControl mt={2}>
          <FormLabel color="gray.500" fontSize="sm">
            Loss Reason
          </FormLabel>
          <Select
            value={lossReason}
            onChange={(value: any) => setLossReason(value)}
            options={lossReasonOptions}
          />
        </FormControl>
      )}
      {entry?.status === 'Open' && closeable && (
        <Button
          mt={2}
          variantColor="red"
          size="sm"
          fontWeight={400}
          isFullWidth
          onClick={handleCloseEntry}
          isDisabled={false}
        >
          Close Entry
        </Button>
      )}
    </Box>
  );
};

export default CloseEntryDialogue;
