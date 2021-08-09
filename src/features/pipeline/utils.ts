import { format } from 'date-fns';

import { PipelineFilter, EnquirySnippet, ProposalSnippet, MoneySnippet, ChannelData, PipelineEntry } from './types';

export const columnMap = new Map();
columnMap.set('Date', 'date_added');
columnMap.set('Client Type', 'is_new');
columnMap.set('Date Contacted', 'date_contacted');
columnMap.set('Updated', 'last_updated');
columnMap.set('Status', 'status');
columnMap.set('Channels', 'channels');
columnMap.set('Duration', 'duration');
columnMap.set('Source', 'source');
columnMap.set('Outcome', 'outcome');
columnMap.set('Date Closed', 'date_closed');
columnMap.set('Proposal Leads', 'leads');

export const channels = [
  'Analytics',
  'PPC',
  'SEO',
  'Social',
  'Content',
  'Email',
  'Creative',
  'CRO'
].sort();

export const sources = [
  'Radio',
  'Print',
  'Podcast',
  'Facebook',
  'Twitter',
  'LinkedIn',
  'YouTube',
  'Internet',
  'Referral/Word of Mouth',
  'Event',
  'EI Grant',
  'Other'
];

export const getFilterQuery = (filter: PipelineFilter) => {
  if (filter.column.toLowerCase().includes('date') && columnMap.has(filter.column)) {
    const dates = filter.value.toString().split(' and ');
    return `${columnMap.get(filter.column)}=${format(new Date(dates[0]), 'yyyy-MM-dd')}AND${format(new Date(dates[1]), 'yyyy-MM-dd')}`;
  } else {
    switch (filter.column) {
      case 'Client Type':
        return `is_new=${filter.value === 'New' ? 'true' : 'false'}`;

      default:
        if (columnMap.has(filter.column)) {
          return `${columnMap.get(filter.column)}=${filter.value}`;
        }
        console.warn(`Filter not implemented: ${filter.column}`);
        return '';
    }
  }
};

type FormState = {
  enquiry: EnquirySnippet
  proposal: ProposalSnippet
  money: MoneySnippet
}

export const initialFormState: FormState = {
  enquiry: {
    date_added: new Date(),
    company_name: '',
    is_new: true,
    country: '',
    is_ongoing: false,
    scope: 'National',
    channels: [],
    source: undefined,
    source_comment: '',
    leads: '',
    status: 'Open'
  },
  proposal: {
    details: '',
    date_contacted: undefined,
    success_probability: undefined,
    covid_impact: '',
    outcome: '',
    loss_reason: '',
    win_reason: '',
    date_closed: undefined
  },
  money: {
    ppc_12mv: '',
    seo_12mv: '',
    content_12mv: '',
    email_12mv: '',
    social_12mv: '',
    creative_12mv: '',
    cro_12mv: '',
    analytics_12mv: '',
    total_12mv: ''
  }
};

export const getOutcome = (data?: ChannelData) => {
  if (!data) return 'Pending';
  let losses = 0;
  let wins = 0;
  const numKeys = Object.keys(data).length;
  for (const channel of Object.values(data)) {
    if (channel.outcome === 'Won') {
      wins++;
    } else if (channel.outcome === 'Lost') {
      losses++;
    }
  }
  if (wins > 0) {
    return wins === numKeys ? 'Won' : `Won ${wins}/${numKeys}`;
  }
  return losses === numKeys ? 'Lost' : 'Pending';
};

export const isCloseable = (entry?: PipelineEntry) => {
  if (!entry || !entry.channel_data) return false;
  for (const channel of Object.values(entry.channel_data)) {
    const moneyKey = `${channel.name.toLocaleLowerCase()}_12mv`;
    if (!channel.outcome || channel.outcome === 'Pending' || !(entry as Record<string, any>)[moneyKey]) {
      return false;
    }
  }
  return true;
};

export const getDuration = (data?: ChannelData) => {
  if (!data) return 'Once Off';
  for (const channel of Object.values(data)) {
    if (channel.duration === 'Ongoing') {
      return 'Ongoing';
    }
  }
  return 'Once Off';
};