import React, { useMemo } from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftAddon,
  FormLabel,
  Button,
  Checkbox,
  Heading,
  Icon,
} from '@chakra-ui/core';
import Select from 'react-select';
import { useDispatch } from 'react-redux';

import { useForm } from 'hooks/useForm';
import { PipelineEntry, createEntry } from './slice';


type Option = {
  label: string;
  value: string;
};

export const channels = [
  { label: 'GA', value: 'GA' },
  { label: 'PPC', value: 'PPC' },
  { label: 'SEO', value: 'SEO' },
  { label: 'Social', value: 'Social' },
  { label: 'Content', value: 'Content' },
  { label: 'Email', value: 'Email' },
  { label: 'Creative', value: 'Creative' },
  { label: 'CRO', value: 'CRO' },
].sort((a, b) => (a.label < b.label ? -1 : a.label > b.label ? 1 : 0));

export const sources = [
  { label: 'Radio', value: 'RadioGA' },
  { label: 'Print', value: 'Print' },
  { label: 'Podcast', value: 'Podcast' },
  { label: 'Facebook', value: 'Facebook' },
  { label: 'Twitter', value: 'Twitter' },
  { label: 'LinkedIn', value: 'LinkedIn' },
  { label: 'YouTube', value: 'YouTube' },
  { label: 'Internet', value: 'Internet' },
  { label: 'Referral/Word of Mouth', value: 'Referral/Word of Mouth' },
  { label: 'Event', value: 'Event' },
  { label: 'Other', value: 'Other' },
];

const initialState: Pick<
  PipelineEntry,
  | 'company_name'
  | 'is_new'
  | 'country'
  | 'led_by'
  | 'lead_contact_date'
  | 'ppc_fmv'
  | 'seo_fmv'
  | 'twelve_month_value'
  | 'source'
  | 'source_comment'
  | 'channels'
> = {
  company_name: '',
  is_new: false,
  led_by: '',
  channels: [],
  country: '',
  source_comment: '',
  ppc_fmv: 0,
  seo_fmv: 0,
  twelve_month_value: 0
};

const inputKeys = Object.keys(initialState);

const CreateEntry: React.FC = () => {
  const dispatch = useDispatch();
  const { form, updateForm } = useForm(initialState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputKeys.includes(e.target.name)) {
      updateForm({ key: e.target.name as keyof typeof initialState, value: e.target.value });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateForm({ key: 'is_new', value: e.target.checked });
  };

  const handleMultiSelectChange = (values: Option[]) => {
    updateForm({ key: 'channels', value: values.map((v) => v.value) });
  };

  const handleSelectChange = (value: Option) => {
    updateForm({ key: 'source', value: value.value });
  };

  const handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    dispatch(createEntry(form));
  };

  const currentChannels = useMemo(() => {
    return form.channels.map((c) => ({ label: c, value: c }));
  }, [form.channels]);

  return (
    <Box as="form" onSubmit={handleSubmit} pb={6}>
      <Heading mb={6} size="lg">
        Create Pipeline Entry
      </Heading>
      <FormControl isRequired mb={4}>
        <FormLabel htmlFor="company_name">Company Name</FormLabel>
        <Input name="company_name" value={form.company_name} onChange={handleInputChange} />
      </FormControl>
      <FormControl isRequired mb={4}>
        <Checkbox
          name="is_new"
          isChecked={form.is_new}
          onChange={handleCheckboxChange}
          size="lg"
        />
        <FormLabel htmlFor="is_new" ml={2}>
          New Client
        </FormLabel>
        <FormHelperText mt={0}>Leave this unchecked for existing clients</FormHelperText>
      </FormControl>
      <FormControl mb={4}>
        <FormLabel htmlFor="country">Country</FormLabel>
        <Input name="country" value={form.country} onChange={handleInputChange} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel htmlFor="led_by">Leads</FormLabel>
        <Input name="led_by" value={form.led_by} onChange={handleInputChange} />
      </FormControl>
      <FormControl mb={4} isRequired>
        <FormLabel htmlFor="channels">Channels</FormLabel>
        <Select
          name="channels"
          value={currentChannels}
          options={channels}
          onChange={handleMultiSelectChange as any}
          isMulti
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel htmlFor="source">Source</FormLabel>
        <Select
          name="source"
          value={form.source ? { label: form.source, value: form.source } : undefined}
          options={sources}
          onChange={handleSelectChange as any}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel htmlFor="source_comment">Source Comment</FormLabel>
        <Input name="source_comment" value={form.source_comment} onChange={handleInputChange} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel htmlFor="seo_fmv">SEO First Month Value</FormLabel>
        <InputGroup>
          <InputLeftAddon children="€" />
          <Input name="seo_fmv" type="number" value={form.seo_fmv} onChange={handleInputChange} />
        </InputGroup>
      </FormControl>
      <FormControl mb={4}>
        <FormLabel htmlFor="seo_fmv">PPC First Month Value</FormLabel>
        <InputGroup>
          <InputLeftAddon children="€" />
          <Input name="ppc_fmv" type="number" value={form.ppc_fmv} onChange={handleInputChange} />
        </InputGroup>
      </FormControl>
      <FormControl mb={4}>
        <FormLabel htmlFor="twelve_month_value">12 Month Value</FormLabel>
        <InputGroup>
          <InputLeftAddon children="€" />
          <Input
            name="twelve_month_value"
            type="number"
            value={form.twelve_month_value}
            onChange={handleInputChange}
          />
        </InputGroup>
      </FormControl>
      <FormControl mb={4}>
        <FormLabel htmlFor="lead_contact_date">Lead Contact Date</FormLabel>
        <InputGroup>
          <InputLeftAddon>
            <Icon name="calendar" />
          </InputLeftAddon>
          <Input
            name="lead_contact_date"
            value={form.lead_contact_date}
            onChange={handleInputChange}
          />
        </InputGroup>
      </FormControl>
      <Button type="submit" variantColor="teal">
        Submit
      </Button>
    </Box>
  );
};

export default CreateEntry;
