import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/core';
import { format, setDate, subMonths } from 'date-fns';

import { useAwsGet } from 'hooks/aws';
import { getPreviousDateRange, extractDateFromString } from 'utils/format';
import { PipelineFilter, PipelineOverview, ChannelReport } from '../types';

export interface DateRange {
  range1: {
    startDate: Date;
    endDate: Date;
  };
}

export const useFilters = () => {
  const [filters, setFilters] = useState<PipelineFilter[]>([
    {
      column: 'Date Added',
      operator: 'between',
      value: `${format(setDate(new Date(), 1), 'dd MMMM yy')} and ${format(
        new Date(),
        'dd MMMM yy'
      )}`,
    },
  ]);

  const [mode, _setMode] = useState('month');

  const [range, setRange] = useState<DateRange | undefined>({
    range1: {
      startDate: subMonths(setDate(new Date(), 1), 1),
      endDate: subMonths(new Date(), 1),
    },
  });

  useEffect(() => {
    const dateAdded = filters.find((x) => x.column === 'Date Added');
    const dateClosed = filters.find((x) => x.column === 'Date Closed');
    const date = dateAdded?.value ?? dateClosed?.value;

    if (dateAdded && dateClosed) {
      setRange(undefined);
    } else if (mode !== 'off' && date) {
      const [start, end] = extractDateFromString(date as string);
      const newRange = getPreviousDateRange(start, end, mode);
      setRange(newRange);
    } else if (!date) {
      setRange(undefined);
    }
  }, [mode, filters]);

  const setMode = (newMode: string) => {
    if (newMode !== mode) {
      _setMode(newMode);

      const dateAdded = filters.find((x) => x.column === 'Date Added');
      const dateClosed = filters.find((x) => x.column === 'Date Closed');
      const date = dateAdded?.value ?? dateClosed?.value;

      // If dynamic comparison is turned on, try get a date from the current filters
      if (newMode !== 'off' && date) {
        const [start, end] = extractDateFromString(date as string);
        const newRange = getPreviousDateRange(start, end, newMode);
        setRange(newRange);
      }
    }
  };

  return {
    filters,
    setFilters,
    mode,
    setMode,
    range,
    setRange,
  };
};

export const useQueryString = ({
  filters,
  comparison,
}: {
  filters: PipelineFilter[];
  comparison?: DateRange;
}) => {
  const dateAdded = filters.find((x) => x.column === 'Date Added');
  const dateClosed = filters.find((x) => x.column === 'Date Closed');
  const status = filters.find((x) => x.column === 'Status');
  const country = filters.find((x) => x.column === 'Country');

  let query = '';

  if (dateAdded) {
    const [start, end] = extractDateFromString(dateAdded.value as string);
    query += `?date_added=${format(start, 'yyyy-MM-dd')}AND${format(end, 'yyyy-MM-dd')}`;
  }

  if (dateClosed) {
    const [start, end] = extractDateFromString(dateClosed.value as string);
    query += `${query.length === 0 ? '?' : '&'}date_closed=${format(
      start,
      'yyyy-MM-dd'
    )}AND${format(end, 'yyyy-MM-dd')}`;
  }

  if (status) {
    query += `${query.length === 0 ? '?' : '&'}status=${status.value}`;
  }

  if (country) {
    query += `${query.length === 0 ? '?' : '&'}status=${country.value}`;
  }

  if (comparison) {
    query += `${query.length === 0 ? '?' : '&'}compare_to=${format(
      comparison.range1.startDate,
      'yyyy-MM-dd'
    )}AND${format(comparison.range1.endDate, 'yyyy-MM-dd')}`;
  }

  return query;
};

interface OverviewResponse {
  overview: PipelineOverview;
  breakdown: PipelineOverview[];
  overviewComparison: PipelineOverview;
  breakdownComparison: PipelineOverview[];
}

export const useOverview = (query: string) => {
  const toast = useToast();

  const { data, isLoading, error } = useAwsGet<OverviewResponse>(
    `/pipeline/dashboard/overview${query}`
  );

  useEffect(() => {
    if (error && error !== 'Cancel') {
      toast({
        variant: 'left-accent',
        status: 'error',
        description: error,
        position: 'bottom-left',
        isClosable: true,
      });
    }
  }, [toast, error]);

  return {
    isLoading,
    overall: data && !Array.isArray(data) ? data.overview : undefined,
    overallComparison: data && !Array.isArray(data) ? data.overviewComparison : undefined,
    durationBreakdown:
      data && !Array.isArray(data)
        ? data.breakdown
            .filter((report) => !!report.duration)
            .sort((a, b) => {
              const a1 = a.client_type === 'New' ? -1 : 1;
              const a2 = a.duration === 'Recurring' ? -1 : 1;
              const b1 = b.client_type === 'New' ? -1 : 1;
              const b2 = b.duration === 'Recurring' ? -1 : 1;
              return a1 + a2 - (b1 + b2);
            })
            .map((report) => ({
              ...report,
              comparison: data.breakdownComparison.find((x) => x.duration === report.duration),
            }))
        : undefined,
    clientTypeBreakdown:
      data && !Array.isArray(data)
        ? data.breakdown
            .filter((report) => !!report.client_type)
            .sort((a, b) => {
              const a1 = a.client_type === 'New' ? -1 : 1;
              const a2 = a.duration === 'Recurring' ? -1 : 1;
              const b1 = b.client_type === 'New' ? -1 : 1;
              const b2 = b.duration === 'Recurring' ? -1 : 1;
              return a1 + a2 - (b1 + b2);
            })
            .map((report) => ({
              ...report,
              comparison: data.breakdownComparison.find((x) => x.duration === report.duration),
            }))
        : undefined,
  };
};

interface ChannelResponse {
  result: ChannelReport[];
  comparison: ChannelReport[];
}

export const useChannelBreakdown = (query: string) => {
  const toast = useToast();

  const { data, isLoading, error } = useAwsGet<ChannelResponse>(
    `/pipeline/dashboard/channels${query}`
  );

  useEffect(() => {
    if (error && error !== 'Cancel') {
      toast({
        variant: 'left-accent',
        status: 'error',
        description: error,
        position: 'bottom-left',
        isClosable: true,
      });
    }
  }, [toast, error]);

  return {
    isLoading,
    data:
      data && Array.isArray(data.result)
        ? data.result.map((row) => {
            const comparison = data.comparison?.find((x) => x.channel === row.channel);
            return { data: row, comparison };
          })
        : undefined,
  };
};
