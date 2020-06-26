import { SelectOption } from 'types';

export interface Organisation {
  readonly uuid: string
  protected type: string
  name: string
  url: string
  description?: string
  logo: string
}

export interface WebPage {
  readonly uuid: string
  readonly clientId: string
  readonly type: 'Web Page'
  name: string
  url: string
  description?: string
  sameAs?: string[]
  about?: Thing[]
  mentions?: Thing & { type: string }[]
}

export interface LocalBusiness extends Organisation {
  readonly type: 'LocalBusiness'
  openingHoursSpecification?: OpeningHoursSpecification[]
  geoCoordinates: GeoCoordninates
  address?: PostalAddress
}

export interface OpeningHoursSpecification {
  dayOfWeek: SelectOption[]
  times: {
    opens: string
    closes: string
  }
}

export interface GeoCoordninates {
  latitude?: number
  longitude?: number
}

export interface PostalAddress {
  streetAddress: string
  addressLocality: string
  addressCountry: string
  postalCode: string
}

export interface Thing {
  name: string
  sameAs: string | string[]
}

export interface Entity {
  readonly uuid: string
  protected type: string
  readonly pageId: string
  readonly clientId: string
}

export interface HowTo extends Entity {
  readonly type: 'How To'
  hasVideo: boolean
  video?: VideoObject
  description?: string
  image?: string
  estimatedCost?: string
  totalTime?: string
  supply: string[]
  tool: string[]
  step: HowToStep[]
}

export interface HowToStep {
  name: string
  image: string
  description: string
  url?: string
  video?: {
    startOffset: number
    endOffset: number
    url: string
  }
}

export interface FAQ extends Entity {
  mainEntity: {
    name: string
    acceptedAnswer: string
  }[]
}