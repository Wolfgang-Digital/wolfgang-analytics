import React from 'react';
import { Flex, IconButton, Text } from '@chakra-ui/core';

import { usePostVotes, useCommentVotes } from './hooks';

const isUpvotedProps = {
  upArrow: {
    variantColor: 'orange',
  },
  downArrow: {
    color: 'gray.400',
  },
};

const isDownvotedProps = {
  downArrow: {
    variantColor: 'blue',
  },
  upArrow: {
    color: 'gray.400',
  },
};

const defaultProps = {
  upArrow: {
    color: 'gray.400',
  },
  downArrow: {
    color: 'gray.400',
  },
};

interface Props {
  postId: number;
  count: number;
  userVote: number;
  isInline?: boolean;
}

const VoteIndicator: React.FC<Props> = ({ count, userVote, isInline, postId }) => {
  const { isLoading, submitVote } = usePostVotes(postId);

  const arrowProps = userVote > 0 ? isUpvotedProps : userVote < 0 ? isDownvotedProps : defaultProps;

  const handleClick = (e: any, value: number) => {
    e.stopPropagation();
    submitVote(value);
  };

  return (
    <Flex
      flexDirection={isInline ? 'row' : 'column'}
      alignItems="center"
      justifyContent="center"
      gridRow="1 / span 3"
    >
      <IconButton
        icon="triangle-up"
        aria-label="Upvote post"
        variant="ghost"
        size="sm"
        isLoading={isLoading}
        onClick={(e) => handleClick(e, 1)}
        {...arrowProps.upArrow}
      />
      <Text fontWeight={700} lineHeight={1} py={1} color="gray.700" mx={isInline ? 1 : 0}>
        {count}
      </Text>
      <IconButton
        icon="triangle-down"
        aria-label="Downvote post"
        variant="ghost"
        size="sm"
        isLoading={isLoading}
        onClick={(e) => handleClick(e, -1)}
        {...arrowProps.downArrow}
      />
    </Flex>
  );
};

interface CommentProps {
  count: number;
  userVote: number;
  commentId: number;
}

export const CommentVoteIndicator: React.FC<CommentProps> = ({ count, userVote, commentId }) => {
  const { isLoading, submitVote } = useCommentVotes(commentId);

  const arrowProps = userVote > 0 ? isUpvotedProps : userVote < 0 ? isDownvotedProps : defaultProps;

  const handleClick = (e: any, value: number) => {
    e.stopPropagation();
    submitVote(value);
  };

  return (
    <Flex alignItems="center" justifyContent="flex-start">
      <IconButton
        icon="triangle-up"
        aria-label="Upvote post"
        variant="ghost"
        size="xs"
        isLoading={isLoading}
        onClick={(e) => handleClick(e, 1)}
        {...arrowProps.upArrow}
      />
      <Text fontWeight={500} fontSize="0.9em" lineHeight={1} py={1} color="gray.700" mx={1}>
        {count}
      </Text>
      <IconButton
        icon="triangle-down"
        aria-label="Downvote post"
        variant="ghost"
        size="xs"
        isLoading={isLoading}
        onClick={(e) => handleClick(e, -1)}
        {...arrowProps.downArrow}
      />
    </Flex>
  );
};

export default VoteIndicator;
