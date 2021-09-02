import React from 'react';
import { Box, Icon } from '@chakra-ui/core';
import { FaRegUserCircle, FaRegFolderOpen } from 'react-icons/fa';
import { MdTrendingUp } from 'react-icons/md';
import { BsFileCode } from 'react-icons/bs';
import { IoMdPeople } from 'react-icons/io';

export const userMenuItems = [
  {
    label: 'My Profile',
    link: '/user/profile',
    icon: <Box as={FaRegUserCircle} />,
  },
  {
    label: 'Monthly Reviews',
    link: '/user/monthly-reviews',
    icon: <Icon name="calendar" />,
  },
  {
    label: 'Awarewolf',
    link: '/awarewolf',
    icon: <Icon name="chat" />,
  },
];

export const toolsMenuItems = [
  {
    label: 'Metric Forecasting',
    link: '/forecast',
    icon: <Box as={MdTrendingUp} size="20px" />,
  },
  {
    label: 'Schema Generator',
    link: '/structured-data',
    icon: <Box as={BsFileCode} size="20px" />,
  },
];

export const adminMenuItems = [
  {
    label: 'Pipeline',
    link: '/pipeline',
    icon: <Box as={FaRegFolderOpen} size="20px" />,
  },
  {
    label: 'Manage Users',
    link: '/users',
    icon: <Box as={IoMdPeople} size="22px" />,
  },
];
