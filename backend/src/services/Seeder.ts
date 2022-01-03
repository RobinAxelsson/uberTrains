import { getRepository } from "typeorm";
import { Seat } from "../models/Seat.entity";
import { TrainUnit } from "../models/TrainUnit.entity";
import { TravelPlan } from "../models/TravelPlan.entity";
import { RouteEvent } from "../models/RouteEvent.entity";

export async function seed() {
let seatsA: Seat[] = [
    { seatNumber: "6a" } as Seat,
    { seatNumber: "7a" } as Seat
];
let seatsB: Seat[] = [
  { seatNumber: "2a" } as Seat,
  { seatNumber: "3a" } as Seat
];

  let trainUnits: TrainUnit[] = [{
    name: "Vagn 4",
    seats: seatsA,
    type: "carriage",
  } as TrainUnit,
  {
    name: "Vagn 5",
    seats: seatsB,
    type: "carriage",
  } as TrainUnit];

  let routeEvents: RouteEvent[] = [
    {
      dateTime: "2022-02-22T18:30:00:000Z",
      location: "goteborg",
      specifiedLocation: "Platform 5",
      event: "Departure",
    } as RouteEvent,
    {
      dateTime: "2022-02-22T20:30:00.000Z",
      specifiedLocation: "Platform 1",
      location: "jonkoping",
      event: "Arrival",
    } as RouteEvent,
    {
      dateTime: "2022-02-22T20:35:00.000Z",
      specifiedLocation: "Platform 1",
      location: "jonkoping",
      event: "Departure",
    } as RouteEvent,
    {
      dateTime: "2022-02-22T22:30:00.000Z",
      specifiedLocation: "Platform 10a",
      location: "stockholm",
      event: "Arrival",
    } as RouteEvent,
  ];

  let travelPlan = {
    trainUnits: trainUnits,
    planId: "1111-1111-1111-1111",
    tripName: "X2000 GBG-Sthlm",
    priceModel: "default-winter",
    routeEvents: routeEvents
  } as TravelPlan;

  let seatRepository = await getRepository(Seat);
  await seatRepository.save(seatsA[0]);
  await seatRepository.save(seatsA[1]);
  await seatRepository.save(seatsB[0]);
  await seatRepository.save(seatsB[1]);

  //let bookingRepository = await getRepository(Booking);
  //await bookingRepository.save(booking);

  let trainUnitRepository = await getRepository(TrainUnit);
  await trainUnitRepository.save(trainUnits[0]);
  await trainUnitRepository.save(trainUnits[1]);

let routeEventRepository = await getRepository(RouteEvent);

await routeEventRepository.save(routeEvents[0]);
await routeEventRepository.save(routeEvents[1]);
await routeEventRepository.save(routeEvents[2]);
await routeEventRepository.save(routeEvents[3]);

  // routeEvents.forEach(async (x) => {
  //   await routeEventRepository.save(x);
  // })

  let travelPlanRepository = await getRepository(TravelPlan);
  await travelPlanRepository.save(travelPlan);
}