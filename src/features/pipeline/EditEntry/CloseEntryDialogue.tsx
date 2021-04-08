import React, { useState } from 'react';
import { Box, FormControl, Divider, FormLabel, Button, Input } from '@chakra-ui/core';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { updateEntry } from '../slice';

const options = [
  { label: 'Won', value: 'Won' },
  { label: 'Lost', value: 'Lost' },
];

interface Props {
  id?: number | string;
}

const CloseEntryDialogue: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const [outcome, setOutcome] = useState<typeof options[number]>();
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (id && outcome?.value) {
      const values = {
        status: 'Closed',
        outcome: outcome.value,
        [outcome.value === 'Won' ? 'win_reason' : 'loss_reason']: reason,
        date_closed: new Date(),
      };
      dispatch(updateEntry({ id, values }));
    }
  };

  return (
    <Box>
      <Divider />
      <FormControl isRequired>
        <FormLabel color="gray.500" fontSize="sm">
          Outcome
        </FormLabel>
        <Select value={outcome} onChange={(value: any) => setOutcome(value)} options={options} />
      </FormControl>
      {!!outcome && (
        <FormControl mt={2}>
          <FormLabel color="gray.500" fontSize="sm">
            {outcome.value === 'Lost' ? 'Loss' : 'Win'} Reason
          </FormLabel>
          <Input value={reason} isFullWidth onChange={(e: any) => setReason(e.target.value)} />
        </FormControl>
      )}
      <Button
        mt={2}
        variantColor="red"
        size="sm"
        fontWeight={400}
        isFullWidth
        onClick={handleSubmit}
      >
        Close Entry
      </Button>
    </Box>
  );
};

export default CloseEntryDialogue;
