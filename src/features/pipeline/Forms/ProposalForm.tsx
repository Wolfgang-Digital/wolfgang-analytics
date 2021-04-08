import React, { useState } from 'react';
import {
  Box,
  FormControl,
  Input,
  FormLabel,
  Heading,
  Divider,
  Textarea,
  BoxProps,
} from '@chakra-ui/core';
import { debounce } from 'lodash';

import { CalendarPicker } from 'components/DatePicker';
import { PercentSlider } from 'components/Sliders';
import { initialFormState } from '../utils';

interface Props {
  state: typeof initialFormState['proposal'];
  updateForm: (args: { key: keyof typeof initialFormState['proposal']; value: any }) => void;
  boxProps?: BoxProps;
  isEditPage?: boolean;
}

const Form: React.FC<Props> = ({ state, updateForm, boxProps, isEditPage }) => {
  const [percent, setPercent] = useState<number | undefined>(state.success_probability);

  const updateSlider = debounce((value: number) => {
    updateForm({ key: 'success_probability', value });
  }, 100);

  const handleSliderUpdate = (value: number) => {
    setPercent(value);
    updateSlider(value);
  };

  return (
    <Box background="white" borderRadius={4} border="1px solid #E2E8F0" flexGrow={1} {...boxProps}>
      <Heading color="blue.500" size="md" borderBottom="1px solid #E2E8F0" textAlign="center" p={2}>
        The Proposal
      </Heading>
      <Box as="form" p={4}>
        <FormControl pb={1}>
          <FormLabel color="gray.500" fontSize="sm">
            Details & Progess Update
          </FormLabel>
          <Textarea
            name="details"
            value={state.details}
            isFullWidth
            onChange={(e: any) => updateForm({ key: 'details', value: e.target.value })}
          />
        </FormControl>
        <Divider />
        <FormControl pb={1}>
          <FormLabel color="gray.500" fontSize="sm">
            Date Contacted
          </FormLabel>
          <CalendarPicker
            date={state.date_contacted}
            setDate={(value) => updateForm({ key: 'date_contacted', value })}
          />
        </FormControl>
        <Divider />
        <FormControl pb={1}>
          <FormLabel color="gray.500" fontSize="sm">
            Proposal Issue Date
          </FormLabel>
          <CalendarPicker
            date={state.proposal_issue_date}
            setDate={(value) => updateForm({ key: 'proposal_issue_date', value })}
          />
        </FormControl>
        <Divider />
        <FormControl pb={1}>
          <FormLabel color="gray.500" fontSize="sm">
            Meeting Date
          </FormLabel>
          <CalendarPicker
            date={state.meeting_date}
            setDate={(value) => updateForm({ key: 'meeting_date', value })}
          />
        </FormControl>
        <Divider />
        <FormControl pb={1}>
          <FormLabel color="gray.500" fontSize="sm">
            Chance to Win
          </FormLabel>
          <PercentSlider value={percent} setValue={handleSliderUpdate} />
        </FormControl>
        <Divider />
        <FormControl pb={1}>
          <FormLabel color="gray.500" fontSize="sm">
            COVID-19 Impact
          </FormLabel>
          <Input
            name="covid_impact"
            value={state.covid_impact}
            onChange={(e: any) => updateForm({ key: 'covid_impact', value: e.target.value })}
            isFullWidth
          />
        </FormControl>
        {!isEditPage && (
          <>
            <Divider />
            <FormControl pb={1}>
              <FormLabel color="gray.500" fontSize="sm">
                Outcome
              </FormLabel>
              <Input
                name="outcome"
                value={state.outcome}
                onChange={(e: any) => updateForm({ key: 'outcome', value: e.target.value })}
                isFullWidth
              />
            </FormControl>
          </>
        )}
        <Divider />
        <FormControl pb={1}>
          <FormLabel color="gray.500" fontSize="sm">
            Reason If Lost
          </FormLabel>
          <Input
            name="loss_reason"
            value={state.loss_reason}
            onChange={(e: any) => updateForm({ key: 'loss_reason', value: e.target.value })}
            isFullWidth
          />
        </FormControl>
        <Divider />
        <FormControl pb={1}>
          <FormLabel color="gray.500" fontSize="sm">
            Reason If Won
          </FormLabel>
          <Input
            name="win_reason"
            value={state.win_reason}
            onChange={(e: any) => updateForm({ key: 'win_reason', value: e.target.value })}
            isFullWidth
          />
        </FormControl>
        {!isEditPage && (
          <>
            <Divider />
            <FormControl pb={1}>
              <FormLabel color="gray.500" fontSize="sm">
                Date Closed
              </FormLabel>
              <CalendarPicker
                date={state.date_closed}
                setDate={(value) => updateForm({ key: 'date_closed', value })}
              />
            </FormControl>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Form;
