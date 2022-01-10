import { TrainUnit } from '../models/TrainUnit.entity';

export class TravelPlanDto {
  planId: string;
  priceModelId: number;
  tripName: string;
  trainUnits: TrainUnit[];
  routeEvents: RouteEventDto[];
}
export class TrainUnitDto {
  name: string;
  type: string;
  seats: SeatDto[];
}
export class SeatDto {
  seatNumber: string;
}
export class RouteEventDto {
  dateTime: string;
  location: string;
  latitude: number;
  longitude: number;
  specifiedLocation: string; //Like platform "perrong 4b"
  event: string; //arrival, departure (and extendable crossings etc)
}
