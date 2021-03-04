import React, { useState, useRef } from 'react';
import { ButtonGroup, IconButton, Flex, Text, Input, Grid, BoxProps } from '@chakra-ui/core';
import Select from 'react-select';

interface ControlProps {
  isEditing?: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  onRequestEdit: () => void;
}

const EditableControls: React.FC<ControlProps> = ({
  isEditing,
  onSubmit,
  onCancel,
  onRequestEdit,
}) => {
  return isEditing ? (
    <ButtonGroup
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      variant="outline"
      size="xs"
    >
      <IconButton icon="check" aria-label="submit" variantColor="teal" onClick={onSubmit} />
      <IconButton icon="close" aria-label="cancel" variantColor="red" onClick={onCancel} />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="flex-start" alignItems="center">
      <IconButton size="xs" icon="edit" aria-label="edit" onClick={onRequestEdit} />
    </Flex>
  );
};

interface TextProps {
  defaultValue?: string;
  onSubmit: (value: string) => void;
  onCancel?: () => void;
  component?: any;
}

export const EditableText: React.FC<TextProps> = ({ defaultValue, onSubmit, onCancel }) => {
  const [isEditiing, setIsEditing] = useState(false);
  const ref: any = useRef();

  const handleSubmit = () => {
    onSubmit(ref.current?.value || defaultValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setIsEditing(false);
  };

  return (
    <Grid templateColumns="1fr auto" columnGap={2}>
      {isEditiing ? (
        <Input defaultValue={defaultValue} ref={ref as any} size="sm" />
      ) : (
        <Text>{defaultValue}</Text>
      )}
      <EditableControls
        isEditing={isEditiing}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onRequestEdit={() => setIsEditing(true)}
      />
    </Grid>
  );
};

interface SelectProps extends TextProps {
  options: {
    label: string;
    value: any;
  }[];
  onSubmit: (value: any) => void;
  textProps?: BoxProps;
}

export const EditableSelect: React.FC<SelectProps> = ({
  defaultValue,
  onSubmit,
  onCancel,
  options,
  component,
  textProps,
}) => {
  const [isEditiing, setIsEditing] = useState(false);
  const [value, setValue] = useState<any>(undefined);

  const handleSubmit = () => {
    onSubmit(value.value);
    setIsEditing(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setIsEditing(false);
  };

  const DisplayComponent = component ? component : () => <Text {...textProps}>{defaultValue}</Text>;

  return (
    <Grid templateColumns="1fr auto" columnGap={2}>
      {isEditiing ? (
        <Select
          value={value}
          defaultValue={defaultValue ? { label: defaultValue, value: defaultValue } : undefined}
          options={options}
          onChange={(e: any) => setValue(e)}
        />
      ) : (
        <DisplayComponent />
      )}
      <EditableControls
        isEditing={isEditiing}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onRequestEdit={() => setIsEditing(true)}
      />
    </Grid>
  );
};
