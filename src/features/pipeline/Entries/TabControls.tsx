import React from 'react';
import { ButtonGroup, Button } from '@chakra-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { getCurrentTab, setTab } from '../slice';

const TabControls: React.FC = () => {
  const dispatch = useDispatch();
  const tab = useSelector(getCurrentTab);

  return (
    <ButtonGroup size="xs">
      <Button
        fontWeight={400}
        variantColor={tab === 'ENQUIRY' ? 'purple' : undefined}
        onClick={() => dispatch(setTab('ENQUIRY'))}
      >
        The Enquiry
      </Button>
      <Button
        fontWeight={400}
        variantColor={tab === 'PROPOSAL' ? 'purple' : undefined}
        onClick={() => dispatch(setTab('PROPOSAL'))}
      >
        The Proposal
      </Button>
      <Button
        fontWeight={400}
        iconSpacing={4}
        variantColor={tab === 'MONEY' ? 'purple' : undefined}
        onClick={() => dispatch(setTab('MONEY'))}
      >
        The Money
      </Button>
    </ButtonGroup>
  );
};

export default TabControls;
