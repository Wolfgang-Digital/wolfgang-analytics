import { createSelector } from '@reduxjs/toolkit';
import { sortBy } from 'lodash';

import { getSelectedId, getClients } from './clients/slice';
import { getWebPages } from './web-pages/slice';
import { getMainEntityList, getMainEntityOnPage } from './entities/slice';

export const getVisiblePageSnippets = createSelector(
  getSelectedId,
  getWebPages,
  getMainEntityList,
  (id, pages, entities) => {
    const clientPages = Object.values(pages)
      .filter(page => page.clientId === id)
      .map(page => {
        const mainEntity = entities.find(entity => entity.pageId === page.uuid);

        return {
          ...page,
          mainEntityId: mainEntity?.uuid,
          mainEntityType: mainEntity?.type
        };
      });

    return sortBy(clientPages, 'name');
  }
);

export const getSelectedSchema = (pageId: string) => createSelector(
  getClients,
  getWebPages,
  getMainEntityOnPage(pageId),
  (clients, pages, mainEntity) => {
    const page = pages[pageId];

    return {
      client: clients[page.clientId],
      webPage: page,
      mainEntity
    }
  }
);