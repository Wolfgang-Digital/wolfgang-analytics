import React from 'react';
import { Icon } from '@chakra-ui/core';
import { Schema } from 'react-hook-form-generator';

import { sameAs } from '../schema';

export const webPage: Schema = {
  name: {
    type: 'text',
    label: 'Name',
    isRequired: true
  },
  url: {
    type: 'text',
    label: 'Web Page URL',
    isRequired: true,
    htmlInputType: 'url',
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
  sameAs,
  about: {
    type: 'array',
    label: 'About',
    isCollapsable: true,
    styles: {
      arrayContainer: {
        spacing: 2
      },
      toolbar: {
        marginBottom: 2
      }
    },
    itemField: {
      type: 'object',
      styles: {
        objectContainer: {
          spacing: 0,
          border: 0,
          padding: 0,
          margin: '2px 0 0 0',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridColumnGap: '1rem'
        },
        propertyContainer: {
          width: '100%'
        }
      },
      properties: {
        name: {
          type: 'text',
          placeholder: 'Name',
          isRequired: true,
          styles: {
            input: {
              mt: 1,
              size: 'sm',
              isFullWidth: true
            }
          }
        },
        url: {
          type: 'text',
          placeholder: 'URL',
          isRequired: true,
          leftInputAddon: {
            children: <Icon name="link" color="gray.500" />,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0
          },
          styles: {
            inputGroup: {
              size: 'sm',
              mt: 1
            },
            input: {
              isFullWidth: true,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0
            }
          }
        }
      }
    }
  }
};