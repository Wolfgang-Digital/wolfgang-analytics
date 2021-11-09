import React from 'react';
import {
  Box,
  FormControl,
  Input,
  FormLabel,
  Heading,
  Divider,
  RadioGroup,
  Radio,
  BoxProps,
  FormHelperText,
  Collapse,
} from '@chakra-ui/core';
import Select from 'react-select';

import { CalendarPicker } from 'components/DatePicker';
import { channels, sources, initialFormState } from '../utils';

const channelOptions = channels.map((channel) => ({ label: channel, value: channel }));

const sourceOptions = sources.map((source) => ({ label: source, value: source }));

const qualityScoreOptions = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
];

interface Props {
  state: typeof initialFormState['enquiry'];
  updateForm: (args: { key: keyof typeof initialFormState['enquiry']; value: any }) => void;
  boxProps?: BoxProps;
  isEditPage?: boolean;
  // Means to retro actively add entries with commputed values (e.g. date added) - may be temporary
  retroactiveMode?: boolean;
}

const Form: React.FC<Props> = ({ state, updateForm, boxProps, retroactiveMode = false }) => {
  return (
    <Box
      background="white"
      borderRadius={4}
      border="1px solid #E2E8F0"
      flexGrow={1}
      {...boxProps}
      mb="auto"
    >
      <Heading size="md" borderBottom="1px solid #E2E8F0" p={3}>
        The Enquiry
      </Heading>
      <Box as="form" p={4}>
        {retroactiveMode && (
          <>
            <FormControl>
              <FormLabel color="gray.500" fontSize="sm">
                Date Added
              </FormLabel>
              <CalendarPicker
                date={state.date_added}
                setDate={(value) => updateForm({ key: 'date_added', value })}
              />
              <FormHelperText>
                Leave as default unless retroactively adding an enquiry
              </FormHelperText>
            </FormControl>
            <Divider />
          </>
        )}
        <FormControl pb={1} isRequired>
          <FormLabel color="gray.500" fontSize="sm">
            Company Name
          </FormLabel>
          <Input
            name="company_name"
            value={state.company_name}
            onChange={(e: any) => updateForm({ key: 'company_name', value: e.target.value })}
            isFullWidth
          />
        </FormControl>
        <Divider />
        <FormControl pb={1}>
          <FormLabel color="gray.500" fontSize="sm">
            Project Name
          </FormLabel>
          <Input
            name="project_name"
            value={state.project_name}
            onChange={(e: any) => updateForm({ key: 'project_name', value: e.target.value })}
            isFullWidth
          />
          <FormHelperText>
            Used to differentiate separate projects from the same client
          </FormHelperText>
        </FormControl>
        <Divider />
        <FormControl pb={1} isRequired>
          <FormLabel color="gray.500" fontSize="sm">
            Type
          </FormLabel>
          <RadioGroup
            isInline
            spacing={6}
            value={state.is_new ? 'New' : 'Existing'}
            onChange={(e, value) => updateForm({ key: 'is_new', value: value === 'New' })}
          >
            <Radio value="New">New</Radio>
            <Radio value="Existing">Existing</Radio>
          </RadioGroup>
        </FormControl>
        <Divider />
        <Collapse isOpen={state.is_new}>
          <FormControl pb={1} isRequired>
            <FormLabel color="gray.500" fontSize="sm">
              Pre-Qual Score
            </FormLabel>
            <Select
              value={
                state.pre_qual_score
                  ? { label: state.pre_qual_score, value: state.pre_qual_score }
                  : undefined
              }
              onChange={(value: any) => updateForm({ key: 'pre_qual_score', value: value.value })}
              options={qualityScoreOptions}
            />
          </FormControl>
          <Divider />
        </Collapse>
        <FormControl pb={1} isRequired>
          <FormLabel color="gray.500" fontSize="sm">
            Country
          </FormLabel>
          <Input
            name="country"
            value={state.country}
            isFullWidth
            onChange={(e: any) => updateForm({ key: 'country', value: e.target.value })}
          />
        </FormControl>
        <Divider />
        <FormControl pb={1} isRequired>
          <FormLabel color="gray.500" fontSize="sm">
            Channels
          </FormLabel>
          <Select
            value={state.channels}
            onChange={(value: any) => updateForm({ key: 'channels', value })}
            options={channelOptions}
            isMulti
          />
        </FormControl>
        <Divider />
        <FormControl pb={1} isRequired>
          <FormLabel color="gray.500" fontSize="sm">
            Source
          </FormLabel>
          <Select
            // @ts-ignore
            value={state.source}
            onChange={(value: any) => updateForm({ key: 'source', value })}
            options={sourceOptions}
          />
        </FormControl>
        <Divider />
        <FormControl pb={1}>
          <FormLabel color="gray.500" fontSize="sm">
            Source Comment
          </FormLabel>
          <Input
            name="source_comment"
            value={state.source_comment}
            isFullWidth
            onChange={(e: any) => updateForm({ key: 'source_comment', value: e.target.value })}
          />
        </FormControl>
      </Box>
    </Box>
  );
};

export default Form;
