import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { omit } from 'lodash';

import { getSelectedSchema } from './selectors';

export const useSchema = () => {
  const { pageId } = useParams();
  const schema = useSelector(getSelectedSchema(pageId));

  const clientId = schema.client?.uuid;

  return useMemo(() => {
    let graph = {};

    try {
      graph = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@id': clientId,
            '@type': schema.client?.type.replace(' ', ''),
            ...omit(schema.client, ['uuid', 'type'])
          },
          {
            '@id': pageId,
            '@type': schema.webPage?.type.replace(' ', ''),
            ...omit(schema.webPage, ['uuid', 'type'])
          }
        ]
      };
    } catch (e) {
      console.warn(e);
    }

    return {
      isValid: !!pageId && !!clientId,
      clientId,
      pageId,
      graph: `<script type="application/ld+json">${JSON.stringify(graph, null, 2)}</script>`
    };
  }, [pageId, clientId, schema]);
};