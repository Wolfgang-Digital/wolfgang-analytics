import { useMemo, useState } from 'react';

import { useForm } from 'hooks/useForm';
import { PipelineEntry } from '../types';
import { initialFormState } from '../utils';

export const useEnquiryForm = (entry?: PipelineEntry) => {
  // @ts-ignore
  const input: typeof initialFormState['enquiry'] = useMemo(() => {
    const data = entry || initialFormState.enquiry;
    const { date_added, company_name, is_new, country, channels, source, source_comment, status } = data;

    return {
      date_added: new Date(date_added),
      company_name,
      is_new,
      country,
      channels: channels.map(x => ({ label: x, value: x })),
      source: { label: source, value: source },
      source_comment: source_comment || '',
      status
    };
  }, [entry]);

  const { form, updateForm } = useForm(input, entry?.id.toString());

  const [hasChanged, setHasChanged] = useState(false);

  const update = (input: any) => {
    setHasChanged(true);
    updateForm(input);
  };

  return { enquiryForm: form, updateEnquiry: update, hasChanged, setHasChanged };
};

export const useProposalForm = (entry?: PipelineEntry) => {
  const data = entry || initialFormState.proposal;
  const {
    details,
    success_probability,
    loss_reason,
    date_closed,
    proposal_leads,
    contact_email
  } = data;
  // @ts-ignore
  const input: typeof initialFormState['proposal'] = {
    details,
    success_probability,
    contact_email: contact_email || '',
    loss_reason: loss_reason || '',
    date_closed: date_closed ? new Date(date_closed) : undefined,
    // @ts-ignore
    proposal_leads: proposal_leads?.map((user) => user ? ({ label: user.username, value: user.user_id }) : null).filter(x => !!x) || [],
    // @ts-ignore
    proposal_doc_link: data.proposal_doc_link || ''
  };

  const { form, updateForm } = useForm(input, entry?.id.toString());
  
  const [hasChanged, setHasChanged] = useState(false);

  const update = (input: any) => {
    setHasChanged(true);
    updateForm(input);
  };

  return { proposalForm: form, updateProposal: update, hasChanged, setHasChanged };
};

export const useMoneyForm = (entry?: PipelineEntry) => {
  const input = Object.entries(entry || initialFormState.money).reduce((result: any, [key, value]) => {
    if (key.match(/_12mv/)) {
      result[key] = value || '';
    } else if (key === 'channel_data') {
      result[key] = value || {};
    }
    return result;
  }, {});

  const { form, updateForm } = useForm(input, entry?.id.toString());

  const [hasChanged, setHasChanged] = useState(false);

  const update = (input: any) => {
    setHasChanged(true);
    updateForm(input);
  };

  return { moneyForm: form, updateMoney: update, hasChanged, setHasChanged };
};