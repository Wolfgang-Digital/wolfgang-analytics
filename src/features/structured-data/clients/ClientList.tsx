import React from 'react';
import {
  Stack,
  Text,
  Box,
  Flex,
  Image,
  Link,
  IconButton,
  Tooltip,
  Heading,
  useColorMode,
  useToast,
  PseudoBox
} from '@chakra-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { useLinkHandler } from 'hooks/useLinkHandler';
import Message from 'components/Message';
import ButtonLink from 'components/ButtonLink';
import { getClientList, deleteClient, getFilter, setSelectedId, getSelectedId } from './slice';
import ClientFilter from './ClientFilter';

const ClientList: React.FC = () => {
  const toast = useToast();

  const { colorMode } = useColorMode();
  const bgColour = { light: 'white', dark: '#011627' };

  const dispatch = useDispatch();

  const clients = useSelector(getClientList);
  const filter = useSelector(getFilter);
  const selectedId = useSelector(getSelectedId);

  const handleLinkClick = useLinkHandler();

  const handleDelete = (uuid: string) => (e: React.MouseEvent<any, MouseEvent>) => {
    e.stopPropagation();
    dispatch(deleteClient(uuid));
    toast({
      description: 'Client deleted',
      status: 'success',
      position: 'bottom-left'
    });
  };

  const handleView = (uuid: string) => (e: React.MouseEvent<any, MouseEvent>) => {
    e.stopPropagation();
    dispatch(setSelectedId(uuid));
  };

  const handleEdit = (uuid: string) => (e: React.MouseEvent<any, MouseEvent>) => {
    e.stopPropagation();
    handleLinkClick(`/structured-data/clients/${uuid}`);
  };

  return (
    <Box>
      <Flex gridColumn="1 / span 2" justify="space-between" mb={6}>
        <Heading as="h3" size="lg" alignSelf="flex-end">
          Clients
        </Heading>
        <ButtonLink
          text="Create Client"
          linkProps={{
            to: '/structured-data/create-client'
          }}
          buttonProps={{
            size: 'sm',
            variant: 'outline',
            variantColor: 'teal'
          }}
        />
      </Flex>
      {filter.length > 0 || clients.length > 0 ? (
        <Box>
          <ClientFilter />
          <Stack mt={4} maxH="calc(100vh - 200px)" overflowY="auto">
            {clients.map(({ uuid, name, url: websiteUrl, logo: logoUrl }) => (
              <PseudoBox
                display="flex"
                key={uuid}
                padding={2}
                background={bgColour[colorMode]}
                borderRadius={2}
                borderLeft={uuid === selectedId ? '4px solid #805AD5' : '4px solid transparent'}
                transition="all 200ms ease-out"
                onClick={handleView(uuid)}
                cursor="pointer"
                _hover={{
                  borderColor: uuid === selectedId ? '#805AD5' : '#B794F4'
                }}
              >
                <Image
                  src={logoUrl}
                  size="42px"
                  objectFit="contain"
                  rounded="full"
                  border="1px solid #CBD5E0"
                  marginRight={4}
                  my="auto"
                />
                <Box>
                  <Text>{name}</Text>
                  <Link href={websiteUrl} isExternal color="#718096" fontSize="14px">
                    {websiteUrl}
                  </Link>
                </Box>
                <Stack isInline margin="auto 4px auto auto">
                  <Tooltip label="Edit client" aria-label="View client" placement="top" hasArrow>
                    <IconButton
                      icon="edit"
                      size="xs"
                      aria-label="Edit client"
                      mr={2}
                      onClick={handleEdit(uuid)}
                      variantColor="blue"
                    />
                  </Tooltip>
                  <Tooltip label="Delete client" aria-label="View client" placement="top" hasArrow>
                    <IconButton
                      icon="delete"
                      size="xs"
                      aria-label="Delete client"
                      onClick={handleDelete(uuid)}
                      variantColor="red"
                    />
                  </Tooltip>
                </Stack>
              </PseudoBox>
            ))}
          </Stack>
        </Box>
      ) : (
        <Message
          message="You do not have any clients yet. Click create client to get started"
          flexProps={{
            margin: 'auto'
          }}
        />
      )}
    </Box>
  );
};

export default ClientList;
