import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { omit } from 'lodash';

import { getSelectedSchema } from './selectors';
// import { transformClient, transformEntity } from './utils';

export const useSchema = () => {
  const { pageId } = useParams();
  const schema = useSelector(getSelectedSchema(pageId));

  const clientId = schema.client?.uuid;

  return useMemo(() => {
    let graph = {
      '@context': 'https://schema.org',
      '@graph': [] as any[]
    };

    if (!schema.client) {
      return {
        isValid: false,
        clientId,
        pageId,
        graph: undefined
      };
    }

    try {
      const homepageUrl = schema.client.url.replace(/\/$/, '');
      const pageUrl = schema.webPage.url.replace(/\/$/, '');

      graph['@graph'].push(schema.client);

      graph['@graph'].push({
        '@id': `${homepageUrl}/#website`,
        '@type': 'WebSite',
        publisher: {
          '@id': `${homepageUrl}/#organisation`
        }
      });

      graph['@graph'].push({
        '@id': `${pageUrl}/#webpage`,
        '@type': 'WebPage',
        isPartOf: {
          '@id': `${homepageUrl}/#website`
        },
        ...omit(schema.webPage, ['uuid', 'type', 'clientId'])
      });

      if (schema.mainEntity) {
        const mainEntity = schema.mainEntity;
        graph['@graph'].push(mainEntity);
      }
    } catch (e) {
      console.error(e);
    }

    return {
      isValid: !!pageId && !!clientId,
      clientId,
      pageId,
      graph,
      graphString: `<script type="application/ld+json">${JSON.stringify(graph, null, 2)}</script>`
    };
  }, [pageId, clientId, schema]);
};