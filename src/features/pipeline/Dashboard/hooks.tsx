import { useEffect, useState, useMemo } from 'react';
import { useToast } from '@chakra-ui/core';
import { format, setDate } from 'date-fns';
import { sumBy, meanBy } from 'lodash';

import { useAwsGet } from 'hooks/aws';
import { PipelineFilter, ChannelReport, PipelineOverview } from '../types';

export const useChannelReports = () => {
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

    let query = '';
    if (date) {
      const dates = (date.value as string).split(' and ');
      query += `?start=${format(new Date(dates[0]), 'yyyy-MM-dd')}&end=${format(
        new Date(dates[1]),
        'yyyy-MM-dd'
      )}`;
    }
    if (status) {
      query += `${query.length === 0 ? '?' : '&'}status=${status.value}`;
    }

    return query;
  }, [filters]);

  const res = useAwsGet<ChannelReport[]>(`/pipeline/dashboard/channels${query}`);

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
    channelReports: res,
    filters,
    setFilters,
  };
};

export const useOverview = (filters: PipelineFilter[], reports: ChannelReport[]) => {
  const toast = useToast();

  const query = useMemo(() => {
    const date = filters.find((x) => x.column === 'Date');
    const status = filters.find((x) => x.column === 'Status');

    let query = '';
    if (date) {
      const dates = (date.value as string).split(' and ');
      query += `?start=${format(new Date(dates[0]), 'yyyy-MM-dd')}&end=${format(
        new Date(dates[1]),
        'yyyy-MM-dd'
      )}`;
    }
    if (status) {
      query += `${query.length === 0 ? '?' : '&'}status=${status.value}`;
    }

    return query;
  }, [filters]);

  const res = useAwsGet<PipelineOverview>(`/pipeline/dashboard/overview${query}`);

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
    ...res,
    data: {
      ...res.data,
      total_won_revenue: sumBy(reports, 'total_won_revenue'),
      total_new_revenue: sumBy(reports, 'total_new_revenue'),
      total_recurring_revenue: sumBy(reports, 'total_recurring_revenue'),
      recurring_won_revenue: sumBy(reports, 'recurring_won_revenue'),
      recurring_new_revenue: sumBy(reports, 'recurring_new_revenue'),
      avg_recurring_velocity: meanBy(reports, 'avg_recurring_velocity').toFixed(1),
      avg_win_velocity: meanBy(reports, 'avg_win_velocity').toFixed(1),
      avg_loss_velocity: meanBy(reports, 'avg_loss_velocity').toFixed(1)
    },
  };
};