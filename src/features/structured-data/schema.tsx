import React from 'react';
import { Field } from 'react-hook-form-generator';
import { Icon } from '@chakra-ui/core';

import ReactSelectField from 'components/ReactSelectField';
import HiddenField from 'components/HiddenField';

export const openingHoursSpecification: Field = {
  type: 'array',
  label: 'Opening Hours',
  isCollapsable: true,
  itemField: {
    type: 'object',
    styles: {
      objectContainer: {
        spacing: 0,
        border: 0,
        padding: 0,
        margin: '2px 0 0 0',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        gridColumnGap: '1rem'
      },
      propertyContainer: {
        width: '100%'
      }
    },
    properties: {
      dayOfWeek: {
        type: 'custom',
        component: ReactSelectField as any,
        props: {
          label: 'Day of the Week',
          options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => ({ label: day, value: day })),
          isMulti: true,
          isRequired: true,
          labelProps: {
            fontSize: '0.85rem'
          }
        }
      },
      opens: {
        type: 'text',
        label: 'Opening Time',
        isRequired: true,
        leftInputAddon: {
          children: <Icon name="time" />
        },
        styles: {
          label: {
            fontSize: '0.85rem'
          },
          input: {
            isFullWidth: true
          }
        }
      },
      closes: {
        type: 'text',
        label: 'Closing Time',
        isRequired: true,
        leftInputAddon: {
          children: <Icon name="time" />
        },
        styles: {
          control: {
            width: '100%'
          },
          label: {
            fontSize: '0.85rem'
          },
          input: {
            isFullWidth: true
          }
        }
      }
    }
  }
};

export const postalAddress: Field = {
  type: 'object',
  label: 'Postal Address',
  isCollapsable: true,
  properties: {
    streetAddress: {
      type: 'text',
      label: 'Street Address'
    },
    addressLocality: {
      type: 'text',
      label: 'Locality'
    },
    addressCountry: {
      type: 'text',
      label: 'Country'
    },
    postalCode: {
      type: 'text',
      label: 'Postal Code'
    },
    '@type': {
      type: 'custom',
      component: HiddenField as any,
      props: {
        value: 'Postal Address'
      }
    }
  }
};

export const geoCoordinates: Field = {
  type: 'object',
  label: 'Geo Coordinates',
  isCollapsable: true,
  properties: {
    latitude: {
      type: 'number',
      label: 'Latutide'
    },
    longitude: {
      type: 'number',
      label: 'Longitude'
    }
  }
};