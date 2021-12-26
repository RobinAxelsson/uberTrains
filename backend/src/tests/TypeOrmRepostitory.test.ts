import { createConnection, getConnection, getRepository } from "typeorm";
import { Booking } from "../models/Booking.entity";
import { TravelPlan as TravelPlan } from "../models/TravelPlan.entity";
import { TrainUnit } from "../models/TrainUnit.entity";
import { Seat } from "../models/Seat.entity";
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

// test("Expect booking is added and deleted", async () => {
//   let booking = {
//     BookingNumber: "1111-1111-1111-1111",
//     StartStation: "Goteborg",
//     EndStation: "Stockholm",
//     LocalDateTime: new Date().toUTCString(),
//     PurchasedTickets: 3,
//     TotalPrice: 1337,
//   } as Booking;

//   let repository = await getRepository(Booking);

//   await repository.insert(booking);
//   let actualPreDelete = (await repository.find({ where: { Id: 1 } }))[0];

//   await repository.delete({ BookingNumber: "1111-1111-1111-1111" });

//   let actualPostDelete = (await repository.find({ where: { Id: 1 } }))[0];
//   console.log(JSON.stringify(actualPostDelete));

//   expect(actualPreDelete.BookingNumber).toBe("1111-1111-1111-1111");
//   expect(actualPostDelete).toBe(undefined);
// });

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
      },
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