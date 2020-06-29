import React from 'react';
import { Schema, Field } from 'react-hook-form-generator';
import { Icon, Box } from '@chakra-ui/core';
import { MdEuroSymbol } from 'react-icons/md';

import { openingHoursSpecification, postalAddress, geoCoordinates, sameAs } from '../schema';

const base: Schema = {
  name: {
    type: 'text',
    label: 'Name',
    isRequired: true
  },
  url: {
    type: 'text',
    label: 'Website URL',
    htmlInputType: 'url',
    isRequired: true,
    leftInputAddon: {
      children: <Icon name="link" color="gray.500" />,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    },
    styles: {
      input: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
      }
    }
  },
  description: {
    type: 'textArea',
    label: 'Description'
  },
  logo: {
    type: 'text',
    label: 'Logo URL',
    isRequired: true,
    leftInputAddon: {
      children: <Icon name="link" color="gray.500" />,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    },
    styles: {
      input: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
      }
    }
  },
  sameAs
};

const priceRange: Field = {
  type: 'text',
  label: 'Price Range',
  leftInputAddon: {
    children: <Box as={MdEuroSymbol} color="gray.500" />,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  styles: {
    input: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    }
  }
};

const telephone: Field = {
  type: 'text',
  label: 'Phone Number',
  htmlInputType: 'tel',
  leftInputAddon: {
    children: <Icon name="phone" color="gray.500" />,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  styles: {
    input: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    }
  }
};

export const getSchema = (type: string) => {
  switch (type) {
    case 'Organization':
      return base;

    case 'Local Business':
      return {
        ...base,
        telephone,
        priceRange,
        address: postalAddress,
        openingHoursSpecification,
        geoCoordinates
      };

    case 'Hotel':
      return {
        ...base,
        telephone,
        priceRange,
        address: postalAddress,
        openingHoursSpecification,
        geoCoordinates
      };

    default:
      throw new Error(`Invalid schema type: "${type}"`);
  }
};
