import { Any, Between, createConnection, createQueryBuilder, getConnection, getRepository, In, Raw } from "typeorm";
import { Booking } from "../models/Booking.entity";
import { TravelPlan } from "../models/TravelPlan.entity";
import { TrainUnit } from '../models/TrainUnit.entity';
import { Seat } from '../models/Seat.entity';
import { RouteEvent } from "../models/RouteEvent.entity";
import { seed } from "../services/Seeder";
import { TravelPlanner } from "../services/TravelPlanner";
import { BookingDto } from "../dtos/BookingDto";
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
    entities: [Booking, TravelPlan, TrainUnit, Seat, RouteEvent],
    synchronize: true,
    logging: false,
  }).catch(err => console.log(JSON.stringify(err)));
});

afterEach(() => {
  let conn = getConnection();
  return conn.close();
});

test("TravelPlanner GetFullTravelPlanById, Load seeded travelplan id 1 expect 4 routeEvents", async () => {
  await seed();
  const travelPlan = await (new TravelPlanner()).getFullTravelPlanById(1);
  expect(travelPlan.routeEvents.length).toBe(4);
  expect(travelPlan.trainUnits.length).toBe(2);
  expect(travelPlan.trainUnits[0].seats.length).toBe(2);
  expect(travelPlan.trainUnits[1].seats.length).toBe(2);
});

test("Find RouteEvents between assert all", async () => {
  await seed();
  let events = await RouteEvent.find({
    relations: ["travelPlan"],
    where:[
    { dateTime: Between("2012-04-23", "2012-04-24"),
    location: In(["Goteborg", "Stockholm"])}],
  });
  //console.log(JSON.stringify({QuerybuilderBetweenAssertAll: events}, null, '\t'));
  expect(events.length).toBe(2);
});

test("Book seat assert no exception", async () => {
  await seed();
  const bookingDto = {
  seatIds: [1,2],
  startStation: "Goteborg",
  endStation: "Stockholm",
  paymentInfo: {
      stripeBookingNumber:"stripe_1234",
      email: "post@man.se",
      totalPrice: 1000
    }
} as BookingDto; 
  const travelPlanner = new TravelPlanner();
  const booking = await travelPlanner.createBooking(bookingDto);
  const bookingWithSeats = await travelPlanner.getBookingWithSeats(1) as Booking;
  
  console.log(JSON.stringify({BookingWithSeats: bookingWithSeats}, null, '\t'));

  expect(bookingWithSeats.bookedSeats.length).toBe(2);
});