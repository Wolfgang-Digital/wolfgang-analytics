import React from 'react';
import { Box } from '@chakra-ui/core';
import { Form } from 'react-hook-form-generator';

import { formStyles } from 'utils/formStyles';

interface Props {
  formKey: string
  template: Record<string, any>
  handleSubmit: (data: Record<string, any>) => void;
}

export const CertForm: React.FC<Props> = ({ formKey, template, handleSubmit }) => {
  return (
    <Box
      border="1px solid rgba(0, 0, 0, 0.15)"
      borderRadius={4}
      p={4}
      background="white"
      mb="auto"
      mt={4}
      key={formKey}
    >
      <Form
        schema={{
          heading: {
            label: 'Heading Text',
            type: 'text',
            helperText: "Text to appear above the recipient's name.",
          },
          recipient: {
            label: "Recipient's Name",
            type: 'text',
          },
          content: {
            label: 'Content Text',
            type: 'array',
            helperText: "Lines of text to appear under the recipient's name.",
            itemField: {
              type: 'text',
            },
          },
          marginTop: {
            label: 'Margin Top',
            type: 'number',
            helperText:
              'The amount of space to add at the top. Negative numbers will raise the text.',
          },
        }}
        styles={formStyles}
        formOptions={{
          defaultValues: template,
        }}
        handleSubmit={handleSubmit}
        buttons={{
          reset: { hidden: true },
          submit: { text: 'Generate Preview' },
        }}
      />
    </Box>
  );
};
