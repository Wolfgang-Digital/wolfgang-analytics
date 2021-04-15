import React, { useState } from 'react';
import { Box, FormControl, Divider, FormLabel, Button } from '@chakra-ui/core';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { updateEntry } from '../slice';

const outcomeOptions = [
  { label: 'Won', value: 'Won' },
  { label: 'Lost', value: 'Lost' },
];

const lossReasonOptions = [
  { label: 'Price', value: 'Price' },
  { label: 'Forecast Results', value: 'Forecast Results' },
  { label: 'Questions around Strategy', value: 'Questions around Strategy' },
  { label: 'Timing of our response', value: 'Timing of our response' },
  { label: 'Issues with Contract', value: 'Issues with Contract' },
  { label: 'Other', value: 'Other' },
];

interface Props {
  id?: number | string;
  isClosed?: boolean;
}

const CloseEntryDialogue: React.FC<Props> = ({ id, isClosed }) => {
  const dispatch = useDispatch();
  const [outcome, setOutcome] = useState<typeof outcomeOptions[number]>();
  const [lossReason, setLossReason] = useState<typeof lossReasonOptions[number]>();

  const handleCloseEntry = () => {
    if (id && outcome?.value) {
      const values: Record<string, any> = {
        status: 'Closed',
        outcome: outcome.value,
        date_closed: new Date(),
      };
      if (outcome.value === 'Lost') values.loss_reason = lossReason;
      dispatch(updateEntry({ id, values }));
    }
  };

  const handleOpenEntry = () => {
    if (id) {
      const values = {
        status: 'Open',
        outcome: null,
        loss_reason: null,
        date_closed: null,
      };
      dispatch(updateEntry({ id, values }));
    }
  };

  return (
    <Box>
      <Divider />
      {isClosed ? (
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
      ) : (
        <>
          <FormControl isRequired>
            <FormLabel color="gray.500" fontSize="sm">
              Outcome
            </FormLabel>
            <Select
              value={outcome}
              onChange={(value: any) => setOutcome(value)}
              options={outcomeOptions}
            />
          </FormControl>
          {outcome?.value === 'Lost' && (
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
          <Button
            mt={2}
            variantColor="red"
            size="sm"
            fontWeight={400}
            isFullWidth
            onClick={handleCloseEntry}
            isDisabled={!outcome || (outcome?.value === 'Lost' && !lossReason)}
          >
            Close Entry
          </Button>
        </>
      )}
    </Box>
  );
};

export default CloseEntryDialogue;
