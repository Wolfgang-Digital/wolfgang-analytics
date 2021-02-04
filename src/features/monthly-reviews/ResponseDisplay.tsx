import React, { useEffect } from 'react';
import { Box, Skeleton, Heading, Text, IconButton, Tooltip, ButtonGroup } from '@chakra-ui/core';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';

import { getResponse, fetchResponses } from './slice';
import Card from 'components/Card';
import { useLinkHandler } from 'hooks/useLinkHandler';
import LabelledValue from 'components/LabelledValue';
import { PillarListItem, MetricListItem, QuestionListItem, ListHeader } from './DisplayComponents';
import { useResponseValues, useRelatedResponseIds } from './hooks';
import { useUserRoles, Roles , useUserId} from 'hooks/users';

const ResponseDisplay: React.FC = () => {
  const userId = useUserId();

  const dispatch = useDispatch();
  const { responseId, reviewId } = useParams();

  const { data, error, isLoading } = useSelector(getResponse);

  useEffect(() => {
    if (!data && !isLoading && !error) {
      dispatch(fetchResponses(reviewId));
    }
  }, [reviewId, dispatch, data, isLoading, error]);

  const response = data?.responses.find((r) => r.response_id.toString() === responseId);
  const values = useResponseValues(responseId, data);

  const ids = useRelatedResponseIds(responseId, data);

  const isAuthorised = useUserRoles([Roles.ADMIN, Roles.DEPT_HEAD]);

  const navigate = useLinkHandler();

  const handleEditClick = (role: 'manager' | 'employee') => {
    navigate(`/user/monthly-reviews/r/${reviewId}/response/${responseId}/edit/${role}`);
  };

  const handleArrowClick = (id?: number) => {
    if (id) navigate(`/user/monthly-reviews/r/${reviewId}/response/${id}`);
  };

  return (
    <Box pb={6}>
      <Skeleton isLoaded={!isLoading} display="flex" alignItems="baseline" marginBottom="1rem">
        <Heading size="lg" as="h1">
          {response && format(new Date(response.review_date), 'MMMM yyyy')}
        </Heading>
        <ButtonGroup size="sm" ml="auto" variant="ghost">
          <IconButton
            aria-label="Previous"
            icon="arrow-left"
            variantColor="purple"
            onClick={() => handleArrowClick(ids.prev)}
            isDisabled={!ids.prev}
          />
          <IconButton
            aria-label="Next"
            icon="arrow-right"
            variantColor="purple"
            onClick={() => handleArrowClick(ids.next)}
            isDisabled={!ids.next}
          />
        </ButtonGroup>
      </Skeleton>
      <Card display="grid" gridTemplateColumns="1fr auto" mb={6}>
        <Box>
          <LabelledValue label="Employee" value={data?.employee_name || ''} />
          <LabelledValue label="Manager" value={data?.manager_name || ''} />
          <LabelledValue label="Department" value={data?.department || ''} />
          {response && (
            <LabelledValue
              label="Review Date"
              value={format(new Date(response.review_date), 'MMMM yyyy')}
            />
          )}
        </Box>
      </Card>
      <ListHeader cols="1fr 2fr 2fr 1fr 2fr" mb={1}>
        <Text>Pillar</Text>
        <Text>Action</Text>
        <Text>Behaviour</Text>
        <Text>Score</Text>
        <Text>Note</Text>
        {isAuthorised && userId === data?.manager_id ? (
          <Tooltip
            label="Edit"
            aria-label="Edit manager response"
            showDelay={200}
            hasArrow
            placement="top"
          >
            <IconButton
              icon="edit"
              aria-label="Edit manager response"
              size="xs"
              isRound
              pos="absolute"
              right={4}
              top="calc(50% - 12px)"
              variant="ghost"
              variantColor="purple"
              onClick={() => handleEditClick('manager')}
            />
          </Tooltip>
        ) : null}
      </ListHeader>
      {values.pillars?.map((pillar, i) => (
        <PillarListItem key={i} pillar={pillar} />
      ))}
      <ListHeader cols="2fr 1fr 2fr" mb={1} mt={6}>
        <Text>Metric</Text>
        <Text>Score</Text>
        <Text>Note</Text>
        {isAuthorised && userId === data?.manager_id ? (
          <Tooltip
            label="Edit"
            aria-label="Edit manager response"
            showDelay={200}
            hasArrow
            placement="top"
          >
            <IconButton
              icon="edit"
              aria-label="Edit manager response"
              size="xs"
              isRound
              pos="absolute"
              right={4}
              top="calc(50% - 12px)"
              variant="ghost"
              variantColor="purple"
              onClick={() => handleEditClick('manager')}
            />
          </Tooltip>
        ) : null}
      </ListHeader>
      {values.metrics?.map((metric, i) => (
        <MetricListItem key={i} metric={metric} />
      ))}
      <ListHeader cols="1fr 2fr 2fr" mb={1} mt={6}>
        <Text>Section</Text>
        <Text>Question</Text>
        <Text>Answer</Text>
        {userId === data?.employee_id ? (
          <Tooltip
            label="Edit"
            aria-label="Edit employee response"
            showDelay={200}
            hasArrow
            placement="top"
          >
            <IconButton
              icon="edit"
              aria-label="Edit employee response"
              size="xs"
              isRound
              pos="absolute"
              right={4}
              top="calc(50% - 12px)"
              variant="ghost"
              variantColor="purple"
              onClick={() => handleEditClick('employee')}
            />
          </Tooltip>
        ) : null}
      </ListHeader>
      {values.questions?.map((question, i) => (
        <QuestionListItem key={i} question={question} />
      ))}
    </Box>
  );
};

export default ResponseDisplay;
