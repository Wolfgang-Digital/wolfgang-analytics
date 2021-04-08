import React, { useEffect, useState } from 'react';
import { Heading, Box, Grid } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

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

  const { enquiryForm, updateEnquiry } = useEnquiryForm(entry);
  const { proposalForm, updateProposal } = useProposalForm(entry);
  const { moneyForm, updateMoney } = useMoneyForm(entry);

  const handleUpdate = () => {
    if (entry) {
      const input = tab === 'ENQUIRY' ? enquiryForm : tab === 'PROPOSAL' ? proposalForm : moneyForm;
      const formData = getFormData(input);
      dispatch(updateEntry({ id: entry.id, values: formData }));
    }
  };

  return (
    <Box>
      <Heading mb={6} size="lg">
        Edit Pipeline Entry
      </Heading>
      <Grid
        templateColumns="minmax(350px, 1fr) minmax(200px, 350px)"
        columnGap={16}
        justifyContent="space-between"
      >
        {tab === 'ENQUIRY' ? (
          <EnquiryForm state={enquiryForm} updateForm={updateEnquiry} isEditPage />
        ) : tab === 'PROPOSAL' ? (
          <ProposalForm state={proposalForm} updateForm={updateProposal} isEditPage />
        ) : (
          <MoneyForm state={moneyForm} updateForm={updateMoney} />
        )}
        <Contols
          id={entry?.id}
          tab={tab}
          setTab={setTab}
          onUpdate={handleUpdate}
          name={entry?.company_name}
          status={entry?.status}
          outcome={entry?.outcome}
          dateClosed={entry?.date_closed}
        />
      </Grid>
    </Box>
  );
};

export default EditEntry;
