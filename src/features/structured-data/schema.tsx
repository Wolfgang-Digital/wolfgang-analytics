import React from 'react';
import { Field } from 'react-hook-form-generator';
import { Icon } from '@chakra-ui/core';

import ReactSelectField from 'components/ReactSelectField';

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
          options: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
          ].map(day => ({ label: day, value: day })),
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
          children: <Icon name="time" color="gray.500" />,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0
        },
        styles: {
          label: {
            fontSize: '0.85rem'
          },
          input: {
            isFullWidth: true,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
          }
        }
      },
      closes: {
        type: 'text',
        label: 'Closing Time',
        isRequired: true,
        leftInputAddon: {
          children: <Icon name="time" color="gray.500" />,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0
        },
        styles: {
          control: {
            width: '100%'
          },
          label: {
            fontSize: '0.85rem'
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

export const sameAs: Field = {
  type: 'array',
  label: 'Same As',
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
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
      }
    }
  }
};

export const aggregateRating: Field = {
  type: 'object',
  label: 'Aggregate Rating',
  isCollapsable: true,
  shouldDisplay: data => {
    return !!data.hasRating;
  },
  properties: {
    ratingValue: {
      type: 'number',
      label: 'Rating Value',
      isRequired: true
    },
    ratingCount: {
      type: 'number',
      label: 'Rating Count',
      isRequired: true
    },
    bestRating: {
      type: 'number',
      label: 'Best Rating',
      isRequired: true
    }
  },
  styles: {
    objectContainer: {
      isInline: true,
      backgroundColor: '#F7FAFC',
      padding: 2,
      borderRadius: 4,
      border: '1px solid rgb(226, 232, 240)',
      mt: 2
    },
    propertyContainer: {
      flexGrow: 1
    }
  }
};

export const videoObject: Field = {
  type: 'object',
  label: 'Video',
  isCollapsable: true,
  properties: {
    name: {
      type: 'text',
      label: 'Video Name'
    },
    description: {
      type: 'textArea',
      label: 'Video Description'
    },
    duration: {
      type: 'text',
      label: 'Duration',
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
    dateUploaded: {
      type: 'text',
      label: 'Date Uploaded',
      leftInputAddon: {
        children: <Icon name="calendar" color="gray.500" />,
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
    thumbnailUrls: {
      type: 'array',
      label: 'Thumbnail URLs',
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
        type: 'text',
        placeholder: 'URL',
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
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
          }
        }
      }
    },
    contentUrl: {
      type: 'text',
      label: 'Content URL',
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
    embedUrl: {
      type: 'text',
      label: 'Embed URL',
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
    }
  }
};
