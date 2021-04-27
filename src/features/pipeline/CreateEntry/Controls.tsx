import React from 'react';
import { Box, Divider, Text, Progress, Button, ButtonGroup, Collapse } from '@chakra-ui/core';
import { useSelector } from 'react-redux';

import { getStatus } from '../slice';

interface Props {
  step: number;
  setStep: (step: number) => void;
  handleSubmit: () => void;
  isValid?: boolean;
}

const stepNames = ['The Enquiry', 'The Proposal', 'The Money'];

const Controls: React.FC<Props> = ({ step, setStep, handleSubmit, isValid }) => {
  const { isLoading } = useSelector(getStatus);

  return (
    <Box
      background="white"
      borderRadius={4}
      border="1px solid #E2E8F0"
      flexGrow={1}
      mb="auto"
      position="sticky"
      top="16px"
    >
      <Progress
        value={Math.ceil((step + 1) * 33.33)}
        borderTopLeftRadius={4}
        borderTopRightRadius={4}
        color="purple"
        size="sm"
        hasStripe
      />
      <Box p={4}>
        <Text color="gray.500" fontSize="xs" fontWeight={500}>
          Current Step
        </Text>
        <Text fontWeight={700} color="gray.700" fontSize="lg">
          {stepNames[step]}
        </Text>
        <Divider />
        <Collapse isOpen={!isValid}>
          <Text color="orange.500" fontSize="sm" pb={1}>
            Please fill in all required fields*
          </Text>
        </Collapse>
        <ButtonGroup display="flex">
          <Button
            size="sm"
            fontWeight={500}
            isDisabled={isLoading || step === 0}
            flexGrow={1}
            onClick={() => setStep(step - 1)}
            leftIcon="chevron-left"
          >
            Previous
          </Button>
          <Button
            size="sm"
            fontWeight={500}
            isDisabled={isLoading || step === 2 || !isValid}
            flexGrow={1}
            onClick={() => setStep(step + 1)}
            rightIcon="chevron-right"
          >
            Next
          </Button>
        </ButtonGroup>
        <Collapse isOpen={step === 2}>
          <Button
            size="sm"
            variantColor="teal"
            fontWeight={400}
            isDisabled={isLoading || step !== 2 || !isValid}
            isFullWidth
            mt={2}
            onClick={handleSubmit}
          >
            Create Client
          </Button>
        </Collapse>
      </Box>
    </Box>
  );
};

export default Controls;
