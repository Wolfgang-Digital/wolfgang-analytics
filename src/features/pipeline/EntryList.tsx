import React, { useEffect } from 'react';
import { Box, List, ListItem, Grid, Text } from '@chakra-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useTransition, config, animated } from 'react-spring';

import { fetchEntries, getEntries } from './slice';
import EntryListItem from './EntryListItem';

const PostList: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEntries());
  }, [dispatch]);

  const entries = useSelector(getEntries);

  const transitions = useTransition(entries, (item) => item.id, {
    config: config.gentle,
    from: { opacity: 0, transform: 'translate3d(-10%, 0px, 0px)' },
    enter: { opacity: 1, transform: 'translate3d(0%, 0px, 0px)' },
    leave: { opacity: 0, height: 0, transform: 'translate3d(10%, 0px, 0px)' },
    trail: 100,
  });

  return (
    <Box pb={6} mt={4}>
      <Grid
        templateColumns="repeat(11, 1fr)"
        background="#EDF2F7"
        p="0.5rem 1rem"
        borderRadius={2}
        fontSize="0.9em"
        fontWeight={500}
        marginBottom={2}
        position="sticky"
        top={1}
        zIndex={100}
        gridGap={2}
      >
        <Text>Date</Text>
        <Text>Company</Text>
        <Text>Type</Text>
        <Text>Country</Text>
        <Text>Leads</Text>
        <Text>Channels</Text>
        <Text>Contacted</Text>
        <Text>SEO FMV</Text>
        <Text>PPC FMV</Text>
        <Text>12M Value</Text>
        <Text>Updated</Text>
      </Grid>
      <List>
        {entries.length === 0 && (
          <ListItem
            border="1px solid #E2E8F0"
            borderRadius={4}
            p={4}
            fontSize="0.9em"
            color="gray.500"
          >
            No entries to display
          </ListItem>
        )}
        {transitions.map(({ item, key, props }) => (
          <animated.li key={key} style={props}>
            <EntryListItem entry={item} />
          </animated.li>
        ))}
      </List>
    </Box>
  );
};

export default PostList;
