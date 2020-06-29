import { Schema } from 'react-hook-form-generator';

import { openingHoursSpecification, postalAddress, geoCoordinates, sameAs } from '../schema';

const faq: Schema = {
  mainEntity: {
    type: 'array',
    label: 'Questions',
    isCollapsable: true,
    isRequired: true,
    itemField: {
      type: 'object',
      properties: {
        name: {
          type: 'text',
          label: 'Question',
          isRequired: true
        },
        acceptedAnswer: {
          type: 'textArea',
          label: 'Answer',
          isRequired: true
        }
      }
    }
  }
};

const service: Schema = {
  name: {
    type: 'text',
    label: 'Name',
    isRequired: true
  },
  description: {
    type: 'textArea',
    label: 'Description'
  }
};

const touristAttraction: Schema = {
  name: {
    type: 'text',
    label: 'Name',
    isRequired: true
  },
  sameAs,
  address: postalAddress,
  geoCoordinates,
  openingHoursSpecification
};

export const generateSchema = (type: string): Schema => {
  switch (type) {
    case 'FAQ Page':
      return faq;

    case 'Service':
      return service;

    case 'Tourist Attraction':
      return touristAttraction;

    default:
      throw new Error(`Invalid entity type: "${type}"`);
  }
};