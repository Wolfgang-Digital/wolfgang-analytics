import React from 'react';
import { Box, Grid, Icon, Text, IconProps } from '@chakra-ui/core';

interface Props {
  icon: IconProps['name'];
  text: string;
}

const IconLabel: React.FC<Props> = ({ icon, text }) => (
  <Grid templateColumns="24px 1fr" alignItems="center">
    <Icon name={icon} mr="auto" color="gray.500" />
    <Text>{text}</Text>
  </Grid>
);

interface CustomProps {
  icon: IconProps['as']
  text: string
}

export const CustomIconLabel: React.FC<CustomProps> = ({ icon, text }) => (
  <Grid templateColumns="24px 1fr" alignItems="center">
    <Box as={icon} mr="auto" mt="1px" color="gray.500" />
    <Text>{text}</Text>
  </Grid>
);

export default IconLabel;
