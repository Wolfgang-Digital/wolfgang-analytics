import React from 'react';
import { PseudoBox, Flex, Tooltip, IconButton, useToast } from '@chakra-ui/core';
import { format } from 'date-fns';
import { FaRegUserCircle } from 'react-icons/fa';

import { awsDelete } from 'utils/api';
import IconLabel, { CustomIconLabel } from 'components/IconLabel';
import DeptBadge from 'components/DeptBadge';
import { Review } from './types';
import { useLinkHandler } from 'hooks/useLinkHandler';

interface Props {
  review: Review;
  isAuthorised?: boolean;
  handleDelete: (id: number) => void;
}

const ReviewListItem: React.FC<Props> = ({ review, isAuthorised, handleDelete }) => {
  const navigate = useLinkHandler();

  const toast = useToast();

  const handleDeleteClick = async (e: any) => {
    e.stopPropagation();
    const res = await awsDelete(`/reviews/r/${review.review_id}`);

    if (res.success) {
      handleDelete(review.review_id);
      toast({
        variant: 'left-accent',
        status: 'success',
        description: 'Review deleted',
        position: 'bottom-left',
        isClosable: true,
      });
    }
  };

  const handleViewClick = (e: any) => {
    e.stopPropagation();
    navigate(`/user/monthly-reviews/r/${review.review_id}/preview`);
  };

  const handleEditClick = (e: any) => {
    e.stopPropagation();
    navigate(`/user/monthly-reviews/r/${review.review_id}/edit/0`);
  };

  return (
    <PseudoBox
      display="grid"
      gridTemplateColumns="2fr 2fr 1fr 1fr 1fr"
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
      onClick={() => navigate(`/user/monthly-reviews/r/${review.review_id}`)}
    >
      <CustomIconLabel icon={FaRegUserCircle} text={review.employee_name} />
      <CustomIconLabel icon={FaRegUserCircle} text={review.manager_name} />
      <DeptBadge department={review.department} m="auto auto auto 0" />
      <IconLabel icon="calendar" text={format(new Date(review.created_on), 'dd.MM.yyyy')} />
      <Flex justifyContent="flex-end">
        <Tooltip
          aria-label="Show review questions"
          label="Show review questions"
          showDelay={200}
          hasArrow
        >
          <IconButton
            aria-label="Show review questions"
            icon="info-outline"
            variant="ghost"
            size="sm"
            p={1}
            isRound
            color="gray.700"
            onClick={handleViewClick}
          />
        </Tooltip>
        {isAuthorised && (
          <>
            <Tooltip aria-label="Edit review" label="Edit review" showDelay={200} hasArrow>
              <IconButton
                aria-label="Edit review"
                icon="edit"
                variant="ghost"
                size="sm"
                p={1}
                isRound
                color="gray.700"
                onClick={handleEditClick}
              />
            </Tooltip>
            <Tooltip aria-label="Delete review" label="Delete review" showDelay={200} hasArrow>
              <IconButton
                aria-label="Delete review"
                icon="delete"
                variant="ghost"
                size="sm"
                p={1}
                isRound
                color="gray.700"
                onClick={handleDeleteClick}
              />
            </Tooltip>
          </>
        )}
      </Flex>
    </PseudoBox>
  );
};

export default ReviewListItem;
