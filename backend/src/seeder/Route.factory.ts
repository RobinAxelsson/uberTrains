import { RouteEvent } from "../models/RouteEvent.entity";

export function GbgJkpngSthlmEarly(isoDate:string){ return [
    {
      latitude: 57.7072326,
      longitude: 11.9670171,
      dateTime: isoDate + 'T09:30:00.000Z',
      location: 'göteborg',
      specifiedLocation: 'Platform 5',
      event: 'Avgång',
    } as RouteEvent,
    {
      latitude: 57.7825634,
      longitude: 14.165719,
      dateTime: isoDate + 'T11:30:00.000Z',
      specifiedLocation: 'Platform 1',
      location: 'jönköping',
      event: 'Ankomst',
    } as RouteEvent,
    {
      latitude: 57.7825634,
      longitude: 14.165719,
      dateTime: isoDate + 'T11:35:00.000Z',
      specifiedLocation: 'Platform 1',
      location: 'jönköping',
      event: 'Avgång',
    } as RouteEvent,
    {
      latitude: 59.3251172,
      longitude: 18.0710935,
      dateTime: isoDate + 'T13:00:00.000Z',
      specifiedLocation: 'Platform 10a',
      location: 'stockholm',
      event: 'Ankomst',
    } as RouteEvent,
  ]
}

export function GbgJkpngSthlmLate(isoDate:string){ return [
  {
    latitude: 57.7072326,
    longitude: 11.9670171,
    dateTime: isoDate + 'T18:30:00.000Z',
    location: 'göteborg',
    specifiedLocation: 'Platform 5',
    event: 'Avgång',
  } as RouteEvent,
  {
    latitude: 57.7825634,
    longitude: 14.165719,
    dateTime: isoDate + 'T20:30:00.000Z',
    specifiedLocation: 'Platform 1',
    location: 'jönköping',
    event: 'Ankomst',
  } as RouteEvent,
  {
    latitude: 57.7825634,
    longitude: 14.165719,
    dateTime: isoDate + 'T20:35:00.000Z',
    specifiedLocation: 'Platform 1',
    location: 'jönköping',
    event: 'Avgång',
  } as RouteEvent,
  {
    latitude: 59.3251172,
    longitude: 18.0710935,
    dateTime: isoDate + 'T22:30:00.000Z',
    specifiedLocation: 'Platform 10a',
    location: 'stockholm',
    event: 'Ankomst',
  } as RouteEvent,
]
}
export function SthlmJkpngGbgEarly(isoDate:string){ 
  return [
    {
      latitude: 57.7072326,
      longitude: 11.9670171,
      dateTime: isoDate + 'T09:30:00.000Z',
      location: 'stockholm',
      specifiedLocation: 'Platform 5',
      event: 'Avgång',
    } as RouteEvent,
    {
      latitude: 57.7825634,
      longitude: 14.165719,
      dateTime: isoDate + 'T11:30:00.000Z',
      specifiedLocation: 'Platform 1',
      location: 'jönköping',
      event: 'Ankomst',
    } as RouteEvent,
    {
      latitude: 57.7825634,
      longitude: 14.165719,
      dateTime: isoDate + 'T11:35:00.000Z',
      specifiedLocation: 'Platform 1',
      location: 'jönköping',
      event: 'Avgång',
    } as RouteEvent,
    {
      latitude: 59.3251172,
      longitude: 18.0710935,
      dateTime: isoDate + 'T13:00:00.000Z',
      specifiedLocation: 'Platform 10a',
      location: 'göteborg',
      event: 'Ankomst',
    } as RouteEvent,
  ]
}

export function SthlmJkpngGbgLate(isoDate:string){ return [
  {
    latitude: 57.7072326,
    longitude: 11.9670171,
    dateTime: isoDate + 'T18:30:00.000Z',
    location: 'stockholm',
    specifiedLocation: 'Platform 5',
    event: 'Avgång',
  } as RouteEvent,
  {
    latitude: 57.7825634,
    longitude: 14.165719,
    dateTime: isoDate + 'T20:30:00.000Z',
    specifiedLocation: 'Platform 1',
    location: 'jönköping',
    event: 'Ankomst',
  } as RouteEvent,
  {
    latitude: 57.7825634,
    longitude: 14.165719,
    dateTime: isoDate + 'T20:35:00.000Z',
    specifiedLocation: 'Platform 1',
    location: 'jönköping',
    event: 'Avgång',
  } as RouteEvent,
  {
    latitude: 59.3251172,
    longitude: 18.0710935,
    dateTime: isoDate + 'T22:30:00.000Z',
    specifiedLocation: 'Platform 10a',
    location: 'göteborg',
    event: 'Ankomst',
  } as RouteEvent,
]
}