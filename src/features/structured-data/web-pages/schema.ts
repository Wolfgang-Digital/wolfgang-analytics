import { Schema } from 'react-hook-form-generator';

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
    htmlInputType: 'url'
  },
  description: {
    type: 'textArea',
    label: 'Description'
  },
  sameAs: {
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
      styles: {
        input: {
          mt: 1,
          size: 'sm'
        }
      }
    }
  },
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
          styles: {
            input: {
              mt: 1,
              size: 'sm',
              isFullWidth: true
            }
          }
        }
      }
    }
  }
};