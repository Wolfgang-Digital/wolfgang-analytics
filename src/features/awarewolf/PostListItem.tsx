import React from 'react';
import { Heading, Button, ButtonGroup } from '@chakra-ui/core';

import { useLinkHandler } from 'hooks/useLinkHandler';
import Card from 'components/Card';
import { Post } from './slice';
import TagList from './TagList';
import DateDisplay from './DateDisplay';
import VoteIndicator from './VoteIndicator';

const PostListItem: React.FC<{ post: Post }> = ({ post }) => {
  const {
    post_id,
    title,
    created_at,
    username,
    vote_score = 0,
    num_comments = 0,
    tags,
    user_vote = 0,
  } = post;

  const navigate = useLinkHandler();

  const handleClick = () => {
    navigate(`/awarewolf/posts/p/${post_id}`);
  };

  return (
    <Card
      display="grid"
      gridTemplateColumns="minmax(50px, auto) 1fr auto"
      gridTemplateRows="repeat(3, auto)"
      gridColumnGap={2}
      alignItems="center"
      p={0}
      py={1}
      mb={4}
      borderLeft="4px solid transparent"
      transition="all 200ms ease-out"
      cursor="pointer"
      onClick={handleClick}
      _hover={{
        borderColor: 'purple.400',
      }}
    >
      <VoteIndicator postId={post_id} count={vote_score} userVote={user_vote} />
      <DateDisplay username={username} created_at={created_at} />
      <TagList tags={tags} />
      <Heading as="h3" size="sm" gridRow="2" gridColumn="2 / span 2">
        {title}
      </Heading>
      <ButtonGroup
        variant="ghost"
        fontSize="0.75rem"
        color="gray.500"
        fontWeight={700}
        size="xs"
        transform="translateX(-2px)"
        gridRow="3"
        gridColumn="2 / span 2"
      >
        <Button leftIcon="chat">
          {num_comments}
          {num_comments === 1 ? ' Comment' : ' Comments'}
        </Button>
      </ButtonGroup>
    </Card>
  );
};

export default PostListItem;
