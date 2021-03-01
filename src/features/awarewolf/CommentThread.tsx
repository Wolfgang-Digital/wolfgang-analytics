import React from 'react';
import { PseudoBox, Collapse, useDisclosure, Button, Flex } from '@chakra-ui/core';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';

import { Comment } from './slice';
import { useChildren } from './hooks';
import DateDisplay from './DateDisplay';
import { CommentVoteIndicator } from './VoteIndicator';
import CreateComment from './CreateComment';

const md = new MarkdownIt();

interface Props {
  comment: Comment;
  parentId?: number;
  postId: number;
}

const CommentThread: React.FC<Props> = ({ comment, postId }) => {
  const { isOpen, onToggle } = useDisclosure(true);
  const { isOpen: editorOpen, onToggle: toggleEditor } = useDisclosure(false);

  const children = useChildren(comment);
  const numChildren = children.length;

  const handleToggle = (e: any) => {
    e?.stopPropagation?.();
    onToggle();
  };

  const handleEditorToggle = (e: any) => {
    e?.stopPropagation?.();
    toggleEditor();
  };

  return (
    <PseudoBox
      p={2}
      pl={4}
      mt={2}
      borderLeft="2px solid #E2E8F0"
      transition="all 200ms ease-out"
      cursor="pointer"
      onClick={handleToggle}
      _hover={{
        borderColor: `purple.${Math.min(2 + comment.depth, 9)}00`,
      }}
    >
      <DateDisplay username={comment.username} created_at={comment.created_at} />
      <Collapse isOpen={isOpen}>
        <section className="sec-html">
          <div
            className="custom-html-style"
            dangerouslySetInnerHTML={{ __html: md.render(comment.body) }}
          />
        </section>
        <Flex align="baseline" mb={1}>
          <CommentVoteIndicator
            count={comment.vote_score}
            userVote={comment.user_vote || 0}
            commentId={comment.comment_id}
          />
          <Button leftIcon="chat" size="xs" ml={2} variant="ghost" color="gray.500">
            {numChildren}
            {numChildren === 1 ? ' Reply' : ' Replies'}
          </Button>
          <Button
            leftIcon={editorOpen ? 'minus' : 'add'}
            size="xs"
            onClick={handleEditorToggle}
            variant="ghost"
            color="gray.500"
          >
            Reply
          </Button>
        </Flex>
        <CreateComment
          isOpen={editorOpen}
          postId={postId}
          parentId={comment.comment_id}
          sortKey={comment.sort_key}
          toggleOpen={handleEditorToggle}
        />
        {children.map((child) => (
          <CommentThread
            key={child.comment_id}
            comment={child}
            parentId={comment.comment_id}
            postId={postId}
          />
        ))}
      </Collapse>
    </PseudoBox>
  );
};

export default CommentThread;
