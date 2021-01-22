import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Button,
  useClipboard,
  useToast,
  Code
} from '@chakra-ui/core';
import { Link } from 'react-router-dom';

import { useSchema } from './hooks';
import TypeBadges from './TypeBadges';

const BreadcrumbRouterLink = BreadcrumbLink as any;

const SchemaPage: React.FC = () => {
  const toast = useToast();
  const schema = useSchema();
  const { onCopy } = useClipboard(schema.graph);
  
  const handleCopy = () => {
    onCopy?.();
    toast({
      variant: 'left-accent',
      description: 'Copied to clipboard',
      status: 'success',
      position: 'bottom-left'
    });
  };

  if (!schema.isValid) {
    //return <Redirect to="/structured-data" />;
  }

  return (
    <Box maxWidth="1080px" width="100%" margin="auto" mb={4}>
      <Breadcrumb separator="-" mb={8} color="gray.500" textAlign="center">
        <BreadcrumbItem>
          <BreadcrumbRouterLink as={Link} to={`/structured-data/pages/${schema.pageId}`}>
            WEB PAGE
          </BreadcrumbRouterLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbRouterLink
            as={Link}
            to={`/structured-data/pages/${schema.pageId}/main-entity`}
          >
            MAIN ENTITY
          </BreadcrumbRouterLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage color="purple.600">
          <BreadcrumbLink href="#">SCHEMA</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex mb={4} align="flex-end">
        <TypeBadges graph={schema.graph?.['@graph']} />
        <Button
          rightIcon="copy"
          variantColor="teal"
          size="sm"
          lineHeight={1.4}
          letterSpacing={0.5}
          onClick={handleCopy}
          ml="auto"
          mr={2}
        >
          Copy
        </Button>
        <form
          action="https://search.google.com/structured-data/testing-tool/u/0/"
          target="_blank"
          method="POST"
          style={{ display: 'inline' }}
        >
          <textarea
            name="code"
            readOnly
            style={{ visibility: 'hidden', width: 0, height: 0 }}
            value={schema.graphString}
          />
          <Button
            rightIcon="external-link"
            variantColor="teal"
            size="sm"
            type="submit"
            lineHeight={1.4}
            letterSpacing={0.5}
          >
            Test
          </Button>
        </form>
      </Flex>
      <Code p={2} width="100%">
        <SyntaxHighlighter language="json" style={docco}>
          {schema.graphString || 'Preview unavailable'}
        </SyntaxHighlighter>
      </Code>
    </Box>
  );
};

export default SchemaPage;
