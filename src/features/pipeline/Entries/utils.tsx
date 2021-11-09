import React, { useMemo } from 'react';
import { Cell } from 'react-table';
import { format, differenceInDays } from 'date-fns';
import { Badge, Link, Icon, Text } from '@chakra-ui/core';

import { formatCurrency, getFirstName, getDurationString } from 'utils/format';
import { PipelineEntry } from '../types';
import { getDuration, getOutcome } from '../utils';
import { Rating } from 'components/Rating';

export const formatDate = (str?: any) => {
  return str ? format(new Date(str), 'dd MMM yy') : '';
};

const sortBool = (a: any, b: any, id: any, desc: any) => {
  return a.original[id] && !b.original[id] ? -1 : !a.original[id] && b.original[id] ? 1 : 0;
};

const getColour = (channel: string, props: any) => {
  if (!props.value || !props.row.original.channel_data?.[channel]) return undefined;
  return props.row.original.channel_data[channel].outcome === 'Won'
    ? 'green.500'
    : props.row.original.channel_data[channel].outcome === 'Lost'
    ? 'red.500'
    : undefined;
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
    Header: 'Project',
    accessor: 'project_name',
  },
  {
    Header: 'Client Type',
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
  {
    Header: 'Pre-Qual Score',
    accessor: 'pre_qual_score',
    Cell: (props: any) => {
      if (props.row.original.is_new) return <Rating value={props.value} />;
      return <Text color="gray.500">N/A</Text>;
    },
  },
  { Header: 'Country', accessor: 'country' },
  {
    Header: 'Duration',
    accessor: 'channel_data',
    Cell: (props: Cell) => {
      const duration = getDuration(props.value);
      return (
        <Badge variantColor={duration === 'Ongoing' ? 'teal' : undefined} mr="auto">
          {duration.replace('Ongoing', 'Recurring')}
        </Badge>
      );
    },
  },
  {
    Header: 'Channels',
    accessor: 'channels',
    Cell: (props: Cell) => props.value.join(' / '),
  },
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
  },
  {
    Header: 'Outcome',
    accessor: 'outcome',
    Cell: (props: Cell) => {
      // @ts-ignore
      const outcome = getOutcome(props.row.original.channel_data);
      return (
        <Badge variantColor={getOutcomeColour(outcome)} mr="auto">
          {outcome}
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
    Header: 'Wolfgangers',
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
    Header: 'Proposal Doc',
    accessor: 'proposal_doc_link',
    Cell: (props: Cell) => {
      if (!props.value) return '';
      return (
        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <Link
            href={props.value}
            isExternal
            onClick={(e: any) => e.stopPropagation()}
            display="flex"
            alignItems="center"
          >
            {props.value
              .match(/^(?:\/\/|[^/]+)*/gi)[0]
              .replace(/(https:\/\/|http:\/\/|\.\w+$|www\.)/, '')}{' '}
            <Icon name="external-link" ml={1} />
          </Link>
        </div>
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
    Cell: (props: Cell) => (props.value ? `${props.value}%` : '-'),
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
    Cell: (props: Cell<PipelineEntry>) => {
      const { date_closed } = props.row.original;
      const lastDay = date_closed ? new Date(date_closed) : new Date();
      const numDays = differenceInDays(lastDay, new Date(props.value));
      return getDurationString(numDays);
    },
  },
];

export const moneyColumns = [
  { Header: 'Company', accessor: 'company_name' },
  {
    Header: 'PPC 12M Value',
    accessor: 'ppc_12mv',
    Cell: (props: Cell) => (
      <Text as="span" fontWeight={500} color={getColour('PPC', props)}>
        {formatCurrency(props.value, '-')}
      </Text>
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
    Header: 'SEO 12M Value',
    accessor: 'seo_12mv',
    Cell: (props: Cell) => (
      <Text as="span" fontWeight={500} color={getColour('SEO', props)}>
        {formatCurrency(props.value, '-')}
      </Text>
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
    Header: 'Content 12M Value',
    accessor: 'content_12mv',
    Cell: (props: Cell) => (
      <Text as="span" fontWeight={500} color={getColour('Content', props)}>
        {formatCurrency(props.value, '-')}
      </Text>
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
    Header: 'Email 12M Value',
    accessor: 'email_12mv',
    Cell: (props: Cell) => (
      <Text as="span" fontWeight={500} color={getColour('Email', props)}>
        {formatCurrency(props.value, '-')}
      </Text>
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
    Header: 'Social 12M Value',
    accessor: 'social_12mv',
    Cell: (props: Cell) => (
      <Text as="span" fontWeight={500} color={getColour('Social', props)}>
        {formatCurrency(props.value, '-')}
      </Text>
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
    Header: 'Creative 12M Value',
    accessor: 'creative_12mv',
    Cell: (props: Cell) => (
      <Text as="span" fontWeight={500} color={getColour('Creative', props)}>
        {formatCurrency(props.value, '-')}
      </Text>
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
    Header: 'CRO 12M Value',
    accessor: 'cro_12mv',
    Cell: (props: Cell) => (
      <Text as="span" fontWeight={500} color={getColour('CRO', props)}>
        {formatCurrency(props.value, '-')}
      </Text>
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
    Header: 'Analytics 12M Value',
    accessor: 'analytics_12mv',
    Cell: (props: Cell) => (
      <Text as="span" fontWeight={500} color={getColour('Analytics', props)}>
        {formatCurrency(props.value, '-')}
      </Text>
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
    Header: 'Total 12M Value',
    accessor: 'total_12mv',
    Cell: (props: Cell) => formatCurrency(props.value, '-'),
    Footer: (info: any) => {
      const total = useMemo(() => {
        return info.rows
          .reduce((sum: number, row: any) => (parseFloat(row.values.total_12mv) || 0) + sum, 0)
          .toString()
          .replace(/\.[0-9]+$/, '');
      }, [info.rows]);
      return formatCurrency(total);
    },
  },
];
