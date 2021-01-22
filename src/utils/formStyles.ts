import { FormStyles } from 'react-hook-form-generator';

export const formStyles: FormStyles = {
  form: {
    container: {
      padding: 0
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    submitButton: {
      variantColor: 'teal',
      minWidth: '120px'
    }
  },
  arrayField: {
    label: {
      fontWeight: 700
    },
    deleteButton: {
      variantColor: 'red'
    },
    clearButton: {
      variantColor: 'red'
    },
    addButton: {
      variantColor: 'blue'
    },
    collapseButton: {
      variantColor: 'purple'
    }
  },
  objectField: {
    label: {
      fontWeight: 700
    },
    collapseButton: {
      variantColor: 'purple'
    }
  }
};