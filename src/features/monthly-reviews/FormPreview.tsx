import React from 'react';
import { Box, Text, Grid, Stack } from '@chakra-ui/core';
import { useParams } from 'react-router-dom';
import { ReviewTemplate, Review } from './types';
import { useAwsGet } from 'hooks/aws';
import Card from 'components/Card';
import LabelledValue from 'components/LabelledValue';
import AlertBox from 'components/AlertBox';
import BusyIndicator from 'components/BusyIndicator';

interface Props {
  review?: Review['form_data'];
  employee?: string;
  manager?: string;
  department?: string;
  handleCreate: () => void;
  button?: any;
}

const Pillar: React.FC<{ pillar: ReviewTemplate['pillars'][number] }> = ({ pillar }) => {
  return (
    <Grid
      templateColumns="1fr 2fr 2fr"
      background="white"
      borderRadius={4}
      border="1px solid #E2E8F0"
      px={4}
      py={5}
      columnGap={3}
    >
      <Text my="auto" fontWeight={500}>
        {pillar.value.name}
      </Text>
      <Text fontSize="0.8em" m="auto">
        {pillar.value.action}
      </Text>
      <Text fontSize="0.8em" m="auto">
        {pillar.value.behaviour}
      </Text>
    </Grid>
  );
};

const CreateFormPreview: React.FC<Props> = ({
  review,
  employee,
  manager,
  department,
  button: Component,
}) => {
  const { id } = useParams();
  const { data: loadedData, isLoading, error } = useAwsGet<Review>(`/reviews/r/${id}/form`);

  const data = review || loadedData?.form_data;

  return (
    <Box>
      <BusyIndicator isBusy={isLoading} color="#4FD1C5" />
      <Card display="grid" gridTemplateColumns="1fr auto">
        <Box>
          <LabelledValue label="Employee" value={employee || loadedData?.employee_name || ''} />
          <LabelledValue label="Manager" value={manager || loadedData?.manager_name || ''} />
          <LabelledValue label="Department" value={department || loadedData?.department || ''} />
        </Box>
        {Component ? <Component /> : null}
      </Card>
      {!!error && (
        <AlertBox
          status="error"
          title="Oops! Something wen't wrong"
          description={error}
          margin="32px 0"
        />
      )}
      <Grid templateColumns="1fr 1fr" mt={6} columnGap={4}>
        <Box>
          <Stack spacing={2}>
            <Grid
              templateColumns="1fr 2fr 2fr"
              borderRadius={2}
              background="#EDF2F7"
              p="0.5rem 1rem"
              fontSize="0.9em"
              fontWeight={500}
            >
              <Text>Pillar</Text>
              <Text textAlign="center">Action</Text>
              <Text textAlign="center">Behaviour</Text>
            </Grid>
            {data?.pillars?.map((pillar) => (
              <Box key={pillar.value.name}>
                <Pillar pillar={pillar} />
              </Box>
            ))}
          </Stack>
          <Stack spacing={2} mt={6}>
            <Text
              borderRadius={2}
              background="#EDF2F7"
              p="0.5rem 1rem"
              fontSize="0.9em"
              fontWeight={500}
            >
              Metric
            </Text>
            {data?.metrics?.map((metric, i) => (
              <Box
                key={i}
                borderRadius={4}
                background="white"
                p="0.5rem 1rem"
                border="1px solid #E2E8F0"
                fontSize="0.9em"
              >
                {metric.value}
              </Box>
            ))}
          </Stack>
        </Box>
        <Stack spacing={2}>
          {data?.questions?.map((section, i) => (
            <Box key={i}>
              <Text
                borderRadius={2}
                background="#EDF2F7"
                p="0.5rem 1rem"
                fontSize="0.9em"
                fontWeight={500}
                mb={1}
              >
                {section.value.section}
              </Text>
              {section.value.questions?.map((question, i) => (
                <Text
                  borderRadius={4}
                  background="white"
                  p="0.5rem 1rem"
                  border="1px solid #E2E8F0"
                  fontSize="0.9em"
                  key={i}
                  mb={i === section.value.questions.length - 1 ? 1 : 2}
                >
                  {question.value}
                </Text>
              ))}
            </Box>
          ))}
        </Stack>
      </Grid>
    </Box>
  );
};

export default CreateFormPreview;
