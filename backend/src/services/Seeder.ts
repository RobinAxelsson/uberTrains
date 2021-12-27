import { getRepository } from "typeorm";
import { Seat } from "../models/Seat.entity";
import { TrainUnit } from "../models/TrainUnit.entity";
import { TravelPlan } from "../models/TravelPlan.entity";
import { RouteEvent } from "../models/RouteEvent.entity";
import { Booking } from "../models/Booking.entity";

export async function seed() {
let seatsA: Seat[] = [
    { seatNumber: "6a" } as Seat,
    { seatNumber: "7a" } as Seat
];
let seatsB: Seat[] = [
  { seatNumber: "2a" } as Seat,
  { seatNumber: "3a" } as Seat
];

// let booking = {
//   bookingNumber: "1111-1111-1111-1111",
//   startStation: "Goteborg",
//   endStation: "Stockholm",
//   localDateTime: new Date().toUTCString(),
//   totalPrice: 1337,
//   bookedSeats: seatsA
// } as Booking;

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
      dateTime: "2012-04-23T18:30:43.511Z",
      location: "Goteborg",
      specifiedLocation: "Platform 5",
      event: "Departure",
    } as RouteEvent,
    {
      dateTime: "2012-04-23T20:30:43.511Z",
      specifiedLocation: "Platform 1",
      location: "Jonkoping",
      event: "Arrival",
    } as RouteEvent,
    {
      dateTime: "2012-04-23T20:35:43.511Z",
      specifiedLocation: "Platform 1",
      location: "Jonkoping",
      event: "Departure",
    } as RouteEvent,
    {
      dateTime: "2012-04-23T22:30:43.511Z",
      specifiedLocation: "Platform 10a",
      location: "Stockholm",
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

  // routeEvents.forEach(async (x) => {
  //   await routeEventRepository.save(x);
  // })

  let travelPlanRepository = await getRepository(TravelPlan);
  await travelPlanRepository.save(travelPlan);
}