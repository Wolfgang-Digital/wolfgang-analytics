import React, { useMemo } from 'react';
import { Cell } from 'react-table';
import { format } from 'date-fns';
import { Badge } from '@chakra-ui/core';

import { formatCurrency } from 'utils/format';

export const formatDate = (str?: any) => {
  return str ? format(new Date(str), 'dd MMM yy') : '';
};

const sortBool = (a: any, b: any, id: any, desc: any) => {
  return a.original[id] && !b.original[id] ? -1 : !a.original[id] && b.original[id] ? 1 : 0;
};

export const getOutcomeColour = (outcome?: string) => {
  return outcome?.match(/(win|won)/gi)
    ? 'teal'
    : outcome?.match(/(lost|lose|loss)/gi)
    ? 'red'
    : 'orange';
};

export const enquiryColumns = [
  {
    Header: 'Date',
    accessor: 'date_added',
    Cell: (props: Cell) => formatDate(props.value),
  },
  { Header: 'Company', accessor: 'company_name' },
  {
    Header: 'Type',
    accessor: 'is_new',
    Cell: (props: Cell) => {
      return (
        <Badge variantColor={props.value ? 'teal' : undefined} mr="auto">
          {props.value ? 'New' : 'Existing'}
        </Badge>
      );
    },
    sortType: sortBool,
  },
  { Header: 'Country', accessor: 'country' },
  {
    Header: 'Duration',
    accessor: 'is_ongoing',
    Cell: (props: Cell) => {
      return (
        <Badge variantColor={props.value ? 'teal' : undefined} mr="auto">
          {props.value ? 'Ongoing' : 'Once Off'}
        </Badge>
      );
    },
    sortType: sortBool,
  },
  { Header: 'Scope', accessor: 'scope' },
  {
    Header: 'Channels',
    accessor: 'channels',
    Cell: (props: Cell) => props.value.join(' / '),
  },
  { Header: 'Source', accessor: 'source' },
  { Header: 'Leads', accessor: 'leads' },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: (props: Cell) => {
      return (
        <Badge variantColor={props.value === 'Open' ? 'teal' : 'red'} mr="auto">
          {props.value}
        </Badge>
      );
    },
    sortType: sortBool,
  },
  {
    Header: 'Outcome',
    accessor: 'outcome',
    Cell: (props: Cell) => {
      return (
        <Badge variantColor={getOutcomeColour(props.value)} mr="auto">
          {props.value || 'Pending'}
        </Badge>
      );
    },
  },
  {
    Header: 'Updated',
    accessor: 'last_updated',
    Cell: (props: Cell) => formatDate(props.value),
  },
];

export const propsalColumns = [
  { Header: 'Company', accessor: 'company_name' },
  { Header: 'Details & Progress Update', accessor: 'details' },
  {
    Header: 'Date Contacted',
    accessor: 'date_contacted',
    Cell: (props: Cell) => formatDate(props.value),
  },
  {
    Header: 'Proposal Issue Date',
    accessor: 'proposal_issue_date',
    Cell: (props: Cell) => formatDate(props.value),
  },
  {
    Header: 'Meeting Date',
    accessor: 'meeting_date',
    Cell: (props: Cell) => formatDate(props.value),
  },
  {
    Header: 'Follow Up Dates',
    accessor: 'follow_up_dates',
    Cell: (props: Cell) => props.value?.map(formatDate).join(', ') || '',
  },
  {
    Header: 'Chance to Win',
    accessor: 'success_probability',
    Cell: (props: Cell) => (props.value ? `${props.value}%` : ''),
  },
  { Header: 'COVID-19 Impact', accessor: 'covid_impact' },
  { Header: 'Reason if Lost', accessor: 'loss_reason' },
  { Header: 'Reason if Won', accessor: 'win_reason' },
  {
    Header: 'Date Closed',
    accessor: 'date_closed',
    Cell: (props: Cell) => formatDate(props.value),
  },
];

export const moneyColumns = [
  { Header: 'Company', accessor: 'company_name' },
  {
    Header: 'PPC FmV',
    accessor: 'ppc_fmv',
    Cell: (props: Cell) => formatCurrency(props.value),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce((sum: number, row: any) => parseFloat(row.values.ppc_fmv) + sum, 0);
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'SEO FmV',
    accessor: 'seo_fmv',
    Cell: (props: Cell) => formatCurrency(props.value),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce((sum: number, row: any) => parseFloat(row.values.seo_fmv) + sum, 0);
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'Content FmV',
    accessor: 'content_fmv',
    Cell: (props: Cell) => formatCurrency(props.value),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => parseFloat(row.values.content_fmv) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'Email FmV',
    accessor: 'email_fmv',
    Cell: (props: Cell) => formatCurrency(props.value),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => parseFloat(row.values.email_fmv) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'Social FmV',
    accessor: 'social_fmv',
    Cell: (props: Cell) => formatCurrency(props.value),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => parseFloat(row.values.social_fmv) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'Creative FmV',
    accessor: 'creative_fmv',
    Cell: (props: Cell) => formatCurrency(props.value),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => parseFloat(row.values.creative_fmv) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'CRO FmV',
    accessor: 'cro_fmv',
    Cell: (props: Cell) => formatCurrency(props.value),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce((sum: number, row: any) => parseFloat(row.values.cro_fmv) + sum, 0);
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'Analytics FmV',
    accessor: 'analytics_fmv',
    Cell: (props: Cell) => formatCurrency(props.value),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => parseFloat(row.values.analytics_fmv) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'Total FmV',
    accessor: 'total_fmv',
    Cell: (props: Cell) => formatCurrency(props.value),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => parseFloat(row.values.total_fmv) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'PPC 12mV',
    accessor: 'ppc_12mv',
    Cell: (props: Cell) => formatCurrency(props.value),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => parseFloat(row.values.ppc_12mv) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'SEO 12mV',
    accessor: 'seo_12mv',
    Cell: (props: Cell) => formatCurrency(props.value),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => parseFloat(row.values.seo_12mv) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'Content 12mV',
    accessor: 'content_12mv',
    Cell: (props: Cell) => formatCurrency(props.value),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => parseFloat(row.values.content_12mv) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'Email 12mV',
    accessor: 'email_12mv',
    Cell: (props: Cell) => formatCurrency(props.value),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => parseFloat(row.values.email_12mv) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'Social 12mV',
    accessor: 'social_12mv',
    Cell: (props: Cell) => formatCurrency(props.value),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => parseFloat(row.values.social_12mv) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'Creative 12mV',
    accessor: 'creative_12mv',
    Cell: (props: Cell) => formatCurrency(props.value),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => parseFloat(row.values.creative_12mv) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'CRO 12mV',
    accessor: 'cro_12mv',
    Cell: (props: Cell) => formatCurrency(props.value),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => parseFloat(row.values.cro_12mv) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'Analytics 12mV',
    accessor: 'analytics_12mv',
    Cell: (props: Cell) => formatCurrency(props.value),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => parseFloat(row.values.analytics_12mv) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'Total 12mV',
    accessor: 'total_12mv',
    Cell: (props: Cell) => formatCurrency(props.value),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => parseFloat(row.values.total_12mv) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
];
