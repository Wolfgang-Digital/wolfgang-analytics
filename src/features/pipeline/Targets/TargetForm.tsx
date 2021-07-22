import React, { useState } from 'react';
import {
  Box,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Grid,
  InputGroup,
  InputLeftAddon,
  Icon,
  Collapse,
  Text,
  Button,
  useToast,
} from '@chakra-ui/core';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

import { useForm } from 'hooks/useForm';
import { useNearbyMonths } from 'hooks/useMonths';
import BusyIndicator from 'components/BusyIndicator';
import { awsPost } from 'utils/api';
import { TargetReport } from './hooks';
import { useLinkHandler } from 'hooks/useLinkHandler';

const defaultValues = {
  enquiries: '',
  enquiry_value: '',
  revenue: '',
  wins: '',
};

const isValid = (form: Record<string, number | string>) => {
  for (const key in defaultValues) {
    if (!form[key] || form[key] === 0 || form[key] === '0') return false;
  }
  return true;
};

export const TargetForm: React.FC = () => {
  const { channel } = useParams();
  const months = useNearbyMonths();
  const [date, setDate] = useState(months[Math.floor(months.length / 2)]);
  const { form, updateForm } = useForm(defaultValues);

  const navigate = useLinkHandler();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await awsPost<TargetReport>('/pipeline/targets', {
      ...form,
      target_date: format(date.value, 'yyyy-MM-01'),
      channel,
    });
    setIsLoading(false);

    if (res.success) {
      toast({
        variant: 'left-accent',
        status: 'success',
        description: 'Added successfully',
        position: 'bottom-left',
        isClosable: true,
      });
      setTimeout(() => {
        navigate('/pipeline/targets');
      }, 300);
    } else {
      toast({
        variant: 'left-accent',
        status: 'error',
        description: res.error,
        position: 'bottom-left',
        isClosable: true,
      });
    }
  };

  return (
    <Box pb={6}>
      <BusyIndicator color="#4FD1C5" isBusy={isLoading} />
      <Heading mb={6} size="lg">
        New Target
      </Heading>
      <Grid
        templateColumns="minmax(350px, 1024px) minmax(200px, 350px)"
        columnGap={8}
        justifyContent="space-between"
      >
        <Stack background="white" borderRadius={4} border="1px solid #E2E8F0" p={4} spacing={4}>
          <Heading size="md" borderBottom="1px solid #E2E8F0" pb={3}>
            {channel}
          </Heading>
          <FormControl isRequired>
            <FormLabel>Month</FormLabel>
            <Select value={date} options={months} onChange={(e: any) => setDate(e)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Enquiries</FormLabel>
            <InputGroup>
              <InputLeftAddon children={<Icon name="chat" />} />
              <Input
                type="number"
                value={form.enquiries}
                onChange={(e: any) => updateForm({ key: 'enquiries', value: e.target.value })}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Enquiry Value</FormLabel>
            <InputGroup>
              <InputLeftAddon children="€" />
              <Input
                type="number"
                value={form.enquiry_value}
                onChange={(e: any) => updateForm({ key: 'enquiry_value', value: e.target.value })}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Revenue</FormLabel>
            <InputGroup>
              <InputLeftAddon children="€" />
              <Input
                type="number"
                value={form.revenue}
                onChange={(e: any) => updateForm({ key: 'revenue', value: e.target.value })}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Wins</FormLabel>
            <InputGroup>
              <InputLeftAddon children={<Icon name="check" />} />
              <Input
                type="number"
                value={form.wins}
                onChange={(e: any) => updateForm({ key: 'wins', value: e.target.value })}
              />
            </InputGroup>
          </FormControl>
        </Stack>
        <Box background="white" borderRadius={4} border="1px solid #E2E8F0" mb="auto" p={4}>
          <Collapse isOpen={!isValid(form)}>
            <Text color="orange.500" fontSize="sm" pb={1}>
              Please fill in all required fields*
            </Text>
          </Collapse>
          <Button
            size="sm"
            variantColor="teal"
            fontWeight={400}
            isDisabled={!isValid(form)}
            isFullWidth
            onClick={handleSubmit}
          >
            Add Target
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};
