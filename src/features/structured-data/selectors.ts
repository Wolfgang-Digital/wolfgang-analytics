import { createSelector } from '@reduxjs/toolkit';
import { sortBy } from 'lodash';

import { getSelectedId, getSelectedClient } from './clients/slice';
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
  getSelectedClient,
  getWebPages,
  getMainEntityOnPage(pageId),
  (client, pages, mainEntity) => {
    return {
      client,
      webPage: pages[pageId],
      mainEntity
    }
  }
);