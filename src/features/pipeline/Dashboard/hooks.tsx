import { useEffect } from 'react';
import { useToast } from '@chakra-ui/core';
import { format } from 'date-fns';

import { useAwsGet } from 'hooks/aws';

export interface PipelineReport {
  total: number;
  ppc_total: number;
  seo_total: number;
  social_total: number;
  content_total: number;
  cro_total: number;
  email_total: number;
  creative_total: number;
  analytics_total: number;
  total_open: number;
  ppc_open: number;
  seo_open: number;
  social_open: number;
  content_open: number;
  cro_open: number;
  email_open: number;
  creative_open: number;
  analytics_open: number;
  total_won: number;
  ppc_won: number;
  seo_won: number;
  social_won: number;
  content_won: number;
  cro_won: number;
  email_won: number;
  creative_won: number;
  analytics_won: number;
  total_ongoing: number;
  ppc_ongoing: number;
  seo_ongoing: number;
  social_ongoing: number;
  content_ongoing: number;
  cro_ongoing: number;
  email_ongoing: number;
  creative_ongoing: number;
  analytics_ongoing: number;
  total_new: number;
  ppc_new: number;
  seo_new: number;
  social_new: number;
  content_new: number;
  cro_new: number;
  email_new: number;
  creative_new: number;
  analytics_new: number;
  total_12mv: number;
  ppc_total_12mv: number;
  seo_total_12mv: number;
  social_total_12mv: number;
  content_total_12mv: number;
  cro_total_12mv: number;
  email_total_12mv: number;
  creative_total_12mv: number;
  analytics_total_12mv: number;
  total_once_off_value: number;
  ppc_once_off_value: number;
  seo_once_off_value: number;
  social_once_off_value: number;
  content_once_off_value: number;
  cro_once_off_value: number;
  email_once_off_value: number;
  creative_once_off_value: number;
  analytics_once_off_value: number;
  velocity: number;
  ppc_velocity: number;
  seo_velocity: number;
  social_velocity: number;
  content_velocity: number;
  cro_velocity: number;
  email_velocity: number;
  creative_velocity: number;
  analytics_velocity: number;
  close_rate: number;
  ppc_close_rate: number;
  seo_close_rate: number;
  social_close_rate: number;
  content_close_rate: number;
  cro_close_rate: number;
  email_close_rate: number;
  creative_close_rate: number;
  analytics_close_rate: number;
  total_ongoing_percent: number;
  ppc_ongoing_percent: number;
  seo_ongoing_percent: number;
  social_ongoing_percent: number;
  content_ongoing_percent: number;
  cro_ongoing_percent: number;
  email_ongoing_percent: number;
  creative_ongoing_percent: number;
  analytics_ongoing_percent: number;
  total_new_percent: number;
  ppc_new_percent: number;
  seo_new_percent: number;
  social_new_percent: number;
  content_new_percent: number;
  cro_new_percent: number;
  email_new_percent: number;
  creative_new_percent: number;
  analytics_new_percent: number;
}

export const useDashboard = ({ start, end }: { start: Date; end: Date }) => {
  const toast = useToast();

  const res = useAwsGet<PipelineReport>(
    `/pipeline/report?start=${format(start, 'yyyy-MM-dd')}&end=${format(end, 'yyyy-MM-dd')}`
  );

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

  return res;
};
