import { createConnection, getConnection, getRepository } from 'typeorm';
import { Booking } from '../models/Booking.entity';
import { TravelPlan as TravelPlan } from '../models/TravelPlan.entity';
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
      entities: [Booking, TravelPlan],
      synchronize: true,
      logging: false
  });
});

afterEach(() => {
  let conn = getConnection();
  return conn.close();
});

test("Expect booking is added and deleted", async () => {
  let booking = {
    BookingNumber: "1111-1111-1111-1111",
    StartStation: "Goteborg",
    EndStation:"Stockholm",
    LocalDateTime: new Date().toUTCString(),
    PurchasedTickets: 3,
    TotalPrice: 1337
  } as Booking;

  let repository = await getRepository(Booking);

  await repository.insert(booking);
  let actualPreDelete = (await repository.find({where: { Id: 1 }}))[0];
  
  await repository.delete({BookingNumber: "1111-1111-1111-1111"});

  let actualPostDelete = (await repository.find({where: { Id: 1 }}))[0];
  console.log(JSON.stringify(actualPostDelete));

  expect(actualPreDelete.BookingNumber).toBe("1111-1111-1111-1111");
  expect(actualPostDelete).toBe(undefined);
});

test("store, fetch, delete travelplan", async () => {
  let travelPlan = {
    PlanId: "1111-1111-1111-1111",
    TripName: "X2000, gbg-sthlm",
    TrainUnitIds: "1;2;3",
    RouteEventIds: "event1;event2",
    PriceModel: "standard"
  } as TravelPlan;
  let repository = await getRepository(TravelPlan);
  await repository.insert(travelPlan);

  let actualPreDelete = (await repository.find({
    where: {
        Id: 1
    }
}))[0];
await repository.delete({PlanId: "1111-1111-1111-1111"});
let actualPostDelete = (await repository.find({
  where: {
      Id: 1
  }
}))[0];
  expect(actualPreDelete.PlanId).toBe("1111-1111-1111-1111");
  expect(actualPostDelete).toBe(undefined);
});