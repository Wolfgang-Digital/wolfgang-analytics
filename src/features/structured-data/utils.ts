// Functions to format state into Google's structued data shape
import { omit, pickBy, identity } from 'lodash';

import { OpeningHoursSpecification, Organisation, LocalBusiness, FAQ, Entity, HowTo } from './types';

const transformOpeningHours = (openingHours?: OpeningHoursSpecification[]) => {
  if (!openingHours) return undefined;
  return openingHours.map(spec => ({
    ...spec,
    dayOfWeek: spec.dayOfWeek.map(({ value }) => value)
  }));
};

const transformFaq = (faq: FAQ['mainEntity']) => {
  if (!faq) return undefined;
  return faq.map(({ name, acceptedAnswer }) => ({
    '@type': 'Question',
    name,
    acceptedAnswer: {
      '@type': 'Answer',
      text: acceptedAnswer
    }
  }));
};

export const transformClient = (client: Organisation) => {
  const result = {
    '@id': `${client.url.replace(/\/$/, '')}/#organisation`,
    '@type': client.type.replace(' ', ''),
    image: client.logo,
    ...pickBy(omit(client, ['uuid', 'type']), val => {
      return typeof val === 'object'
        ? Object.keys(pickBy(val, identity)).length > 0
        : true;
    })
  };

  switch (client.type) {
    case 'Organization':
      return result;

    case 'Local Business':
      return {
        ...result,
        openingHoursSpecification: transformOpeningHours((client as LocalBusiness).openingHoursSpecification)
      };

    case 'Hotel':
      return {
        ...result,
        openingHoursSpecification: transformOpeningHours((client as LocalBusiness).openingHoursSpecification)
      };

    default:
      throw new Error(`Invalid client type: ${client.type}`);
  }
};

export const transformHowTo = (howTo: HowTo) => {
  const formattedHowTo = !!howTo.hasVideo
    ? {
      ...omit(howTo, ['uuid', 'type', 'pageId', 'clientId', 'video', 'hasVideo', 'step']),
      video: {
        ...howTo.video,
        '@type': 'VideoObject'
      },
      step: howTo.step.map(step => ({
        ...omit(step, '_clipData'),
        startOffset: ''
      }))
    }
    : {
      ...omit(howTo, ['uuid', 'type', 'pageId', 'clientId', 'video', 'hasVideo', 'step']),
      step: howTo.step.map(step => omit(step, '_clipData'))
    };
    return formattedHowTo;
};

export const transformEntity = (entity: Entity, pageUrl: string) => {
  if (!entity) return undefined;

  const result = {
    '@id': `${pageUrl}/#mainentity`,
    '@type': `${entity.type.replace(/\s/, '')}`,
    mainEntityOfPage: {
      '@id': `${pageUrl}/#webpage`
    },
    ...omit(entity, ['uuid', 'type', 'pageId', 'clientId', 'video', 'hasVideo'])
  };

  switch (entity.type) {
    case 'FAQ Page':
      return {
        ...result,
        mainEntity: transformFaq((entity as FAQ).mainEntity)
      };

    case 'Service':
      return omit(result, 'hasRating');

    case 'How To':
      return {
        ...result,
        ...transformHowTo(entity as HowTo)
      };

    default:
      throw new Error(`Unrecognised entity type: ${entity.type}`);
  }
};