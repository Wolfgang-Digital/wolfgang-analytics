import React, { useEffect } from 'react';
import { Box, Heading, Skeleton, Button, useDisclosure } from '@chakra-ui/core';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';

import { fetchPost, getActivePost, getIsLoading } from './slice';
import { useComments } from './hooks';
import DateDisplay from './DateDisplay';
import TagList from './TagList';
import VoteIndicator from './VoteIndicator';
import CommentThread from './CommentThread';
import CreateComment from './CreateComment';

const md = new MarkdownIt();

const ViewPost: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const post = useSelector(getActivePost);
  const isLoading = useSelector(getIsLoading);

  const comments = useComments(id);

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  return (
    <Box pb={12}>
      <Skeleton isLoaded={!!post && !isLoading}>
        <Box background="white" borderRadius={4} border="1px solid #E2E8F0" p={4} mt={2} mb={1}>
          <DateDisplay username={post?.username} created_at={post?.created_at} />
          <Heading as="h2" size="lg" mt={1}>
            {post?.title}
          </Heading>
        </Box>
      </Skeleton>
      <Skeleton isLoaded={!!post && !isLoading} display="flex" alignItems="center">
        <VoteIndicator
          postId={post?.post_id || 0}
          count={post?.vote_score || 0}
          userVote={post?.user_vote || 0}
          isInline
        />
        <Button leftIcon="chat" size="sm" fontSize="0.9em" ml={2} variant="ghost" color="gray.500">
          {post?.num_comments || 0}
          {post?.num_comments === 1 ? ' Comment' : ' Comments'}
        </Button>
        <TagList tags={post?.tags} boxProps={{ ml: 'auto' }} />
      </Skeleton>
      <Skeleton isLoaded={!!post && !isLoading}>
        <Box background="white" borderRadius={4} border="1px solid #E2E8F0" p={4} mt={1}>
          <section className="sec-html">
            <div
              className="custom-html-style"
              dangerouslySetInnerHTML={{ __html: md.render(post?.body || '') }}
            />
          </section>
        </Box>
      </Skeleton>
      <Skeleton isLoaded={!!post && !isLoading}>
        <Button leftIcon={isOpen ? 'minus' : 'add'} size="xs" onClick={onToggle} my={2}>
          Reply
        </Button>
        <CreateComment postId={id} isOpen={isOpen} sortKey={[]} toggleOpen={onToggle} />
      </Skeleton>
      {comments
        .filter((comment) => comment.depth === 0)
        .map((comment) => (
          <CommentThread key={comment.comment_id} postId={id} comment={comment} />
        ))}
    </Box>
  );
};

export default ViewPost;
