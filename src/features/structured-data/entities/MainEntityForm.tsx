import React, { useMemo } from 'react';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Text, useToast } from '@chakra-ui/core';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-hook-form-generator';
import { v4 } from 'uuid';

import { formStyles } from 'utils/formStyles';
import Card from 'components/Card';
import { Entity } from '../types';
import { getSelectedId } from '../clients/slice';
import { getMainEntityOnPage, createMainEntity, updateMainEntity } from './slice';
import { generateSchema } from './schema';

const BreadcrumbRouterLink = BreadcrumbLink as any;

interface Props {
  type: string;
}

const MainEntityForm: React.FC<Props> = ({ type }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { pageId } = useParams();

  const entity = useSelector(getMainEntityOnPage(pageId));
  const clientId = useSelector(getSelectedId);

  const schema = useMemo(() => {
    return generateSchema(type);
  }, [type]);

  const handleSubmit = (values: Entity) => {
    if (entity) {
      dispatch(updateMainEntity({ ...values, uuid: entity.uuid, type: entity.type }));
      toast({
        description: 'Main entity updated',
        status: 'success',
        position: 'bottom-left'
      });
    } else {
      const uuid = v4();
      dispatch(createMainEntity({ ...values, uuid, type, pageId, clientId }));
      toast({
        description: 'Main entity created',
        status: 'success',
        position: 'bottom-left'
      });
    }
  };

  return (
    <Box maxWidth="1080px" width="100%" margin="auto">
      <Breadcrumb separator="-" mb={8} color="gray.500" textAlign="center">
        <BreadcrumbItem>
          <BreadcrumbRouterLink as={Link} to={`/structured-data/pages/${pageId}`}>
            WEB PAGE
          </BreadcrumbRouterLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage color="purple.600">
          <BreadcrumbLink href="#">MAIN ENTITY</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbRouterLink isDisabled={!entity} as={Link} to={`/structured-data/pages/${pageId}/schema`}>
            SCHEMA
          </BreadcrumbRouterLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Heading size="lg" mb={6}>
        {entity ? 'Update main entity' : 'Create a new main entity'}
        <Text as="span" fontWeight={300}>
          {` - ${type}`}
        </Text>
      </Heading>
      <Card>
        <Form
          schema={schema}
          handleSubmit={handleSubmit}
          formOptions={{
            defaultValues: entity
          }}
          styles={formStyles}
          buttons={{
            submit: {
              text: entity ? 'Update Main Entity' : 'Create Main Entity'
            }
          }}
        />
      </Card>
    </Box>
  );
};

export default MainEntityForm;
