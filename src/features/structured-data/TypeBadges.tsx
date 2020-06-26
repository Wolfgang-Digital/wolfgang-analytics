import React from 'react';
import { Stack, Badge, Box, Text } from '@chakra-ui/core';

interface Props {
  graph?: any[];
}

const colours: Record<string, string> = {
  localbusiness: 'purple',
  website: 'blue',
  webpage: 'blue',
  faqpage: 'orange'
};

const TypeBadges: React.FC<Props> = ({ graph }) => {
  if (!graph || !Array.isArray(graph)) return null;

  return (
    <Box>
      <Text as="span" color="gray.500" fontSize="14px">Entities</Text>
      <Stack isInline marginTop="auto">
        {graph
          .filter(entity => typeof entity === 'object' && !!entity['@type'])
          .map((entity, i) => (
            <Badge
              key={i}
              variant="subtle"
              px={3}
              py={1}
              borderRadius="32px"
              variantColor={colours[entity['@type'].toLowerCase()]}
            >
              {entity['@type']}
            </Badge>
          ))}
      </Stack>
    </Box>
  );
};

export default TypeBadges;
