import React from 'react';
import {
  Box,
  Stack,
  Collapse,
  Text,
  IconButton,
  useDisclosure,
  Grid,
  Divider,
  Icon,
} from '@chakra-ui/core';

import { DepartmentReport } from './types';
import { NameAvatar } from './NameAvatar';

const colours = [
  'red.400',
  'orange.400',
  'yellow.400',
  'green.400',
  'teal.400',
  'blue.400',
  'cyan.400',
  'purple.400',
  'pink.400',
];

interface Props {
  section: DepartmentReport['data']['sections'][string];
}

const QuestionList: React.FC<{
  question: Props['section']['questions'][string];
}> = ({ question }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Grid templateColumns="1fr auto auto" columnGap={4} alignItems="center" mb={2}>
        <Text display="flex" alignItems="center" fontWeight={500}>
          <Icon name="question" mr={2} color="gray.400" />
          {question.text}
        </Text>
        <Text fontSize="0.85rem">
          {question.answers.length} response{question.answers.length > 1 ? 's' : ''} to this
          question
        </Text>
        <IconButton
          icon={isOpen ? 'view-off' : 'view'}
          aria-label="Toggle visibility"
          size="xs"
          variantColor="purple"
          variant="outline"
          onClick={onToggle}
        />
      </Grid>
      <Collapse isOpen={isOpen}>
        <Grid templateColumns="repeat(3, 1fr)" gridGap={4} mb={4}>
          {question.answers.map((answer, i) => (
            <Grid
              key={i}
              templateColumns="auto 1fr"
              columnGap={4}
              background="white"
              border="1px solid #E2E8F0"
              borderRadius={4}
              p={2}
              alignItems="center"
            >
              <NameAvatar
                name={answer.username}
                backgroundColor={colours[Math.floor(Math.random() * (colours.length - 1))]}
              />
              <Text fontSize="0.9rem">{answer.answer}</Text>
            </Grid>
          ))}
        </Grid>
      </Collapse>
    </Box>
  );
};

const DRSection: React.FC<Props> = ({ section }) => {
  const { isOpen, onToggle } = useDisclosure();

  const questions = Object.values(section.questions);

  return (
    <Box>
      <Grid templateColumns="1fr auto auto" columnGap={4} alignItems="center">
        <Text fontWeight={500} mb={2} fontSize="1.2rem">
          {section.sectionName}
        </Text>
        <Text fontSize="0.85rem">
          {questions.length} question{questions.length > 1 ? 's' : ''} in this section
        </Text>
        <IconButton
          icon={isOpen ? 'view-off' : 'view'}
          aria-label="Toggle visibility"
          size="xs"
          variantColor="teal"
          variant="outline"
          onClick={onToggle}
        />
      </Grid>
      <Collapse isOpen={isOpen}>
        <Stack>
          {questions.map((question) => (
            <QuestionList key={question.text} question={question} />
          ))}
        </Stack>
      </Collapse>
      <Divider />
    </Box>
  );
};

export default DRSection;
