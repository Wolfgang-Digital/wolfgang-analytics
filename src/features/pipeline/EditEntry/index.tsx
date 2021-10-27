import React, { useEffect, useState } from 'react';
import { Heading, Box, Grid } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { pick } from 'lodash';

import { getCurrentEntry, fetchEntry, updateEntry } from '../slice';
import { useEnquiryForm, useProposalForm, useMoneyForm } from './hooks';
import { getFormData } from './utils';
import EnquiryForm from '../Forms/EnquiryForm';
import ProposalForm from '../Forms/ProposalForm';
import MoneyForm from '../Forms/MoneyForm';
import Contols from './Controls';

const EditEntry: React.FC = () => {
  const [tab, setTab] = useState<'ENQUIRY' | 'PROPOSAL' | 'MONEY'>('ENQUIRY');
  const dispatch = useDispatch();
  const { id } = useParams();
  const entry = useSelector(getCurrentEntry);

  useEffect(() => {
    if (id !== entry?.id.toString()) {
      dispatch(fetchEntry(id));
    }
  }, [id, entry, dispatch]);

  const {
    enquiryForm,
    updateEnquiry,
    hasChanged: enquiryHasChanged,
    setHasChanged: setEC,
  } = useEnquiryForm(entry);
  const {
    proposalForm,
    updateProposal,
    hasChanged: proposalHasChanged,
    setHasChanged: setPC,
  } = useProposalForm(entry);
  const {
    moneyForm,
    updateMoney,
    hasChanged: moneyHasChanged,
    setHasChanged: setMC,
  } = useMoneyForm(entry);

  const handleUpdate = () => {
    if (entry) {
      const input = tab === 'ENQUIRY' ? enquiryForm : tab === 'PROPOSAL' ? proposalForm : moneyForm;
      const formData = getFormData(input);

      if (formData.proposal_leads) {
        formData.proposal_leads = formData.proposal_leads.map((option: any) => option.value);
      }
      if (tab === 'ENQUIRY') {
        formData.channel_data = pick(moneyForm.channel_data, formData.channels);
      }
      dispatch(updateEntry({ id: entry.id, values: formData }));
      setEC(false);
      setPC(false);
      setMC(false);
    }
  };

  const changeTab = (tab: 'ENQUIRY' | 'PROPOSAL' | 'MONEY') => {
    setTab(tab);
  };

  return (
    <Box>
      <Heading mb={6} size="lg">
        Edit Enquiry
      </Heading>
      <Grid
        templateColumns="minmax(350px, 1024px) minmax(200px, 350px)"
        columnGap={8}
        justifyContent="space-between"
      >
        {tab === 'ENQUIRY' ? (
          <EnquiryForm state={enquiryForm} updateForm={updateEnquiry} isEditPage retroactiveMode />
        ) : tab === 'PROPOSAL' ? (
          <ProposalForm state={proposalForm} updateForm={updateProposal} isEditPage />
        ) : (
          <MoneyForm
            state={moneyForm}
            updateForm={updateMoney}
            channels={entry?.channels}
            isEditPage
          />
        )}
        <Contols
          id={entry?.id}
          dateAdded={entry?.date_added}
          lastUpdated={entry?.last_updated}
          tab={tab}
          setTab={changeTab}
          onUpdate={handleUpdate}
          name={entry?.company_name}
          status={entry?.status}
          channelData={entry?.channel_data}
          dateClosed={entry?.date_closed}
          enquiryChanged={enquiryHasChanged}
          proposalChanged={proposalHasChanged}
          moneyChanged={moneyHasChanged}
          actual_12mv={entry?.actual_12mv}
        />
      </Grid>
    </Box>
  );
};

export default EditEntry;
