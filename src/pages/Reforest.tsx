import React, { useState } from 'react';
import { Heading, Grid, useToast, FormControl, FormLabel } from '@chakra-ui/core';
import Select from 'react-select';

import { awsPost } from 'utils/api';
import BusyIndicator from 'components/BusyIndicator';
import { CertForm } from 'features/reforest/CertForm';
import { PreviewWindow } from 'features/reforest/PreviewWindow';

const templateOptions = [
  { label: 'Default', value: 'Default' },
  { label: 'In Memory Of', value: 'In Memory Of' },
];

const templates = {
  default: {
    heading: 'Congratulations',
    recipient: 'RECIPIENT NAME',
    content: [
      { value: 'You are now a Wolfgang Reforester.' },
      {
        value: `1 tree will be planted on your behalf at 52°54'15.2"N 6°24'35.0"W, in Co Wicklow.`,
      },
      { value: 'This native Irish Tree was gifted to you by <GIFTER NAME>.' },
    ],
    marginTop: 32
  },
  memorial: {
    heading: 'In Memory Of',
    recipient: 'RECIPIENT NAME',
    content: [
      {
        value: `1 tree will be planted on their behalf at 52°54'15.2"N 6°24'35.0"W, in Co Wicklow.`,
      },
      { value: 'This native Irish Tree was gifted by <GIFTER NAME>.' },
    ],
    marginTop: 42
  },
};

const Reforest: React.FC = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(
    'https://wg-forestry.s3.eu-west-1.amazonaws.com/previews/default.pdf'
  );

  const [template, setTemplate] = useState(templateOptions[0]);

  const generatePreview = async (data: Record<string, any>) => {
    setIsLoading(true);
    const res = await awsPost<{ uri: string }>('/forestry/create-preview', data);
    setIsLoading(false);

    if (res.success) {
      setPreview(res.data.uri);
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
    <>
      <BusyIndicator color="#4FD1C5" isBusy={isLoading} />
      <Heading size="lg" as="h1" marginBottom="1rem">
        Wolfgang Reforest
      </Heading>
      <Grid templateColumns="1fr 1fr" columnGap={8}>
        <FormControl>
          <FormLabel>Template Preset</FormLabel>
          <Select
            value={template}
            options={templateOptions}
            onChange={(selected) => setTemplate(selected as any)}
          />
          <CertForm
            formKey={template.value === 'Default' ? 'default' : 'memorial'}
            template={template.value === 'Default' ? templates.default : templates.memorial}
            handleSubmit={generatePreview}
          />
        </FormControl>
        <PreviewWindow src={preview} isLoading={isLoading} />
      </Grid>
    </>
  );
};

export default Reforest;
