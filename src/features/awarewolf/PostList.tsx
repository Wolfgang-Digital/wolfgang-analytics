import React, { useEffect } from 'react';
import { Box, List } from '@chakra-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useTransition, config, animated } from 'react-spring';

import { fetchPosts, getPosts } from './slice';
import PostListItem from './PostListItem';

const PostList: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const posts = useSelector(getPosts);

  const transitions = useTransition(posts, (item) => item.post_id, {
    config: config.gentle,
    from: { opacity: 0, transform: 'translate3d(-10%, 0px, 0px)' },
    enter: { opacity: 1, transform: 'translate3d(0%, 0px, 0px)' },
    leave: { opacity: 0, height: 0, transform: 'translate3d(10%, 0px, 0px)' },
    trail: 100,
  });

  return (
    <Box pb={6} mt={4}>
      <List>
        {transitions.map(({ item, key, props }) => (
          <animated.li key={key} style={props}>
            <PostListItem post={item} />
          </animated.li>
        ))}
      </List>
    </Box>
  );
};

export default PostList;
