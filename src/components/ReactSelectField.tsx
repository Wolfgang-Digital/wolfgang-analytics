import React from 'react';
import Select from 'react-select';
import { useFormContext, Controller } from 'react-hook-form';
import { FormControl, FormLabel } from '@chakra-ui/core';
import { FormLabelProps } from '@chakra-ui/core/dist/FormLabel';

import { SelectOption } from 'types';

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  options: SelectOption[];
  isRequired?: boolean;
  labelProps?: FormLabelProps;
  isMulti?: boolean;
}

const ReactSelectField: React.FC<Props> = ({
  name,
  label,
  placeholder,
  options,
  isRequired,
  labelProps,
  isMulti
}) => {
  const { control } = useFormContext();

  return (
    <FormControl isRequired={isRequired}>
      <FormLabel {...labelProps}>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        as={<Select placeholder={placeholder} options={options} isMulti={isMulti} />}
        onChange={([selected]) => {
          return selected;
        }}
      />
    </FormControl>
  );
};

export default ReactSelectField;
