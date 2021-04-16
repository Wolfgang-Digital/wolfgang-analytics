import { useMemo } from 'react';

import { useForm } from 'hooks/useForm';
import { PipelineEntry } from '../types';
import { initialFormState } from '../utils';

export const useEnquiryForm = (entry?: PipelineEntry) => {
  // @ts-ignore
  const input: typeof initialFormState['enquiry'] = useMemo(() => {
    const data = entry || initialFormState.enquiry;
    const { date_added, company_name, is_new, country, is_ongoing, scope, channels, source, source_comment, leads, status } = data;

    return {
      date_added: new Date(date_added),
      company_name,
      is_new,
      country,
      is_ongoing,
      scope,
      channels: channels.map(x => ({ label: x, value: x })),
      source: { label: source, value: source },
      source_comment: source_comment || '',
      leads,
      status
    };
  }, [entry]);

  const { form, updateForm } = useForm(input, entry?.id.toString());
  return { enquiryForm: form, updateEnquiry: updateForm };
};

export const useProposalForm = (entry?: PipelineEntry) => {
  const data = entry || initialFormState.proposal;
  const {
    details,
    date_contacted,
    proposal_issue_date,
    meeting_date,
    //      follow_up_dates, 
    success_probability,
    outcome,
    win_reason,
    loss_reason,
    date_closed,
    proposal_leads,
    contact_email
  } = data;
  // @ts-ignore
  const input: typeof initialFormState['proposal'] = {
    details,
    date_contacted: date_contacted ? new Date(date_contacted) : undefined,
    proposal_issue_date: proposal_issue_date ? new Date(proposal_issue_date) : undefined,
    meeting_date: meeting_date ? new Date(meeting_date) : undefined,
    //      follow_up_dates, 
    success_probability,
    contact_email: contact_email || '',
    outcome: outcome || '',
    win_reason: win_reason || '',
    loss_reason: loss_reason || '',
    date_closed: date_closed ? new Date(date_closed) : undefined,
    // @ts-ignore
    proposal_leads: proposal_leads?.map((user) => user ? ({ label: user.username, value: user.user_id }) : null).filter(x => !!x) || []
  };

  const { form, updateForm } = useForm(input, entry?.id.toString());
  return { proposalForm: form, updateProposal: updateForm };
};

export const useMoneyForm = (entry?: PipelineEntry) => {
  const input = Object.entries(entry || initialFormState.money).reduce((result: any, [key, value]) => {
    if (key.match(/_(f|12)mv/)) {
      result[key] = value || '';
    }
    return result;
  }, {});

  const { form, updateForm } = useForm(input, entry?.id.toString());
  return { moneyForm: form, updateMoney: updateForm };
};