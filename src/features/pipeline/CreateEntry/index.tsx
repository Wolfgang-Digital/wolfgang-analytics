import React, { useState } from 'react';
import { Heading, Box, Grid, useToast, Tabs, TabPanel, TabPanels } from '@chakra-ui/core';
import { format, isDate } from 'date-fns';
import { useDispatch } from 'react-redux';

import { awsPost } from 'utils/api';
import { useForm } from 'hooks/useForm';
import { useLinkHandler } from 'hooks/useLinkHandler';
import { initialFormState } from '../utils';
import { PipelineEntry } from '../types';
import { setIsLoading } from '../slice';
import EnquiryForm from '../Forms/EnquiryForm';
import ProposalForm from '../Forms/ProposalForm';
import MoneyForm from '../Forms/MoneyForm';
import Controls from './Controls';
import { useFormValidation } from './hooks';

const CreateEntry: React.FC = () => {
  const toast = useToast();
  const navigate = useLinkHandler();
  const dispatch = useDispatch();

  const [step, setStep] = useState(0);

  const enquiry = useForm(initialFormState.enquiry);
  const proposal = useForm(initialFormState.proposal);
  const money = useForm(initialFormState.money);

  const isValid = useFormValidation(
    step === 0 ? enquiry.form : step === 1 ? proposal.form : money.form,
    step,
    enquiry.form.channels as any
  );

  const handleSubmit = async () => {
    const input: Partial<PipelineEntry> = {
      ...Object.entries(enquiry.form).reduce(
        (result: Record<string, any>, [key, value]: [string, any]) => {
          if (key.toLowerCase().includes('date') && isDate(value)) {
            result[key] = format(value, 'yyyy-MM-dd');
          } else if (typeof value === 'string' && value.length === 0) {
            result[key] = undefined;
          } else result[key] = value;
          return result;
        },
        {}
      ),
      ...Object.entries(proposal.form).reduce(
        (result: Record<string, any>, [key, value]: [string, any]) => {
          if (key.toLowerCase().includes('date') && isDate(value)) {
            result[key] = format(value, 'yyyy-MM-dd');
          } else if (key !== 'details' && typeof value === 'string' && value.length === 0) {
            result[key] = undefined;
          } else result[key] = value;
          return result;
        },
        {}
      ),
      ...Object.entries(money.form).reduce((result: Record<string, any>, [key, value]) => {
        result[key] = isNaN(parseFloat(value)) ? undefined : parseFloat(value);
        return result;
      }, {}),
      // @ts-ignore
      channels:
        enquiry.form.channels.length > 0
          ? `{${enquiry.form.channels.map((channel: any) => `"${channel.value}"`).join(',')}}`
          : undefined,
      // @ts-ignore
      source: enquiry.form.source?.value,
      channel_data: money.form.channel_data
    };

    dispatch(setIsLoading(true));
    const res = await awsPost<PipelineEntry>('/pipeline', input);
    dispatch(setIsLoading(false));

    if (res.success) {
      toast({
        variant: 'left-accent',
        status: 'success',
        description: 'Added successfully',
        position: 'bottom-left',
        isClosable: true,
      });
      setTimeout(() => {
        navigate('/pipeline');
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
      <Heading mb={6} size="lg">
        Create Pipeline Entry
      </Heading>
      <Grid
        templateColumns="minmax(350px, 1024px) minmax(200px, 350px)"
        columnGap={8}
        justifyContent="space-between"
      >
        <Tabs index={step}>
          <TabPanels>
            <TabPanel>
              <EnquiryForm state={enquiry.form} updateForm={enquiry.updateForm} />
            </TabPanel>
            <TabPanel>
              <ProposalForm state={proposal.form} updateForm={proposal.updateForm} />
            </TabPanel>
            <TabPanel>
              <MoneyForm
                state={money.form}
                updateForm={money.updateForm}
                channels={enquiry.form.channels}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Controls step={step} setStep={setStep} handleSubmit={handleSubmit} isValid={isValid} />
      </Grid>
    </Box>
  );
};

export default CreateEntry;
