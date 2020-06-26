import { Schema } from 'react-hook-form-generator';

const faq: Schema = {
  mainEntity: {
    type: 'array',
    label: 'Questions',
    isCollapsable: true,
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

export const generateSchema = (type: string): Schema => {
  switch (type) {
    case 'FAQ Page':
      return faq;

    default:
      throw new Error(`Invalid entity type: "${type}"`);
  }
};