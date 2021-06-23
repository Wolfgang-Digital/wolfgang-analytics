import { useEffect, useState, useMemo } from 'react';
import { useToast } from '@chakra-ui/core';
import { format, setDate } from 'date-fns';

import { useAwsGet } from 'hooks/aws';
import { PipelineFilter } from '../types';

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
  total_new_12mv: number;
  ppc_new_12mv: number;
  seo_new_12mv: number;
  social_new_12mv: number;
  content_new_12mv: number;
  cro_new_12mv: number;
  email_new_12mv: number;
  creative_new_12mv: number;
  analytics_new_12mv: number;
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
  total_ongoing_12mv: number;
  ppc_ongoing_12mv: number;
  seo_ongoing_12mv: number;
  social_ongoing_12mv: number;
  content_ongoing_12mv: number;
  cro_ongoing_12mv: number;
  email_ongoing_12mv: number;
  creative_ongoing_12mv: number;
  analytics_ongoing_12mv: number;
}

export const useDashboard = () => {
  const toast = useToast();

  const [filters, setFilters] = useState<PipelineFilter[]>([
    {
      column: 'Date',
      operator: 'between',
      value: `${format(setDate(new Date(), 1), 'dd MMMM yy')} and ${format(
        new Date(),
        'dd MMMM yy'
      )}`,
    },
  ]);

  const query = useMemo(() => {
    const date = filters.find((x) => x.column === 'Date');
    const status = filters.find((x) => x.column === 'Status');
    //const time = filters.find((x) => x.column === 'Time in Pipe');

    let query = '';

    if (date) {
      const dates = (date.value as string).split(' and ');
      query += `?start=${format(new Date(dates[0]), 'yyyy-MM-dd')}&end=${format(new Date(dates[1]), 'yyyy-MM-dd')}`;
    }
    if (status) {
      const char = query.length === 0 ? '?' : '&';
      query += `${char}status=${status.value}`;
    }
    /*
    if (time) {

      const char = query.length === 0 ? '?' : '&';
      const times = time.value.toString().split(' and ');
      const max = times.length > 1 ? `&timeMax=${times[1]}` : '';
      query += `${char}timeOperator=${time.operator}&timeMin=${times[0]}${max}`;
    }
    */

    return query;
  }, [filters]);

  const res = useAwsGet<PipelineReport>(`/pipeline/report${query}`);

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

  return {
    res,
    filters,
    setFilters,
  };
};
