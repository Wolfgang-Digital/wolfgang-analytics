import React, { useState } from 'react';
import { Box, FormControl, Divider, FormLabel, Button, Input } from '@chakra-ui/core';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { updateEntry } from '../slice';

const outcomeOptions = [
  { label: 'Won', value: 'Won' },
  { label: 'Lost', value: 'Lost' },
];

const lossReasonOptions = [
  { label: 'Price', value: 'Price' },
  { label: 'Forecast Results', value: 'Lost' },
  { label: 'Questions around Strategy', value: 'Questions around Strategy' },
  { label: 'Timing of our response', value: 'Timing of our response' },
  { label: 'Issues with Contract', value: 'Issues with Contract' },
];

interface Props {
  id?: number | string;
  isClosed?: boolean;
}

const CloseEntryDialogue: React.FC<Props> = ({ id, isClosed }) => {
  const dispatch = useDispatch();
  const [outcome, setOutcome] = useState<typeof outcomeOptions[number]>();
  const [winReason, setWinReason] = useState('');
  const [lossReason, setLossReason] = useState<typeof lossReasonOptions[number]>();

  const handleCloseEntry = () => {
    if (id && outcome?.value) {
      const values = {
        status: 'Closed',
        outcome: outcome.value,
        [outcome.value === 'Won' ? 'win_reason' : 'loss_reason']:
          outcome.value === 'Won' ? winReason : lossReason?.value,
        date_closed: new Date(),
      };
      dispatch(updateEntry({ id, values }));
    }
  };

  const handleOpenEntry = () => {
    if (id) {
      const values = {
        status: 'Open',
        outcome: null,
        win_reason: null,
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
          {!!outcome && (
            <FormControl mt={2}>
              <FormLabel color="gray.500" fontSize="sm">
                {outcome.value === 'Lost' ? 'Loss' : 'Win'} Reason
              </FormLabel>
              {outcome.value === 'Lost' ? (
                <Select
                  value={lossReason}
                  onChange={(value: any) => setLossReason(value)}
                  options={lossReasonOptions}
                />
              ) : (
                <Input
                  value={winReason}
                  isFullWidth
                  onChange={(e: any) => setWinReason(e.target.value)}
                />
              )}
            </FormControl>
          )}
          <Button
            mt={2}
            variantColor="red"
            size="sm"
            fontWeight={400}
            isFullWidth
            onClick={handleCloseEntry}
          >
            Close Entry
          </Button>
        </>
      )}
    </Box>
  );
};

export default CloseEntryDialogue;
