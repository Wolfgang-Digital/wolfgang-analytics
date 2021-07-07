import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/core';

import { useAwsGet } from 'hooks/aws';

export interface TargetReport {
  department: string
  target_date: string
  enquiries: number
  wins: number
  revenue: number
  enquiry_value: number
  target_enquiries: number
  target_wins: number
  target_value: number
  target_revenue: number
}

export const useTargets = () => {
  const toast = useToast();

  const [channel, setChannel] = useState({ label: 'PPC', value: 'PPC' });
  
  const res = useAwsGet<TargetReport[]>(`/pipeline/targets?channel=${channel.value}`);

  useEffect(() => {
    if (res.error) {
      toast({
        variant: 'left-accent',
        status: 'error',
        description: res.error,
        position: 'bottom-left',
        isClosable: true,
      });
    }
  }, [toast, res]);

  return { ...res, channel, setChannel };
};