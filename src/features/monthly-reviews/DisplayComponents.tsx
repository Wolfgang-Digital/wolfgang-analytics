import React from 'react';
import { Text, Grid, Stat, StatNumber, StatArrow, StatHelpText } from '@chakra-ui/core';

import { FilledReview } from './types';

export const ListHeader: React.FC<{ cols: string, mb?: number, mt?: number }> = ({ children, cols, mb, mt }) => {
  return (
    <Grid
    templateColumns={cols}
    gridColumnGap={4}
    borderRadius={2}
    background="#EDF2F7"
    p="0.5rem 1rem"
    fontSize="0.9em"
    fontWeight={500}
    pos="relative"
    mb={mb}
    mt={mt}
   >
     {children}
   </Grid>
  );
};

export const PillarListItem: React.FC<{ pillar: FilledReview['pillars'][number] }> = ({
  pillar,
}) => {
  return (
    <Grid
      templateColumns="1fr 2fr 2fr 1fr 2fr"
      background="white"
      borderRadius={4}
      border="1px solid #E2E8F0"
      p={3}
      mb={1}
      gridColumnGap={4}
    >
      <Text my="auto" fontWeight={500}>
        {pillar.name}
      </Text>
      <Text fontSize="0.8em" my="auto">
        {pillar.action}
      </Text>
      <Text fontSize="0.8em" my="auto">
        {pillar.behaviour}
      </Text>
      <Stat display="flex" alignItems="center">
        <StatNumber fontSize="1em">{pillar.score}</StatNumber>
        {pillar.delta && (
          <StatHelpText mb={0} ml={2}>
            <StatArrow size="10px" type={pillar.delta > 0 ? 'increase' : 'decrease'} />
            {pillar.delta.toString().replace('-', '')}
          </StatHelpText>
        )}
      </Stat>
      <Text fontSize="0.8em" my="auto">
        {pillar.note}
      </Text>
    </Grid>
  );
};

export const MetricListItem: React.FC<{ metric: FilledReview['metrics'][number] }> = ({
  metric,
}) => {
  return (
    <Grid
      templateColumns="2fr 1fr 2fr"
      background="white"
      borderRadius={4}
      border="1px solid #E2E8F0"
      p={3}
      mb={1}
      gridColumnGap={4}
    >
      <Text my="auto" fontSize="0.9em" fontWeight={500}>
        {metric.name}
      </Text>
      <Stat display="flex" alignItems="center">
        <StatNumber fontSize="1em">{metric.value}</StatNumber>
        {metric.delta && metric.delta !== 0 ? (
          <StatHelpText mb={0} ml={2}>
            <StatArrow size="10px" type={metric.delta > 0 ? 'increase' : 'decrease'} />
            {metric.delta.toString().replace('-', '')}
          </StatHelpText>
        ) : null}
      </Stat>
      <Text fontSize="0.8em" my="auto">
        {metric.note}
      </Text>
    </Grid>
  );
};

export const QuestionListItem: React.FC<{ question: FilledReview['questions'][number] }> = ({
  question,
}) => {
  return (
    <Grid
      templateColumns="1fr 2fr 2fr"
      background="white"
      borderRadius={4}
      border="1px solid #E2E8F0"
      p={3}
      mb={1}
      gridColumnGap={4}
    >
      <Text my="auto" fontSize="0.9em" fontWeight={500}>
        {question.section}
      </Text>
      <Text fontSize="0.8em" my="auto">
        {question.value}
      </Text>
      <Text fontSize="0.8em" my="auto">
        {question.answer}
      </Text>
    </Grid>
  );
};
