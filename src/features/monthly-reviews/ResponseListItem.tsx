import React from 'react';
import { PseudoBox, Badge, IconButton, Flex, Tooltip } from '@chakra-ui/core';
import { format } from 'date-fns';

import { useLinkHandler } from 'hooks/useLinkHandler';
import IconLabel from 'components/IconLabel';
import { ReviewResponse } from './types';

const isValidInput = (obj?: Record<string, any>) => {
  return !!obj && ((!!obj.pillars && !!obj.metrics) || !!obj.questions);
};

interface Props {
  reviewId?: string | number;
  response: ReviewResponse['responses'][number];
  isAuthorised?: boolean;
  handleDelete: (e: any, id: number) => void
}

const ResponseListItem: React.FC<Props> = ({ reviewId, response, isAuthorised, handleDelete }) => {
  const navigate = useLinkHandler();

  const handleEditClick = (e: any) => {
    e.stopPropagation();
    navigate(
      `/user/monthly-reviews/r/${reviewId}/response/${response.response_id}/edit/${
        isAuthorised ? 'manager' : 'employee'
      }`
    );
  };

  return (
    <PseudoBox
      position="relative"
      display="grid"
      gridTemplateColumns="repeat(4, 1fr)"
      background="white"
      p="0.5rem 1rem"
      borderRadius={2}
      marginBottom={1}
      borderLeft="4px solid transparent"
      transition="all 200ms ease-out"
      cursor="pointer"
      _hover={{
        borderLeftColor: 'purple.400',
      }}
      onClick={() =>
        navigate(`/user/monthly-reviews/r/${reviewId}/response/${response.response_id}`)
      }
    >
      <IconLabel icon="calendar" text={format(new Date(response.review_date), 'MMMM yyyy')} />
      <Badge
        m="auto auto auto 0"
        variantColor={isValidInput(response.manager_form_data) ? 'green' : 'orange'}
      >
        {isValidInput(response.manager_form_data) ? 'Submitted' : 'Pending'}
      </Badge>
      <Badge
        m="auto auto auto 0"
        variantColor={isValidInput(response.employee_form_data) ? 'green' : 'orange'}
      >
        {isValidInput(response.employee_form_data) ? 'Submitted' : 'Pending'}
      </Badge>
      <Flex justifyContent="flex-end">
        <Tooltip
          aria-label="Edit input"
          label={isAuthorised ? 'Edit manager input' : 'Edit employee input'}
          showDelay={200}
          hasArrow
        >
          <IconButton
            aria-label="Edit input"
            icon="edit"
            variant="ghost"
            size="sm"
            p={1}
            isRound
            color="gray.700"
            onClick={handleEditClick}
          />
        </Tooltip>
        <Tooltip aria-label="Delete response" label="Delete response" showDelay={200} hasArrow>
          <IconButton
            aria-label="Delete response"
            icon="delete"
            variant="ghost"
            size="sm"
            p={1}
            isRound
            color="gray.700"
            onClick={(e: any) => handleDelete(e, response.response_id)}
          />
        </Tooltip>
      </Flex>
    </PseudoBox>
  );
};

export default ResponseListItem;
