import React from 'react';
import { Box } from '@chakra-ui/core';
import { Form } from 'react-hook-form-generator';

import { formStyles } from 'utils/formStyles';

const initialValues = {
  heading: 'Congratulations',
  recipient: 'RECIPIENT NAME',
  content: [
    { value: 'You are now a Wolfgang Reforester.' },
    { value: `1 tree will be planted on your behalf at 52°54'15.2"N 6°24'35.0"W, in Co Wicklow.` },
    { value: 'This native Irish Tree was gifted to you by <GIFTER NAME>.' },
  ],
};

interface Props {
  handleSubmit: (data: Record<string, any>) => void;
}

export const CertForm: React.FC<Props> = ({ handleSubmit }) => {
  return (
    <Box border="1px solid rgba(0, 0, 0, 0.15)" borderRadius={4} p={4} background="white">
      <Form
        schema={{
          heading: {
            label: 'Heading Text',
            type: 'text',
            helperText: 'Text to appear above the recipient\'s name.'
          },
          recipient: {
            label: "Recipient's Name",
            type: 'text',
            helperText: 'This field will be generated automatically when uploading a CSV.',
            shouldDisplay: vals => {
              return true;
            }
          },
          content: {
            label: 'Content Text',
            type: 'array',
            helperText: 'Lines of text to appear under the recipient\'s name.',
            itemField: {
              type: 'text',
              isRequired: true,
            },
          },
        }}
        styles={formStyles}
        formOptions={{
          defaultValues: initialValues,
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
