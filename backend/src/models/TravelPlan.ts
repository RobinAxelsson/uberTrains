import { TrainUnit } from "./TrainUnits";
import { RouteEvent } from "./RouteEvent";
import { Entity } from "typeorm";

Entity()
export class TravelPlan {
  Id: string;
  TrainUnits: TrainUnit[];
  RouteEvents: RouteEvent[];
  PriceModel: string;
}
