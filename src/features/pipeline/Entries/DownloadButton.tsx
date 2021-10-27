import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IconButton, Tooltip, useToast } from '@chakra-ui/core';
import { parse } from 'json2csv';

import { awsGet } from 'utils/api';
import { getOutcome, getDuration } from '../utils';
import { PipelineEntry } from '../types';
import { getQueryString } from '../slice';
import { formatDate } from './utils';

const formatPipelineData = (data: PipelineEntry[]) => {
  return data.map((entry) => ({
    Client: entry.company_name,
    Project: entry.project_name,
    Status: entry.status,
    Outcome: getOutcome(entry.channel_data),
    'Date Added': formatDate(entry.date_added),
    'Date Closed': formatDate(entry.date_closed),
    'Last Updated': formatDate(entry.last_updated),
    'Client Type': entry.is_new ? 'New' : 'Existing',
    Duration: getDuration(entry.channel_data) === 'Ongoing' ? 'Recurring' : 'Once Off',
    Channels: entry.channels.join(', '),
    Wolfgangers: entry.proposal_leads?.map((user) => user.username).join(', '),
    Country: entry.country,
    Source: entry.source,
    'Source Comment': entry.source_comment,
    'Contact Email': entry.contact_email,
    'Proposal Doc': entry.proposal_doc_link,
    Details: entry.details,
    'Success Probability': entry.success_probability ? `${entry.success_probability}%` : '',
    'Reason If Lost': entry.loss_reason,
    'Analytics 12MV': entry.analytics_12mv,
    'Content 12MV': entry.content_12mv,
    'Creative 12MV': entry.creative_12mv,
    'CRO 12MV': entry.cro_12mv,
    'Email 12MV': entry.email_12mv,
    'PPC 12MV': entry.ppc_12mv,
    'SEO 12MV': entry.seo_12mv,
    'Social 12MV': entry.social_12mv,
  }));
};

export const DownloadButton: React.FC = () => {
  const query = useSelector(getQueryString);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const res = await awsGet<PipelineEntry[]>(`/pipeline/download${query}`);
    setIsLoading(false);

    if (res.success) {
      const link = document.createElement('a');
      const data = formatPipelineData(res.data);
      const csv = parse(data);
      link.href = 'data:text/csv,' + encodeURIComponent(csv);
      link.download = 'pipeline.csv';
      link.click();
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
    <Tooltip label="Download results as CSV" placement="top" aria-label="Download" hasArrow>
      <IconButton
        icon="download"
        size="sm"
        aria-label="Download"
        onClick={handleClick}
        isLoading={isLoading}
      />
    </Tooltip>
  );
};
