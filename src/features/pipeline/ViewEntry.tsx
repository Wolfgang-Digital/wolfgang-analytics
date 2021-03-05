import React, { useEffect } from 'react';
import { Box, Heading, Stack, Skeleton, Text, Badge, Grid } from '@chakra-ui/core';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';

import { EditableText, EditableSelect } from 'components/Editable';
import { fetchEntry, updateEntry, getCurrentEntry, getStatus } from './slice';
import { channels, sources } from './CreateEntry';

const clientTypes = [
  { label: 'New', value: true },
  { label: 'Existing', value: false },
];

const ViewEntry: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoading } = useSelector(getStatus);

  useEffect(() => {
    dispatch(fetchEntry(id));
  }, [id, dispatch]);

  const entry = useSelector(getCurrentEntry);

  const handleEditText = (value: string, name?: string) => {
    dispatch(updateEntry({ id, key: name || '', value }));
  };

  const handleEditCountry = (value: boolean) => {
    dispatch(updateEntry({ id, key: 'is_new', value }));
  };

  const handleEditChannels = (values: any) => {
    dispatch(
      updateEntry({
        id,
        key: 'channels',
        value: `{${values.map((v: any) => `${v.value}`).join(',')}}`,
      })
    );
  };

  return (
    <Box pb={6}>
      <Heading mb={6} size="lg">
        Edit Pipeline Entry
      </Heading>
      <Grid templateColumns="1fr 1fr" columnGap={4}>
        <Stack background="white" borderRadius={4} p={2}>
          <Box minHeight="52px">
            <Text fontSize="0.8em" fontWeight={500} color="gray.500">
              Company Name
            </Text>
            <Skeleton isLoaded={!isLoading}>
              <EditableText
                name="company_name"
                defaultValue={entry?.company_name}
                onSubmit={handleEditText}
              />
            </Skeleton>
          </Box>
          <Box minHeight="58px">
            <Text fontSize="0.8em" fontWeight={500} color="gray.500">
              Type
            </Text>
            <Skeleton isLoaded={!isLoading}>
              <EditableSelect
                options={clientTypes}
                onSubmit={handleEditCountry}
                component={() => (
                  <Badge variantColor={entry?.is_new ? 'teal' : undefined} m="4px auto auto 0">
                    {entry?.is_new ? 'New' : 'Existing'}
                  </Badge>
                )}
              />
            </Skeleton>
          </Box>
          <Box minHeight="52px">
            <Text fontSize="0.8em" fontWeight={500} color="gray.500">
              Country
            </Text>
            <Skeleton isLoaded={!isLoading}>
              <EditableText
                name="country"
                defaultValue={entry?.country}
                onSubmit={handleEditText}
              />
            </Skeleton>
          </Box>
          <Box minHeight="52px">
            <Text fontSize="0.8em" fontWeight={500} color="gray.500">
              Leads
            </Text>
            <Skeleton isLoaded={!isLoading}>
              <EditableText name="led_by" defaultValue={entry?.led_by} onSubmit={handleEditText} />
            </Skeleton>
          </Box>
          <Box minHeight="58px">
            <Text fontSize="0.8em" fontWeight={500} color="gray.500">
              Channels
            </Text>
            <Skeleton isLoaded={!isLoading}>
              <EditableSelect
                options={channels}
                onSubmit={handleEditChannels}
                component={() => <Text>{entry?.channels.join(' / ')}</Text>}
                isMulti
              />
            </Skeleton>
          </Box>
          <Box minHeight="58px">
            <Text fontSize="0.8em" fontWeight={500} color="gray.500">
              Source
            </Text>
            <Skeleton isLoaded={!isLoading}>
              <EditableSelect
                name="source"
                options={sources}
                onSubmit={handleEditText}
                defaultValue={entry?.source}
              />
            </Skeleton>
          </Box>
          <Box minHeight="52px">
            <Text fontSize="0.8em" fontWeight={500} color="gray.500">
              Source Comment
            </Text>
            <Skeleton isLoaded={!isLoading}>
              <EditableText
                name="source_comment"
                defaultValue={entry?.source_comment}
                onSubmit={handleEditText}
              />
            </Skeleton>
          </Box>
          <Box minHeight="52px">
            <Text fontSize="0.8em" fontWeight={500} color="gray.500">
              Lead Contact Date
            </Text>
            <Skeleton isLoaded={!isLoading}>
              <EditableText
                name="lead_contact_date"
                defaultValue={
                  entry?.lead_contact_date
                    ? format(new Date(entry?.lead_contact_date), 'yyyy-MM-dd')
                    : ''
                }
                onSubmit={handleEditText}
              />
            </Skeleton>
          </Box>
        </Stack>
      </Grid>
    </Box>
  );
};

export default ViewEntry;
