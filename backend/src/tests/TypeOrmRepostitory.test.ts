import { createConnection, getConnection, getRepository } from "typeorm";
import { Booking } from "../models/Booking.entity";
import { TravelPlan as TravelPlan } from "../models/TravelPlan.entity";
import { TrainUnit } from '../models/TrainUnit.entity';
import { Seat } from '../models/Seat.entity';
import e from "express";
import { stringify } from "querystring";
function sum(a: number, b: number) {
  return a + b;
}

test("Sanity check, expect 1+2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

beforeEach(async () => {
  return await createConnection({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [Booking, TravelPlan, TrainUnit, Seat],
    synchronize: true,
    logging: false,
  });
});

afterEach(() => {
  let conn = getConnection();
  return conn.close();
});

test("store, fetch, delete travelplan", async () => {
  let booking = {
    bookingNumber: "1111-1111-1111-1111",
    startStation: "Goteborg",
    endStation: "Stockholm",
    localDateTime: new Date().toUTCString(),
    totalPrice: 1337,
  } as Booking;

  let carriage = {
    name: "Vagn 4",
    travelPlan: {},
    seats: [{ seatNumber: "4a" }, { seatNumber: "4b" }],
    type: "carriage"
  } as TrainUnit;

  let travelPlan = {
    planId: "1111-1111-1111-1111",
    tripName: "X2000, gbg-sthlm",
    trainUnits: [
      carriage,
      {
        name: "Vagn 5",
        seats: [{ seatNumber: "6a", booking: booking}, { seatNumber: "6b", booking: booking }],
      },
    ],
    routeEventIds: "event1;event2",
    priceModel: "standard",
  } as TravelPlan;

  let repository = await getRepository(TravelPlan);
  await repository.save(travelPlan);

  let actualPreDelete = (
    await repository.find({
      where: {
        id: 1,
      }
    })
  )[0];

  console.log(JSON.stringify(actualPreDelete));

  await repository.delete({ planId: "1111-1111-1111-1111" });
  let actualPostDelete = (
    await repository.find({
      where: {
        id: 1,
      },
    })
  )[0];
  expect(actualPreDelete.planId).toBe("1111-1111-1111-1111");
  expect(actualPostDelete).toBe(undefined);
});

test("bind seat and booking, insert then find", async () => {
  let seat = {
  seatNumber: "4a",
  } as Seat;

  let booking = {
    bookingNumber: "1111-1111-1111-1111",
    startStation: "Goteborg",
    endStation: "Stockholm",
    localDateTime: new Date().toUTCString(),
    totalPrice: 1337,
    bookedSeats: [seat]
  } as Booking;

  let repositorySeat = await getRepository(Seat);
  await repositorySeat.save(seat);

  let repositoryBooking = await getRepository(Booking);
  await repositoryBooking.save(booking);

  let seats = await repositorySeat.find({relations: ["booking"]});

  expect(seats[0].seatNumber).toBe("4a");
  expect(seats[0].booking.bookingNumber).toBe("1111-1111-1111-1111");
});

test("Bind travelplan, trainUnit", async () => {
  
  let seat = { seatNumber: "6a"} as Seat;
  let seatRepository = await getRepository(Seat);

  await seatRepository.save(seat);

  let trainUnit = {
    name: "Vagn 4",
    type: "carriage"
  } as TrainUnit;
  
  let travelPlan = {
    trainUnits: [trainUnit],
    planId: "1111-1111-1111-1111",
    tripName: "moon-ride",
    priceModel: "default-wointer"
  } as TravelPlan;

  let trainUnitRepository = await getRepository(TrainUnit);
  await trainUnitRepository.save(trainUnit);

  let travelPlanRepository = await getRepository(TravelPlan);
  await travelPlanRepository.save(travelPlan);

  let trainUnits = 
    await trainUnitRepository.find(
      {relations: ["travelPlan" ]});

  console.log(JSON.stringify(trainUnits));

  expect(trainUnits[0].name).toBe("Vagn 4");
  expect(trainUnits[0].travelPlan.tripName).toBe("moon-ride");

})

test("bind trainUnit and seat, then find", async () => {
  
  let seat = { seatNumber: "6a"} as Seat;

  let booking = {
    bookingNumber: "1111-1111-1111-1111",
    startStation: "Goteborg",
    endStation: "Stockholm",
    localDateTime: new Date().toUTCString(),
    totalPrice: 1337,
    bookedSeats: [seat]
  } as Booking;
  
  let trainUnit = {
    name: "Vagn 4",
    seats: [seat],
    type: "carriage"
  } as TrainUnit;
  
  let travelPlan = {
    trainUnits: [trainUnit],
    planId: "1111-1111-1111-1111",
    tripName: "moon-ride",
    priceModel: "default-winter"
  } as TravelPlan;

  let seatRepository = await getRepository(Seat);
  await seatRepository.save(seat);

  let repositoryBooking = await getRepository(Booking);
  await repositoryBooking.save(booking);
  
  let trainUnitRepository = await getRepository(TrainUnit);
  await trainUnitRepository.save(trainUnit);

  let travelPlanRepository = await getRepository(TravelPlan);
  await travelPlanRepository.save(travelPlan);

  let seats = await seatRepository.find({relations: ["trainUnit", "trainUnit.travelPlan"]})
  console.log(JSON.stringify(seats));

  
  expect(seats[0].trainUnit.travelPlan.planId).toBe("1111-1111-1111-1111");
  
});


test("Get seats from travelPlan new booking", async()=> {
  let seat = { seatNumber: "6a"} as Seat;

  let booking = {
    bookingNumber: "1111-1111-1111-1111",
    startStation: "Goteborg",
    endStation: "Stockholm",
    localDateTime: new Date().toUTCString(),
    totalPrice: 1337,
    bookedSeats: [seat]
  } as Booking;
  
  let trainUnit = {
    name: "Vagn 4",
    seats: [seat],
    type: "carriage"
  } as TrainUnit;

  let travelPlan = {
    trainUnits: [trainUnit],
    planId: "1111-1111-1111-1111",
    tripName: "moon-ride",
    priceModel: "default-winter"
  } as TravelPlan;

  let seatRepository = await getRepository(Seat);
  await seatRepository.save(seat);

  let repositoryBooking = await getRepository(Booking);
  await repositoryBooking.save(booking);
  
  let trainUnitRepository = await getRepository(TrainUnit);
  await trainUnitRepository.save(trainUnit);

  let travelPlanRepository = await getRepository(TravelPlan);
  await travelPlanRepository.save(travelPlan);

  let seats = await seatRepository.find({relations: ["trainUnit", "trainUnit.travelPlan", "booking"]});
  console.log(JSON.stringify(seats));

  console.log(JSON.stringify(seats[0].trainUnit.travelPlan))
  expect(seats[0].trainUnit.travelPlan.planId).toBe("1111-1111-1111-1111");
})