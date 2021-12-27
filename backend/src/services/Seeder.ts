import { getRepository } from "typeorm";
import { Seat } from "../models/Seat.entity";
import { TrainUnit } from "../models/TrainUnit.entity";
import { TravelPlan } from "../models/TravelPlan.entity";
import { RouteEvent } from "../models/RouteEvent.entity";

export async function seed() {
  let seat = { seatNumber: "6a" } as Seat;

  let trainUnit = {
    name: "Vagn 4",
    seats: [seat],
    type: "carriage",
  } as TrainUnit;

  let routeEvents: RouteEvent[] = [
    {
      dateTime: "2012-04-23T18:30:43.511Z",
      location: "Goteborg",
      specifiedLocation: "Platform 5",
      event: "Departure",
    } as RouteEvent,
    // {
    //   dateTime: "2012-04-23T20:30:43.511Z",
    //   specifiedLocation: "Platform 1",
    //   location: "Jonkoping",
    //   event: "Arrival",
    // } as RouteEvent,
    // {
    //   dateTime: "2012-04-23T20:35:43.511Z",
    //   specifiedLocation: "Platform 1",
    //   location: "Jonkoping",
    //   event: "Departure",
    // } as RouteEvent,
    // {
    //   dateTime: "2012-04-23T22:30:43.511Z",
    //   specifiedLocation: "Platform 10a",
    //   location: "Stockholm",
    //   event: "Arrival",
    // } as RouteEvent,
  ];

  let travelPlan = {
    trainUnits: [trainUnit],
    planId: "1111-1111-1111-1111",
    tripName: "X2000 GBG-Sthlm",
    priceModel: "default-winter",
    routeEvents: routeEvents
  } as TravelPlan;

  let seatRepository = await getRepository(Seat);
  await seatRepository.save(seat);

  let trainUnitRepository = await getRepository(TrainUnit);
  await trainUnitRepository.save(trainUnit);

  let routeEventRepository = await getRepository(RouteEvent);
await routeEventRepository.save(routeEvents[0]);

  // routeEvents.forEach(async (x) => {
  //   await routeEventRepository.save(x);
  // })

  let travelPlanRepository = await getRepository(TravelPlan);
  await travelPlanRepository.save(travelPlan);
}
export async function getSeedSeats(){
  let seatRepository = (await getRepository(Seat));
  let seats = await seatRepository.find({relations: ["trainUnit", "trainUnit.travelPlan"]});
  console.log(JSON.stringify(seats));
  return seats;
}