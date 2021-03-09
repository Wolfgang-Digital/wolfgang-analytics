import React, { useEffect } from 'react';
import { Box, Grid, Text, PseudoBox, Heading, Icon, Skeleton } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'react-table';

import { useLinkHandler } from 'hooks/useLinkHandler';
import { fetchEntries, PipelineEntry, getStatus } from './slice';
import { useEntryTable } from './hooks';
import Filters from './Filters';

const PostList: React.FC = () => {
  const navigate = useLinkHandler();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(getStatus);

  useEffect(() => {
    dispatch(fetchEntries());
  }, [dispatch]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
  } = useEntryTable();

  return (
    <>
      <Heading mb={6} size="lg">
        Pipeline
      </Heading>
      <Skeleton isLoaded={!isLoading}>
        <Filters />
      </Skeleton>
      <Skeleton isLoaded={!isLoading}>
        <Box pb={6} mt={4} {...getTableProps()}>
          <Box>
            {headerGroups.map((headerGroup: any) => (
              <Grid
                templateColumns="repeat(12, 1fr)"
                background="#EDF2F7"
                p="0.5rem 1rem"
                borderRadius={2}
                fontSize="0.9em"
                fontWeight={500}
                columnGap={2}
                marginBottom={2}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column: any) => (
                  <Grid
                    templateColumns="1fr auto"
                    gridColumnGap={2}
                    pr={2}
                    alignItems="center"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <Box>{column.render('Header')}</Box>
                    {column.isSorted && (
                      <Icon
                        size="18px"
                        name={column.isSortedDesc ? 'chevron-down' : 'chevron-up'}
                      />
                    )}
                  </Grid>
                ))}
              </Grid>
            ))}
          </Box>
          <Box fontSize="0.9em" {...getTableBodyProps()}>
            {rows.map((row: Row<PipelineEntry>) => {
              prepareRow(row);
              return (
                <PseudoBox
                  display="grid"
                  gridTemplateColumns="repeat(12, 1fr)"
                  gridColumnGap={2}
                  background="white"
                  alignItems="center"
                  p="0.5rem 1rem"
                  borderRadius={2}
                  fontSize="0.9em"
                  borderLeft="4px solid transparent"
                  transition="all 200ms ease-out"
                  cursor="pointer"
                  mb={2}
                  onClick={() => navigate(`/pipeline/e/${row.original.id}`)}
                  _hover={{
                    borderLeftColor: 'purple.400',
                  }}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => {
                    return <Box {...cell.getCellProps()}>{cell.render('Cell')}</Box>;
                  })}
                </PseudoBox>
              );
            })}
          </Box>
          <Box>
            {footerGroups.map((group) => (
              <Grid
                templateColumns="repeat(12, 1fr)"
                background="#EDF2F7"
                p="0.5rem 1rem"
                borderRadius={2}
                fontSize="0.9em"
                fontWeight={500}
                columnGap={2}
                {...group.getFooterGroupProps()}
              >
                {group.headers.map((column) => (
                  <Text {...column.getFooterProps()}>{column.render('Footer')}</Text>
                ))}
              </Grid>
            ))}
          </Box>
        </Box>
      </Skeleton>
    </>
  );
};

export default PostList;
