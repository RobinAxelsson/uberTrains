import { TrainUnit } from "./TrainUnit";
import { RouteEvent } from "./RouteEvent";
import { Entity } from "typeorm";

Entity()
export class TravelPlan {
  Id: string;
  TrainUnitIds: string[];
  RouteEventIds: string[];
  PriceModel: string;
}
