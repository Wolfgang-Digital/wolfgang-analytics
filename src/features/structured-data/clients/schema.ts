import { Schema } from 'react-hook-form-generator';

import { openingHoursSpecification, postalAddress, geoCoordinates } from '../schema';

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
    isRequired: true
  },
  description: {
    type: 'textArea',
    label: 'Description'
  },
  logo: {
    type: 'text',
    label: 'Logo URL',
    isRequired: true
  }
};

export const getSchema = (type: string) => {
  switch (type) {
    case 'Organization':
      return base;

    case 'Local Business':
      return {
        ...base,
        openingHoursSpecification,
        address: postalAddress,
        geoCoordinates
      };

    default:
      throw new Error(`Invalid schema type: "${type}"`);
  }
};
