import { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useCurrentUser } from 'hooks/users';
import { voteOnPost, getVoteIsLoading, fetchComments, getComments, Comment, createComment, voteOnComment } from './slice';

export const usePostVotes = (postId: number) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const isVoteLoading = useSelector(getVoteIsLoading);

  const submitVote = useCallback((value: number) => {
    setIsLoading(true);
    dispatch(voteOnPost({ id: postId, value }));
  }, [dispatch, postId]);

  useEffect(() => {
    if (!isVoteLoading) setIsLoading(false);
  }, [isVoteLoading]);

  return { isLoading: isLoading && isVoteLoading, submitVote };
};

export const useCommentVotes = (commentId: number) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const isVoteLoading = useSelector(getVoteIsLoading);

  const submitVote = useCallback((value: number) => {
    setIsLoading(true);
    dispatch(voteOnComment({ id: commentId, value }));
  }, [dispatch, commentId]);

  useEffect(() => {
    if (!isVoteLoading) setIsLoading(false);
  }, [isVoteLoading]);

  return { isLoading: isLoading && isVoteLoading, submitVote };
};

export const useComments = (postId: number) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  const { parentPostId, comments } = useSelector(getComments);

  return parentPostId?.toString() === postId.toString() ? comments : [];
};

export const useChildren = (comment: Comment) => {
  const { comments } = useSelector(getComments);

  const children = comments.filter(c => {
    if (c.comment_id.toString() === comment.comment_id.toString()) return false;
    if (c.depth - comment.depth !== 1) return false;
    return c.sort_key.includes(comment.comment_id);
  });

  return children;
};


export const useCommentCreator = (postId: number, parentId: number | null, sortKey: number[]) => {
  const dispatch = useDispatch();
  const user = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const isCommentLoading = useSelector(getVoteIsLoading);

  const submitComment = useCallback((body: string) => {
    setIsLoading(true);
    dispatch(createComment({ id: postId, parentId, body, username: user?.username || 'Anonymous', sortKey }));
  }, [dispatch, postId, parentId, user, sortKey]);

  useEffect(() => {
    if (!isCommentLoading) setIsLoading(false);
  }, [isCommentLoading]);

  return { isLoading: isLoading && isCommentLoading, submitComment };
};