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
} from '@chakra-ui/core';
import Select from 'react-select';

import { CalendarPicker } from 'components/DatePicker';
import { channels, sources, initialFormState } from '../utils';

const channelOptions = channels.map((channel) => ({ label: channel, value: channel }));

const sourceOptions = sources.map((source) => ({ label: source, value: source }));

interface Props {
  state: typeof initialFormState['enquiry'];
  updateForm: (args: { key: keyof typeof initialFormState['enquiry']; value: any }) => void;
  boxProps?: BoxProps;
  isEditPage?: boolean;
}

const Form: React.FC<Props> = ({ state, updateForm, boxProps, isEditPage }) => {
  return (
    <Box background="white" borderRadius={4} border="1px solid #E2E8F0" flexGrow={1} {...boxProps} mb="auto">
      <Heading color="red.500" size="md" borderBottom="1px solid #E2E8F0" textAlign="center" p={2}>
        The Enquiry
      </Heading>
      <Box as="form" p={4}>
        <FormControl pb={1} isRequired>
          <FormLabel color="gray.500" fontSize="sm">
            Date Added
          </FormLabel>
          <CalendarPicker
            date={state.date_added}
            setDate={(value) => updateForm({ key: 'date_added', value })}
          />
        </FormControl>
        <Divider />
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
            Duration
          </FormLabel>
          <RadioGroup
            isInline
            spacing={6}
            value={state.is_ongoing ? 'Ongoing' : 'Once Off'}
            onChange={(e, value) => updateForm({ key: 'is_ongoing', value: value === 'Ongoing' })}
          >
            <Radio value="Once Off">Once Off</Radio>
            <Radio value="Ongoing">Ongoing</Radio>
          </RadioGroup>
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
        {!isEditPage && (
          <>
            <Divider />
            <FormControl pb={1} isRequired>
              <FormLabel color="gray.500" fontSize="sm">
                Status
              </FormLabel>
              <RadioGroup
                isInline
                spacing={6}
                value={state.status}
                onChange={(e, value) => updateForm({ key: 'status', value })}
              >
                <Radio value="Open" variantColor="teal">
                  Open
                </Radio>
                <Radio value="Closed" variantColor="red">
                  Closed
                </Radio>
              </RadioGroup>
            </FormControl>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Form;
