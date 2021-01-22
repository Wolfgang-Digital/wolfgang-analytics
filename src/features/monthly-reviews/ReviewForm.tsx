import React, { useMemo } from 'react';
import { Form, Schema } from 'react-hook-form-generator';
import { cloneDeep } from 'lodash';

import { formStyles } from 'utils/formStyles';
import { ReviewTemplate } from './types';

const schema: Schema = {
  pillars: {
    type: 'array',
    label: 'Pillars',
    isCollapsable: true,
    itemField: {
      type: 'object',
      properties: {
        name: {
          type: 'text',
          label: 'Pillar Name',
          isRequired: true,
        },
        action: {
          type: 'textArea',
          label: 'Action',
        },
        behaviour: {
          type: 'textArea',
          label: 'Behaviour',
        },
      },
    },
  },
  metrics: {
    type: 'array',
    label: 'Commercial Metrics',
    isCollapsable: true,
    itemField: {
      type: 'text',
      label: 'Metric Name',
      isRequired: true,
    },
  },
  questions: {
    type: 'array',
    label: 'Employee Questions',
    isCollapsable: true,
    itemField: {
      type: 'object',
      properties: {
        section: {
          type: 'text',
          label: 'Section',
          isRequired: true,
        },
        questions: {
          type: 'array',
          isCollapsable: true,
          itemField: {
            type: 'text',
            label: 'Question Text',
            isRequired: true,
          },
        },
      },
    },
  },
};

interface Props {
  handleSubmit: (data: ReviewTemplate) => void
  defaultValues?: any
}

const ReviewForm: React.FC<Props> = ({ handleSubmit, defaultValues }) => {
  // Prevents react-hook-form from mutating state when adding IDs to array items
  const values = useMemo(() => {
    return cloneDeep(defaultValues);
  }, [defaultValues]);

  return (
    <Form
      schema={schema}
      handleSubmit={handleSubmit}
      styles={formStyles}
      formOptions={{ defaultValues: values }}
      buttons={{
        submit: {
          text: 'Next',
        },
      }}
    />
  );
};

export default ReviewForm;
