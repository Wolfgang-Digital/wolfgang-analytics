import React from 'react';
import { Schema } from 'react-hook-form-generator';
import { Box, Icon } from '@chakra-ui/core';
import { MdEuroSymbol } from 'react-icons/md';

import { openingHoursSpecification, postalAddress, geoCoordinates, sameAs } from '../schema';
import HiddenField from 'components/HiddenField';

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

const howTo: Schema = {
  name: {
    type: 'text',
    label: 'Name',
    isRequired: true
  },
  description: {
    type: 'textArea',
    label: 'Description'
  },
  supply: {
    type: 'array',
    label: 'Required Materials',
    isCollapsable: true,
    itemField: {
      type: 'text',
      placeholder: 'Material',
      isRequired: true,
      styles: {
        control: {
          marginTop: 1
        },
        input: {
          size: 'sm'
        }
      }
    }
  },
  tool: {
    type: 'array',
    label: 'Required Tools',
    isCollapsable: true,
    itemField: {
      type: 'text',
      placeholder: 'Tool',
      isRequired: true,
      styles: {
        control: {
          marginTop: 1
        },
        input: {
          size: 'sm'
        }
      }
    }
  },
  estimatedCost: {
    type: 'text',
    label: 'Estimated Cost',
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
  },
  totalTime: {
    type: 'text',
    label: 'Total Time',
    helperText: 'https://en.wikipedia.org/wiki/ISO_8601#Durations',
    leftInputAddon: {
      children: <Icon name="time" color="gray.500" />,
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
  step: {
    type: 'array',
    label: 'Steps',
    isCollapsable: true,
    itemField: {
      type: 'object',
      properties: {
        '@type': {
          type: 'custom',
          component: HiddenField as any,
          props: {
            value: 'HowToStep'
          }
        },
        name: {
          type: 'text',
          label: 'Name',
          isRequired: true,
          styles: {
            control: {
              mt: '-18px'
            },
            input: {
              size: 'sm'
            }
          }
        },
        image: {
          type: 'text',
          label: 'Image URL',
          leftInputAddon: {
            children: <Icon name="link" color="gray.500" />,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0
          },
          styles: {
            inputGroup: {
              size: 'sm'
            },
            input: {
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0
            }
          }
        },
        text: {
          type: 'textArea',
          label: 'Directions',
          isRequired: true
        }
      }
    }
  }
};

export const generateSchema = (type: string): Schema => {
  switch (type) {
    case 'FAQ Page':
      return faq;

    case 'Service':
      return service;

    case 'Tourist Attraction':
      return touristAttraction;

    case 'How To':
      return howTo;

    default:
      throw new Error(`Invalid entity type: "${type}"`);
  }
};