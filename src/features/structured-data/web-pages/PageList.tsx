import React from 'react';
import { Box, Flex, Text, Stack, Link, Tooltip, IconButton, useToast } from '@chakra-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { useLinkHandler } from 'hooks/useLinkHandler';
import ButtonLink from 'components/ButtonLink';
import Message from 'components/Message';
import { getSelectedClient } from '../clients/slice';
import { getVisiblePageSnippets } from '../selectors';
import { deleteWebPage } from './slice';

const PageList: React.FC = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const handleLinkClick = useLinkHandler();

  const client = useSelector(getSelectedClient);
  const pages = useSelector(getVisiblePageSnippets);

  const handleEdit = (uuid: string) => {
    handleLinkClick(`/structured-data/pages/${uuid}`);
  };

  const handleDelete = (uuid: string) => {
    dispatch(deleteWebPage(uuid));
    toast({
      description: 'Page deleted',
      status: 'success',
      position: 'bottom-left'
    });
  };

  return (
    <Box>
      <Flex justify="space-between" align="center">
        <Text>
          {client?.name || 'Client'}'s pages: {pages.length}
        </Text>
        <ButtonLink
          text="Create Page"
          linkProps={{
            to: '/structured-data/create-page'
          }}
          buttonProps={{
            size: 'sm',
            variant: 'outline',
            variantColor: 'teal'
          }}
        />
      </Flex>
      <Stack mt={5} maxH="calc(100vh - 272px)" overflowY="auto">
        {pages.length > 0 ? (
          pages.map(({ uuid, name, mainEntityType, url }) => (
            <Flex key={uuid} padding={2} background="white" borderRadius={2}>
              <Box>
                <Text fontWeight={500}>{name}</Text>
                <Text
                  fontSize="14px"
                  lineHeight={1}
                  color={mainEntityType ? 'gray.700' : 'orange.500'}
                >
                  {mainEntityType || 'Main entity not set'}
                </Text>
                <Link href={url} isExternal color="#718096" fontSize="14px">
                  {url}
                </Link>
              </Box>
              <Stack isInline margin="auto 4px auto auto">
                <Tooltip label="View schema" aria-label="View schema" placement="top" hasArrow>
                  <IconButton
                    icon="arrow-up-down"
                    transform="rotate(90deg)"
                    size="xs"
                    aria-label="View schema"
                    mr={2}
                    onClick={() => handleLinkClick(`/structured-data/pages/${uuid}/schema`)}
                    variantColor="purple"
                  />
                </Tooltip>
                <Tooltip label="Edit web page" aria-label="Edit web page" placement="top" hasArrow>
                  <IconButton
                    icon="edit"
                    size="xs"
                    aria-label="Edit web page"
                    mr={2}
                    onClick={() => handleEdit(uuid)}
                    variantColor="blue"
                  />
                </Tooltip>
                <Tooltip
                  label="Delete web page"
                  aria-label="Edit web page"
                  placement="top"
                  hasArrow
                >
                  <IconButton
                    icon="delete"
                    size="xs"
                    aria-label="Delete web page"
                    onClick={() => handleDelete(uuid)}
                    variantColor="red"
                  />
                </Tooltip>
              </Stack>
            </Flex>
          ))
        ) : (
          <Message
            message={`You do not have any pages for ${client?.name ||
              'this client'} yet. Click create page to get started`}
          />
        )}
      </Stack>
    </Box>
  );
};

export default PageList;
