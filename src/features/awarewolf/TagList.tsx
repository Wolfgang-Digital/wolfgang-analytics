import React, { useMemo } from 'react';
import { Stack, Text, Box, Tag as CTag, TagLabel, TagCloseButton, BoxProps } from '@chakra-ui/core';

const colours = ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'purple', 'pink'];

interface TagProps {
  tag: string;
  randomise?: boolean;
  index: number;
  handleDelete?: (tag: string) => void;
}

const Tag: React.FC<TagProps> = ({ tag, randomise, index, handleDelete }) => {
  const colour = useMemo(() => {
    return tag !== 'None'
      ? randomise
        ? colours[Math.round(Math.random() * (colours.length - 1))]
        : colours[index % colours.length]
      : undefined;
  }, [index, randomise, tag]);

  return (
    <CTag rounded="full" size="sm" variantColor={colour}>
      <TagLabel>{tag}</TagLabel>
      {handleDelete && tag !== 'None' ? <TagCloseButton onClick={() => handleDelete(tag)} /> : null}
    </CTag>
  );
};

interface TagListProps {
  tags?: string;
  hideLabel?: boolean;
  randomise?: boolean;
  handleDelete?: (tag: string) => void;
  boxProps?: BoxProps;
}

const TagList: React.FC<TagListProps> = ({
  tags,
  hideLabel,
  randomise = true,
  handleDelete,
  boxProps,
}) => {
  const tagList = tags && tags.length > 0 ? tags.split(',') : ['None'];

  return tagList.length > 0 ? (
    <Stack isInline pr={4} alignItems="center" {...boxProps}>
      {!hideLabel && (
        <Text fontSize="0.75rem" color="gray.500" fontWeight={500}>
          Tags:
        </Text>
      )}
      {tagList.map((tag, i) => (
        <Box key={i}>
          <Tag randomise={randomise} tag={tag} index={i} handleDelete={handleDelete} />
        </Box>
      ))}
    </Stack>
  ) : null;
};

export default TagList;
