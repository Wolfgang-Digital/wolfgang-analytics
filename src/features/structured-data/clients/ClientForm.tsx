import React, { useMemo } from 'react';
import { Form, Schema } from 'react-hook-form-generator';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { Box, Heading, Text, Flex, Image, useToast } from '@chakra-ui/core';

import { formStyles } from 'utils/formStyles';
import Card from 'components/Card';
import { Organisation } from '../types';
import { getSchema } from './schema';
import { getClients, createClient, updateClient } from './slice';

interface Props {
  type: string;
}

const ClientForm: React.FC<Props> = ({ type }) => {
  const toast = useToast();
  const history = useHistory();
  const dispatch = useDispatch();

  const { clientId } = useParams();
  const clients = useSelector(getClients);

  const isExistingClient = clientId && clients[clientId];
  const defaultValues: Organisation | undefined = clients[clientId];

  const schema = useMemo(() => {
    return getSchema(isExistingClient ? defaultValues.type : type);
  }, [type, isExistingClient, defaultValues]);

  const handleSubmit = (values: Organisation) => {
    if (isExistingClient) {
      dispatch(updateClient({ ...values, uuid: defaultValues.uuid }));
      toast({
        description: 'Client updated',
        status: 'success',
        position: 'bottom-left',
        variant: 'left-accent'
      });
    } else {
      const uuid = v4();
      dispatch(createClient({ ...values, uuid, type }));
      toast({
        description: 'Client created',
        status: 'success',
        position: 'bottom-left',
        variant: 'left-accent'
      });
      history.push(`/structured-data/clients/${uuid}`);
    }
  };

  if (!isExistingClient && clientId) {
    return <Redirect to="/structured-data/create-client" />;
  }

  return (
    <Box>
      <Flex mb={6} justifyContent="space-between" alignItems="center">
        <Heading size="lg">
          {isExistingClient ? defaultValues.name : 'Create a new client'}
          {isExistingClient && (
            <Text as="span" fontWeight={300}>
              {' '}
              - Edit
            </Text>
          )}
        </Heading>
        {isExistingClient && (
          <Image
            src={defaultValues.logo}
            size="50px"
            rounded="full"
            objectFit="contain"
            border="1px solid #CBD5E0"
          />
        )}
      </Flex>
      <Card>
        <Form
          schema={schema as Schema}
          styles={formStyles}
          handleSubmit={handleSubmit}
          formOptions={{
            defaultValues
          }}
          buttons={{
            submit: {
              text: isExistingClient ? 'Update Client' : 'Create Client'
            }
          }}
        />
      </Card>
    </Box>
  );
};

export default ClientForm;
