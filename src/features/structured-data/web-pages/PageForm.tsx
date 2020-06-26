import React from 'react';
import { Form } from 'react-hook-form-generator';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { Link, useParams, Redirect, useHistory } from 'react-router-dom';
import { Box, Heading, Text, Flex, Image, useToast, Breadcrumb, BreadcrumbLink, BreadcrumbItem } from '@chakra-ui/core';

import { formStyles } from 'utils/formStyles';
import Card from 'components/Card';
import { WebPage } from '../types';
import { getMainEntityOnPage } from '../entities/slice';
import { getSelectedClient } from '../clients/slice';
import { webPage } from './schema';
import { createWebPage, updateWebPage, getWebPages } from './slice';

const BreadcrumbRouterLink = BreadcrumbLink as any;

const PageForm: React.FC = () => {
  const toast = useToast();
  const history = useHistory();
  const dispatch = useDispatch();

  const client = useSelector(getSelectedClient);
  const pages = useSelector(getWebPages);
  const { pageId } = useParams();

  const isExistingPage = pageId && pages[pageId];
  const defaultValues: WebPage | undefined = pages[pageId];

  const mainEntity = useSelector(getMainEntityOnPage(pageId));

  if (!client) {
    return <Redirect to="/structured-data" />;
  }

  const handleSubmit = (values: WebPage) => {
    if (isExistingPage) {
      dispatch(updateWebPage({ ...values, uuid: defaultValues.uuid, clientId: client.uuid }));
      toast({
        description: 'Page updated',
        status: 'success',
        position: 'bottom-left'
      });
    } else {
      const uuid = v4();
      dispatch(createWebPage({ ...values, uuid, type: 'Web Page', clientId: client.uuid }));
      toast({
        description: 'Page created',
        status: 'success',
        position: 'bottom-left'
      });
      history.push(`/structured-data/pages/${uuid}/main-entity`);
    }
  };

  return (
    <Box maxWidth="1080px" width="100%" margin="auto" mb={4}>
      {isExistingPage && (
        <Breadcrumb separator="-" mb={6} color="gray.500" textAlign="center">
          <BreadcrumbItem isCurrentPage color="purple.600">
            <BreadcrumbLink href="#">WEB PAGE</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbRouterLink as={Link} to={`/structured-data/pages/${defaultValues.uuid}/main-entity`}>
              MAIN ENTITY
            </BreadcrumbRouterLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbRouterLink isDisabled={!mainEntity} as={Link} to={`/structured-data/pages/${pageId}/schema`}>
              SCHEMA
            </BreadcrumbRouterLink>
          </BreadcrumbItem>
        </Breadcrumb>
      )}
      <Flex mb={6} justifyContent="space-between" alignItems="center">
        <Heading size="lg">
          {isExistingPage ? defaultValues.name : 'Create a new web page'}
          <Text as="span" fontWeight={300}>
            {` - ${client.name}`}
          </Text>
        </Heading>
        <Image src={client?.logo} size="50px" rounded="full" objectFit="contain" border="1px solid #CBD5E0" />
      </Flex>
      <Card>
        <Form
          schema={webPage}
          handleSubmit={handleSubmit}
          styles={formStyles}
          formOptions={{
            defaultValues
          }}
          buttons={{
            submit: {
              text: isExistingPage ? 'Update Page' : 'Next'
            }
          }}
        />
      </Card>
    </Box>
  );
};

export default PageForm;
