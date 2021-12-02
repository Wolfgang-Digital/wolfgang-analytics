import React, { useState } from 'react';
import { Heading, Grid, useToast } from '@chakra-ui/core';

import { awsPost } from 'utils/api';
import BusyIndicator from 'components/BusyIndicator';
import { CertForm } from 'features/reforest/CertForm';
import { PreviewWindow } from 'features/reforest/PreviewWindow';

const Reforest: React.FC = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState('https://wg-forestry.s3.eu-west-1.amazonaws.com/previews/default.pdf');

  const generatePreview = async (data: Record<string, any>) => {
    setIsLoading(true);
    const res = await awsPost<{ uri: string }>('/forestry/create-preview', data);
    setIsLoading(false);

    if (res.success) {
      setPreview(res.data.uri);
    }
    else {
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
        <CertForm handleSubmit={generatePreview}/>
        <PreviewWindow src={preview} isLoading={isLoading}  />
      </Grid>
    </>
  );
};

export default Reforest;
