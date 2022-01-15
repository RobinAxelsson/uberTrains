import { Seat } from "../models/Seat.entity";
import { TrainUnit } from "../models/TrainUnit.entity";
import { TravelPlan } from "../models/TravelPlan.entity";
import { RouteEvent } from "../models/RouteEvent.entity";
import { PriceModel } from "../models/PriceModel.entity";
import { trainFactory } from './Factory';
import { GbgJkpngSthlmEarly } from "./Route.factory";

export async function seed() {
  return await seedDate('2012-04-23')
}
export async function seedDate(isoDate: string) {

  let travelPlan = {
    trainUnits: trainFactory(2,4,["A","B"]),
    planId: "1111-1111-1111-1111",
    tripName: "X2000 GBG-Sthlm",
    routeEvents: GbgJkpngSthlmEarly(isoDate),
  } as TravelPlan;

  let priceModel = {
    name: "Commuter Train",
    priceConstant: 2,
    trainTypeMultiplyer: 0.8,
    travelPlans: [travelPlan],
  } as PriceModel;

  let seats = [...travelPlan.trainUnits.map(tu => tu.seats)]

  for (const s of seats) {
    await Seat.save(s);
  }

  for (const tu of travelPlan.trainUnits) {
    await TrainUnit.save(tu);
  }

  for (const re of travelPlan.routeEvents) {
    await RouteEvent.save(re);
  }

  await TravelPlan.save(travelPlan);
  await PriceModel.save(priceModel);
}
