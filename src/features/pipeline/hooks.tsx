import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTable, useSortBy, Column } from 'react-table';
import { format } from 'date-fns';
import { Badge } from '@chakra-ui/core';

import { formatCurrency } from 'utils/format';
import { getEntries, PipelineEntry } from './slice';

const formatDate = (str?: string) => {
  return str ? format(new Date(str), 'dd MMM yy') : '';
};

export const useEntryTable = () => {
  const entries = useSelector(getEntries);

  const columns: Column<PipelineEntry>[] = useMemo(() => {
    return [
      { Header: 'Date', accessor: 'created_at', Cell: (props: any) => formatDate(props.value) },
      { Header: 'Company', accessor: 'company_name' },
      {
        Header: 'Type',
        accessor: 'is_new',
        Cell: (props: any) => {
          return (
            <Badge variantColor={props.value ? 'teal' : undefined} mr="auto">
              {props.value ? 'New' : 'Existing'}
            </Badge>
          );
        },
        sortType: (a: any, b: any, id: any, desc: any) => {
          return a.original[id] && !b.original[id] ? -1 : !a.original[id] && b.original[id] ? 1 : 0;
        }
      },
      { Header: 'Country', accessor: 'country' },
      { Header: 'Leads', accessor: 'led_by' },
      { Header: 'Channels', accessor: 'channels', Cell: (props: any) => props.value.join(' / ') },
      { Header: 'Source', accessor: 'source' },
      {
        Header: 'Contacted',
        accessor: 'lead_contact_date',
        Cell: (props: any) => formatDate(props.value),
      },
      {
        Header: 'SEO FMV',
        accessor: 'seo_fmv',
        Footer: (info: any) => {
          const total = useMemo(() => {
            return info.rows.reduce((sum: number, row: any) => row.values.seo_fmv + sum, 0);
          }, [info.rows]);
          return formatCurrency(total);
        },
        Cell: (props: any) => formatCurrency(props.value),
      },
      {
        Header: 'PPC FMV',
        accessor: 'ppc_fmv',
        Footer: (info: any) => {
          const total = useMemo(() => {
            return info.rows.reduce((sum: number, row: any) => row.values.ppc_fmv + sum, 0);
          }, [info.rows]);
          return formatCurrency(total);
        },
        Cell: (props: any) => formatCurrency(props.value),
      },
      {
        Header: '12M Value',
        accessor: 'twelve_month_value',
        Footer: (info: any) => {
          const total = useMemo(() => {
            return info.rows.reduce(
              (sum: number, row: any) => row.values.twelve_month_value + sum,
              0
            );
          }, [info.rows]);
          return formatCurrency(total);
        },
        Cell: (props: any) => formatCurrency(props.value),
      },
      { Header: 'Updated', accessor: 'updated_at', Cell: (props: any) => formatDate(props.value) },
    ] as any;
  }, []);

  const table = useTable({ columns, data: entries }, useSortBy);
  return table;
};
