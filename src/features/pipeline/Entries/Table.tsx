import React from 'react';
import { Box, Grid, Icon, PseudoBox, Text } from '@chakra-ui/core';
import { Row } from 'react-table';

import { PipelineEntry } from '../types';
import { usePipelineTable } from './hooks';

const Table: React.FC = () => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
  } = usePipelineTable();

  return (
    <Box pb={6} mt={4} overflowX="auto">
      <Box {...getTableProps()}>
        {headerGroups.map((headerGroup: any) => (
          <Grid
            templateColumns={`repeat(${headerGroup.headers.length}, 1fr)`}
            background="#EDF2F7"
            p="0.5rem 1rem"
            borderRadius={2}
            fontSize="0.8em"
            fontWeight={500}
            columnGap={4}
            marginBottom={2}
            minW="min-content"
            {...headerGroup.getHeaderGroupProps()}
          >
            {headerGroup.headers.map((column: any) => (
              <Grid
                templateColumns="1fr auto"
                gridColumnGap={2}
                pr={2}
                alignItems="center"
                minWidth="50px"
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                <Box>{column.render('Header')}</Box>
                {column.isSorted && (
                  <Icon size="18px" name={column.isSortedDesc ? 'chevron-down' : 'chevron-up'} />
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
              gridTemplateColumns={`repeat(${row.cells.length}, 1fr)`}
              gridColumnGap={4}
              background="white"
              alignItems="center"
              p="0.5rem 1rem"
              borderRadius={2}
              fontSize="0.9em"
              borderLeft="4px solid transparent"
              transition="all 200ms ease-out"
              cursor="pointer"
              mb={2}
              minW="min-content"
              //onClick={() => navigate(`/pipeline/e/${row.original.id}`)}
              _hover={{
                borderLeftColor: 'purple.400',
              }}
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => {
                return (
                  <Box minWidth="50px" {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </Box>
                );
              })}
            </PseudoBox>
          );
        })}
      </Box>
      <Box>
        {footerGroups.map((group) => (
          <Grid
            templateColumns={`repeat(${headerGroups[0].headers.length}, 1fr)`}
            background="#EDF2F7"
            p="0.5rem 1rem"
            borderRadius={2}
            fontSize="0.9em"
            fontWeight={500}
            columnGap={4}
            minWidth="min-content"
            {...group.getFooterGroupProps()}
          >
            {group.headers.map((column) => (
              <Text minWidth="50px" {...column.getFooterProps()}>
                {column.render('Footer')}
              </Text>
            ))}
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

export default Table;
