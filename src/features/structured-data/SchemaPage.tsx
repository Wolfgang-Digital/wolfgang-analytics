import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Button } from '@chakra-ui/core';
import { Link, Redirect } from 'react-router-dom';

import { useSchema } from './hooks';

const BreadcrumbRouterLink = BreadcrumbLink as any;

const SchemaPage: React.FC = () => {
  const schema = useSchema();

  if (!schema.isValid) {
    return <Redirect to="/structured-data" />;
  }

  return (
    <Box>
      <Breadcrumb separator="-" mb={8} color="gray.500" textAlign="center">
        <BreadcrumbItem>
          <BreadcrumbRouterLink as={Link} to={`/structured-data/pages/${schema.pageId}`}>
            WEB PAGE
          </BreadcrumbRouterLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbRouterLink as={Link} to={`/structured-data/pages/${schema.pageId}/main-entity`}>
            MAIN ENTITY
          </BreadcrumbRouterLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage color="purple.600">
          <BreadcrumbLink href="#">SCHEMA</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex mb={6}>
        <form
          action="https://search.google.com/structured-data/testing-tool/u/0/"
          target="_blank"
          method="POST"
          style={{ display: 'inline', marginLeft: 'auto' }}
        >
          <textarea name="code" readOnly style={{ visibility: 'hidden', width: 0, height: 0 }} value={schema.graph} />
          <Button rightIcon="external-link" variantColor="teal" size="sm" type="submit">
            Testing Tool
          </Button>
        </form>
      </Flex>
      <SyntaxHighlighter language="json" style={docco}>
        {schema.graph}
      </SyntaxHighlighter>
    </Box>
  );
};

export default SchemaPage;
