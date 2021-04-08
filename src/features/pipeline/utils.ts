import { format } from 'date-fns';

import { PipelineFilter, EnquirySnippet, ProposalSnippet, MoneySnippet } from './types';

export const columnMap = new Map();
columnMap.set('Date', 'date_added');
columnMap.set('Type', 'is_new');
columnMap.set('Date Contacted', 'date_contacted');
columnMap.set('Updated', 'last_updated');
columnMap.set('Status', 'status');
columnMap.set('Channels', 'channels');
columnMap.set('Duration', 'is_ongoing');
columnMap.set('Source', 'source');

export const channels = [
  'GA',
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
      case 'Type':
        return `is_new=${filter.value === 'New' ? 'true' : 'false'}`;

      case 'Duration':
        return `is_ongoing=${filter.value === 'Ongoing' ? 'true' : 'false'}`;

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
    proposal_issue_date: undefined,
    meeting_date: undefined,
    follow_up_dates: [],
    success_probability: undefined,
    covid_impact: '',
    outcome: '',
    loss_reason: '',
    win_reason: '',
    date_closed: undefined
  },
  money: {
    ppc_fmv: '',
    seo_fmv: '',
    content_fmv: '',
    email_fmv: '',
    social_fmv: '',
    creative_fmv: '',
    cro_fmv: '',
    analytics_fmv: '',
    total_fmv: '',
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