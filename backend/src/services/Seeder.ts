import { getRepository } from "typeorm";
import { Seat } from "../models/Seat.entity";
import { TrainUnit } from "../models/TrainUnit.entity";
import { TravelPlan } from "../models/TravelPlan.entity";
import { RouteEvent } from '../models/RouteEvent.entity';

export async function seed(){

  let seat = { seatNumber: "6a"} as Seat;
  
  let trainUnit = {
    name: "Vagn 4",
    seats: [seat],
    type: "carriage"
  } as TrainUnit;

  let routeEventGbg = {

  } as RouteEvent;

  let routeEventJkpng = {
    
} as RouteEvent;

let routeEventSthlm = {
    
} as RouteEvent;

  let travelPlan = {
    trainUnits: [trainUnit],
    planId: "1111-1111-1111-1111",
    tripName: "X2000 GBG-Sthlm",
    priceModel: "default-winter"
  } as TravelPlan;

  let seatRepository = await getRepository(Seat);
  await seatRepository.save(seat);
  
  let trainUnitRepository = await getRepository(TrainUnit);
  await trainUnitRepository.save(trainUnit);

  let travelPlanRepository = await getRepository(TravelPlan);
  await travelPlanRepository.save(travelPlan);

  let seats = await seatRepository.find({relations: ["trainUnit", "trainUnit.travelPlan", "booking"]});
}