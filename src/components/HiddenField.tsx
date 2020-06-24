import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@chakra-ui/core';

interface Props {
  name: string;
  value: string;
}

const HiddenField: React.FC<Props> = ({ name, value }) => {
  const { register } = useFormContext();

  return <Input name={name} defaultValue={value} ref={register} visibility="hidden" height={0} margin={0} />;
};

export default HiddenField;
