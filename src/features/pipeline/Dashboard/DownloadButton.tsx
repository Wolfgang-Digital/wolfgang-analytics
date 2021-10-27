import React, { useState } from 'react';
import { IconButton, Tooltip, useToast } from '@chakra-ui/core';
import { parse } from 'json2csv';
import { format } from 'date-fns';

import { awsGet } from 'utils/api';
import { OverviewDownload } from '../types';

const formatForCsv: Record<string, Function> = {
  overview: (data: OverviewDownload[]) =>
    data.map((row) => ({
      Date: format(new Date(row.date), 'MMMM yyyy'),
      Total: row.total,
      'Open Enquiries': row.open_enquiries,
      Wins: row.wins,
      'Pipeline Turnover': row.pipeline_turnover.toLocaleString('en-GB'),
      'Pitched Revenue': row.estimated_won_revenue.toLocaleString('en-GB'),
      'Won Revenue': row.actual_won_revenue.toLocaleString('en-GB'),
      'Avg. Velocity': row.avg_velocity,
      'Close Rate': row.close_rate.toLocaleString('en-GB', {
        style: 'percent',
        maximumFractionDigits: 2,
      }),
      'Revenue Close Rate': row.revenue_close_rate.toLocaleString('en-GB', {
        style: 'percent',
        maximumFractionDigits: 2,
      }),
    })),
  breakdown: (data: any[]) =>
    data.map((row) => ({
      Date: format(new Date(row.date), 'MMMM yyyy'),
      Duration: row.duration,
      Total: row.total,
      'Open Enquiries': row.open_enquiries,
      Wins: row.wins,
      'Pipeline Turnover': row.pipeline_turnover.toLocaleString('en-GB'),
      'Pitched Revenue': row.estimated_won_revenue.toLocaleString('en-GB'),
      'Won Revenue': row.actual_won_revenue.toLocaleString('en-GB'),
      'Avg. Velocity': row.avg_velocity,
      'Close Rate': row.close_rate.toLocaleString('en-GB', {
        style: 'percent',
        maximumFractionDigits: 2,
      }),
      'Revenue Close Rate': row.revenue_close_rate.toLocaleString('en-GB', {
        style: 'percent',
        maximumFractionDigits: 2,
      }),
    })),
};

export const DownloadButton: React.FC<{ type: string; query?: string }> = ({
  type,
  query = '',
}) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const res = await awsGet<OverviewDownload[]>(`/pipeline/dashboard/${type}/download${query}`);
    setIsLoading(false);

    if (res.success) {
      try {
        const link = document.createElement('a');
        const data = formatForCsv[type]?.(res.data) || res.data;
        const csv = parse(data);
        link.href = 'data:text/csv,' + encodeURIComponent(csv);
        link.download = 'dashboard.csv';
        link.click();
      } catch (e) {
        console.log(e);
        toast({
          variant: 'left-accent',
          status: 'error',
          description: 'Unable to format results',
          position: 'bottom-left',
          isClosable: true,
        });
      }
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
    <Tooltip
      label="Download results by month as CSV"
      placement="top-start"
      aria-label="Download"
      hasArrow
    >
      <IconButton
        icon="download"
        size="sm"
        aria-label="Download"
        mb={2}
        ml="auto"
        onClick={handleClick}
        isLoading={isLoading}
      />
    </Tooltip>
  );
};
