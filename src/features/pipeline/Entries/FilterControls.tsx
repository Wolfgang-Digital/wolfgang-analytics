import React, { useState } from 'react';
import {
  Popover,
  PopoverBody,
  PopoverContent,
  Button,
  PopoverTrigger,
  RadioGroup,
  Radio,
  PopoverHeader,
} from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Select from 'react-select';

import { addFilter } from '../slice';
import { channels, sources } from '../utils';
import { formatDate } from './utils';

interface FilterProps {
  isOpen: boolean;
  column: string;
  close: () => void;
}

const channelOptions = channels.map((channel) => ({ label: channel, value: channel }));

const sourceOptions = sources.map((source) => ({ label: source, value: source }));

export const ChannelFilter: React.FC<FilterProps> = ({ isOpen, column, close }) => {
  const dispatch = useDispatch();
  const [channels, setChannels] = useState<typeof channelOptions>();

  const handleSubmit = () => {
    if (channels && channels.length > 0) {
      dispatch(
        addFilter({
          column,
          operator: 'contains',
          value: channels.map((channel) => channel.value).join(','),
        })
      );
      close();
    }
  };

  return (
    <Popover placement="auto" isOpen={isOpen}>
      <PopoverTrigger>
        <div style={{ visibility: 'hidden', width: '100%', height: '100%' }}></div>
      </PopoverTrigger>
      <PopoverContent
        zIndex={100}
        _focus={{ outline: 'none' }}
        position="absolute"
        border={0}
        minWidth={350}
      >
        <PopoverHeader textAlign="center" fontWeight={700} color="gray.600">
          {column}
        </PopoverHeader>
        <PopoverBody onClick={(e) => e.stopPropagation()}>
          <Select
            value={channels}
            onChange={(selected: any) => setChannels(selected)}
            options={channelOptions}
            isMulti
          />
          <Button
            size="sm"
            isFullWidth
            variantColor="blue"
            variant="ghost"
            fontWeight={400}
            onClick={handleSubmit}
            mt={2}
          >
            Apply Filter
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export const SourceFilter: React.FC<FilterProps> = ({ isOpen, column, close }) => {
  const dispatch = useDispatch();
  const [source, setSource] = useState<typeof sourceOptions[number]>();

  const handleSubmit = () => {
    if (source) {
      dispatch(
        addFilter({
          column,
          operator: 'is',
          value: source.value,
        })
      );
      close();
    }
  };

  return (
    <Popover placement="auto" isOpen={isOpen}>
      <PopoverTrigger>
        <div style={{ visibility: 'hidden', width: '100%', height: '100%' }}></div>
      </PopoverTrigger>
      <PopoverContent
        zIndex={100}
        _focus={{ outline: 'none' }}
        position="absolute"
        border={0}
        minWidth={350}
      >
        <PopoverHeader textAlign="center" fontWeight={700} color="gray.600">
          {column}
        </PopoverHeader>
        <PopoverBody onClick={(e) => e.stopPropagation()}>
          <Select
            value={source}
            onChange={(selected: any) => setSource(selected)}
            options={sourceOptions}
          />
          <Button
            size="sm"
            isFullWidth
            variantColor="blue"
            variant="ghost"
            fontWeight={400}
            onClick={handleSubmit}
            mt={2}
          >
            Apply Filter
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export const DateFilter: React.FC<FilterProps> = ({ isOpen, column, close }) => {
  const dispatch = useDispatch();
  const [start, setStart] = useState<any>(new Date());
  const [end, setEnd] = useState<any>(new Date());

  const handleChange = (range: any) => {
    setStart(range.range1.startDate);
    setEnd(range.range1.endDate);
  };

  const handleSubmit = () => {
    dispatch(
      addFilter({
        column,
        operator: 'between',
        value: `${formatDate(start)} and ${formatDate(end)}`,
      })
    );
    close();
  };

  return (
    <Popover placement="auto" isOpen={isOpen}>
      <PopoverTrigger>
        <div style={{ visibility: 'hidden', width: '100%', height: '100%' }}></div>
      </PopoverTrigger>
      <PopoverContent
        zIndex={100}
        _focus={{ outline: 'none' }}
        position="absolute"
        border={0}
        minWidth={350}
      >
        <PopoverHeader textAlign="center" fontWeight={700} color="gray.600">
          {column}
        </PopoverHeader>
        <PopoverBody onClick={(e) => e.stopPropagation()}>
          <DateRange
            ranges={[
              {
                startDate: start,
                endDate: end,
              },
            ]}
            onChange={handleChange}
          />
          <Button
            size="sm"
            isFullWidth
            variantColor="blue"
            variant="ghost"
            fontWeight={400}
            onClick={handleSubmit}
          >
            Apply Filter
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export const TypeFilter: React.FC<FilterProps> = ({ column, isOpen, close }) => {
  const [type, setType] = useState('New');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(
      addFilter({
        column,
        operator: 'is',
        value: type,
      })
    );
    close();
  };

  return (
    <Popover placement="auto" isOpen={isOpen}>
      <PopoverTrigger>
        <div style={{ visibility: 'hidden', width: '100%', height: '100%' }}></div>
      </PopoverTrigger>
      <PopoverContent zIndex={100} _focus={{ outline: 'none' }} position="absolute" border={0}>
        <PopoverHeader textAlign="center" fontWeight={700} color="gray.600">
          {column}
        </PopoverHeader>
        <PopoverBody onClick={(e) => e.stopPropagation()}>
          <RadioGroup defaultValue={type} size="sm" onChange={(e, val) => setType(val as string)}>
            <Radio value="New">New</Radio>
            <Radio value="Existing">Existing</Radio>
          </RadioGroup>
          <Button
            size="sm"
            isFullWidth
            variantColor="blue"
            variant="ghost"
            fontWeight={400}
            onClick={handleSubmit}
            mt={2}
          >
            Apply Filter
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export const DurationFilter: React.FC<FilterProps> = ({ column, isOpen, close }) => {
  const [duration, setDuration] = useState('Once Off');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(
      addFilter({
        column,
        operator: 'is',
        value: duration,
      })
    );
    close();
  };

  return (
    <Popover placement="auto" isOpen={isOpen}>
      <PopoverTrigger>
        <div style={{ visibility: 'hidden', width: '100%', height: '100%' }}></div>
      </PopoverTrigger>
      <PopoverContent zIndex={100} _focus={{ outline: 'none' }} position="absolute" border={0}>
        <PopoverHeader textAlign="center" fontWeight={700} color="gray.600">
          {column}
        </PopoverHeader>
        <PopoverBody onClick={(e) => e.stopPropagation()}>
          <RadioGroup
            defaultValue={duration}
            size="sm"
            onChange={(e, val) => setDuration(val as string)}
          >
            <Radio value="Once Off">Once Off</Radio>
            <Radio value="Ongoing">Ongoing</Radio>
          </RadioGroup>
          <Button
            size="sm"
            isFullWidth
            variantColor="blue"
            variant="ghost"
            fontWeight={400}
            onClick={handleSubmit}
            mt={2}
          >
            Apply Filter
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export const getControls = (column: string) => {
  if (column.toLowerCase().includes('date')) {
    return DateFilter;
  } else {
    switch (column) {
      case 'Type':
        return TypeFilter;

      case 'Channels':
        return ChannelFilter;

      case 'Ongoing':
        return DurationFilter;

      case 'Source':
        return SourceFilter;

      default:
        return null;
    }
  }
};
