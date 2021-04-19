import React, { useMemo } from 'react';
import { Cell } from 'react-table';
import { format, differenceInDays } from 'date-fns';
import { Badge, Tooltip } from '@chakra-ui/core';

import { formatCurrency, getFirstName } from 'utils/format';

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
  {
    Header: 'Channels',
    accessor: 'channels',
    Cell: (props: Cell) => props.value.join(' / '),
  },
  { Header: 'Source', accessor: 'source' },
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
  {
    Header: 'Contact Email',
    accessor: 'contact_email',
    Cell: (props: Cell) => (
      <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {props.value || '-'}
      </div>
    ),
  },
  {
    Header: 'Proposal Leads',
    accessor: 'proposal_leads',
    Cell: (props: Cell) => {
      if (Array.isArray(props.value) && !!props.value[0]) {
        return props.value.map((user: any) => getFirstName(user.username)).join('/');
      }
      return (
        <Badge variantColor="orange" mr="auto">
          Not Set
        </Badge>
      );
    },
  },
  {
    Header: 'Details & Progress Update',
    accessor: 'details',
    Cell: (props: Cell) => props.value || '-',
  },
  {
    Header: 'Chance to Win',
    accessor: 'success_probability',
    Cell: (props: Cell) => (props.value ? `${props.value}%` : ''),
  },
  { Header: 'Reason if Lost', accessor: 'loss_reason', Cell: (props: Cell) => props.value || '-' },
  {
    Header: 'Date Closed',
    accessor: 'date_closed',
    Cell: (props: Cell) => (props.value ? formatDate(props.value) : '-'),
  },
  {
    Header: 'Time in Pipe',
    accessor: 'date_added',
    Cell: (props: Cell) => {
      const numDays = differenceInDays(new Date(), new Date(props.value));
      return `${numDays} days`;
    },
  },
];

export const moneyColumns = [
  { Header: 'Company', accessor: 'company_name' },
  {
    Header: 'PPC FmV',
    accessor: 'ppc_fmv',
    Cell: (props: Cell) => (
      <Tooltip
        label={props.column.Header?.toString()}
        aria-label={props.column.Header?.toString() || ''}
        showDelay={250}
        hasArrow
      >
        {formatCurrency(props.value, '-')}
      </Tooltip>
    ),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => (parseFloat(row.values.ppc_fmv) || 0) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'SEO FmV',
    accessor: 'seo_fmv',
    Cell: (props: Cell) => (
      <Tooltip
        label={props.column.Header?.toString()}
        aria-label={props.column.Header?.toString() || ''}
        showDelay={250}
        hasArrow
      >
        {formatCurrency(props.value, '-')}
      </Tooltip>
    ),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => (parseFloat(row.values.seo_fmv) || 0) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'Content FmV',
    accessor: 'content_fmv',
    Cell: (props: Cell) => (
      <Tooltip
        label={props.column.Header?.toString()}
        aria-label={props.column.Header?.toString() || ''}
        showDelay={250}
        hasArrow
      >
        {formatCurrency(props.value, '-')}
      </Tooltip>
    ),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => (parseFloat(row.values.content_fmv) || 0) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'Email FmV',
    accessor: 'email_fmv',
    Cell: (props: Cell) => (
      <Tooltip
        label={props.column.Header?.toString()}
        aria-label={props.column.Header?.toString() || ''}
        showDelay={250}
        hasArrow
      >
        {formatCurrency(props.value, '-')}
      </Tooltip>
    ),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => (parseFloat(row.values.email_fmv) || 0) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'Social FmV',
    accessor: 'social_fmv',
    Cell: (props: Cell) => (
      <Tooltip
        label={props.column.Header?.toString()}
        aria-label={props.column.Header?.toString() || ''}
        showDelay={250}
        hasArrow
      >
        {formatCurrency(props.value, '-')}
      </Tooltip>
    ),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => (parseFloat(row.values.social_fmv) || 0) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'Creative FmV',
    accessor: 'creative_fmv',
    Cell: (props: Cell) => (
      <Tooltip
        label={props.column.Header?.toString()}
        aria-label={props.column.Header?.toString() || ''}
        showDelay={250}
        hasArrow
      >
        {formatCurrency(props.value, '-')}
      </Tooltip>
    ),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => (parseFloat(row.values.creative_fmv) || 0) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'CRO FmV',
    accessor: 'cro_fmv',
    Cell: (props: Cell) => (
      <Tooltip
        label={props.column.Header?.toString()}
        aria-label={props.column.Header?.toString() || ''}
        showDelay={250}
        hasArrow
      >
        {formatCurrency(props.value, '-')}
      </Tooltip>
    ),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => (parseFloat(row.values.cro_fmv) || 0) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'Analytics FmV',
    accessor: 'analytics_fmv',
    Cell: (props: Cell) => (
      <Tooltip
        label={props.column.Header?.toString()}
        aria-label={props.column.Header?.toString() || ''}
        showDelay={250}
        hasArrow
      >
        {formatCurrency(props.value, '-')}
      </Tooltip>
    ),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => (parseFloat(row.values.analytics_fmv) || 0) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'Total FmV',
    accessor: 'total_fmv',
    Cell: (props: Cell) => (
      <Tooltip
        label={props.column.Header?.toString()}
        aria-label={props.column.Header?.toString() || ''}
        showDelay={250}
        hasArrow
      >
        {formatCurrency(props.value, '-')}
      </Tooltip>
    ),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => (parseFloat(row.values.total_fmv) || 0) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'PPC 12mV',
    accessor: 'ppc_12mv',
    Cell: (props: Cell) => (
      <Tooltip
        label={props.column.Header?.toString()}
        aria-label={props.column.Header?.toString() || ''}
        showDelay={250}
        hasArrow
      >
        {formatCurrency(props.value, '-')}
      </Tooltip>
    ),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => (parseFloat(row.values.ppc_12mv) || 0) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'SEO 12mV',
    accessor: 'seo_12mv',
    Cell: (props: Cell) => (
      <Tooltip
        label={props.column.Header?.toString()}
        aria-label={props.column.Header?.toString() || ''}
        showDelay={250}
        hasArrow
      >
        {formatCurrency(props.value, '-')}
      </Tooltip>
    ),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => (parseFloat(row.values.seo_12mv) || 0) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'Content 12mV',
    accessor: 'content_12mv',
    Cell: (props: Cell) => (
      <Tooltip
        label={props.column.Header?.toString()}
        aria-label={props.column.Header?.toString() || ''}
        showDelay={250}
        hasArrow
      >
        {formatCurrency(props.value, '-')}
      </Tooltip>
    ),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => (parseFloat(row.values.content_12mv) || 0) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'Email 12mV',
    accessor: 'email_12mv',
    Cell: (props: Cell) => (
      <Tooltip
        label={props.column.Header?.toString()}
        aria-label={props.column.Header?.toString() || ''}
        showDelay={250}
        hasArrow
      >
        {formatCurrency(props.value, '-')}
      </Tooltip>
    ),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => (parseFloat(row.values.email_12mv) || 0) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'Social 12mV',
    accessor: 'social_12mv',
    Cell: (props: Cell) => (
      <Tooltip
        label={props.column.Header?.toString()}
        aria-label={props.column.Header?.toString() || ''}
        showDelay={250}
        hasArrow
      >
        {formatCurrency(props.value, '-')}
      </Tooltip>
    ),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => (parseFloat(row.values.social_12mv) || 0) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'Creative 12mV',
    accessor: 'creative_12mv',
    Cell: (props: Cell) => (
      <Tooltip
        label={props.column.Header?.toString()}
        aria-label={props.column.Header?.toString() || ''}
        showDelay={250}
        hasArrow
      >
        {formatCurrency(props.value, '-')}
      </Tooltip>
    ),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => (parseFloat(row.values.creative_12mv) || 0) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'CRO 12mV',
    accessor: 'cro_12mv',
    Cell: (props: Cell) => (
      <Tooltip
        label={props.column.Header?.toString()}
        aria-label={props.column.Header?.toString() || ''}
        showDelay={250}
        hasArrow
      >
        {formatCurrency(props.value, '-')}
      </Tooltip>
    ),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => (parseFloat(row.values.cro_12mv) || 0) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'Analytics 12mV',
    accessor: 'analytics_12mv',
    Cell: (props: Cell) => (
      <Tooltip
        label={props.column.Header?.toString()}
        aria-label={props.column.Header?.toString() || ''}
        showDelay={250}
        hasArrow
      >
        {formatCurrency(props.value, '-')}
      </Tooltip>
    ),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => (parseFloat(row.values.analytics_12mv) || 0) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
  {
    Header: 'Total 12mV',
    accessor: 'total_12mv',
    Cell: (props: Cell) => (
      <Tooltip
        label={props.column.Header?.toString()}
        aria-label={props.column.Header?.toString() || ''}
        showDelay={250}
        hasArrow
      >
        {formatCurrency(props.value, '-')}
      </Tooltip>
    ),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows.reduce(
          (sum: number, row: any) => (parseFloat(row.values.total_12mv) || 0) + sum,
          0
        );
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
];
