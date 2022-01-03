import {
  Between,
  createConnection,
  createQueryBuilder,
  getConnection,
  In,
} from "typeorm";
import { Booking } from "../models/Booking.entity";
import { TravelPlan } from "../models/TravelPlan.entity";
import { TrainUnit } from "../models/TrainUnit.entity";
import { Seat } from "../models/Seat.entity";
import { RouteEvent } from "../models/RouteEvent.entity";
import { seed } from "../services/Seeder";
import { TravelPlanner } from "../services/TravelPlanner";
import { BookingDto } from "../dtos/BookingDto";
import { BookingManager } from "../services/BookingManager";
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
  }).catch((err) => console.log(JSON.stringify(err)));
});

afterEach(() => {
  let conn = getConnection();
  return conn.close();
});
test("Get travelPlan Info by start, stop, date GBG-STHLM", async () => {
  await seed();
  const data = await new TravelPlanner().getTravelPlanInfo(
    "goteborg",
    "stockholm",
    "2012-04-23"
  );
  expect([...data].map((x) => x.travelPlanId)).toStrictEqual([1]);
});
test("Get travelPlan Info by start, stop, date JKPNG-STHLM", async () => {
  await seed();
  const data = await new TravelPlanner().getTravelPlanInfo(
    "jonkoping",
    "stockholm",
    "2012-04-23"
  );
  expect([...data].map((x) => x.travelPlanId)).toStrictEqual([1]);
});

test("Get FULL travelPlan by start, stop, date JKPNG-STHLM", async () => {
  await seed();
  const data = await new TravelPlanner().getFullTravelPlanByStartStopDate(
    "jonkoping",
    "stockholm",
    "2012-04-23"
  );
  expect(data?.map((x) => x.id)).toStrictEqual([1]);
  expect(data?.map((x) => x.priceModel)).toStrictEqual(["default-winter"]);
});
test("Get FULL travelPlan by start, stop, date STHLM-JKPNG, expect empty array", async () => {
  await seed();
  const data = await new TravelPlanner().getFullTravelPlanByStartStopDate(
    "stockholm",
    "jonkoping",
    "2012-04-23"
  );
  expect(data).toStrictEqual([]);
});
test("TravelPlanner GetFullTravelPlanById, Load seeded travelplan id 1 expect 4 routeEvents", async () => {
  await seed();
  const travelPlan = await new TravelPlanner().getFullTravelPlanById(1);
  expect(travelPlan.routeEvents.length).toBe(4);
  expect(travelPlan.trainUnits.length).toBe(2);
  expect(travelPlan.trainUnits[0].seats.length).toBe(2);
  expect(travelPlan.trainUnits[1].seats.length).toBe(2);
});

test("Find RouteEvents between assert all", async () => {
  await seed();
  let events = await RouteEvent.find({
    relations: ["travelPlan"],
    where: [
      {
        dateTime: Between("2012-04-23", "2012-04-24"),
        location: In(["goteborg", "stockholm"]),
      },
    ],
  });
  //console.log(JSON.stringify({QuerybuilderBetweenAssertAll: events}, null, '\t'));
  expect(events.length).toBe(2);
});

test("As user I want to be able to book seats", async () => {
  await seed();

  expect((await Booking.find()).length).toBe(0);
  expect((await Seat.find()).length).toBe(4);

  const bookingDto = {
    seatIds: [1, 2],
    startStation: "Goteborg",
    endStation: "Stockholm",
    paymentInfo: {
      stripeBookingNumber: "stripe_1234",
      email: "post@man.se",
      totalPrice: 1000,
    },
  } as BookingDto;
  const bookingManager = new BookingManager();
  const booking = await bookingManager.bookSeats(bookingDto);

  const seats = (await createQueryBuilder(Seat)
    .leftJoinAndSelect("Seat.booking", "Booking")
    .where("Seat.id IN (:...ids)", { ids: bookingDto.seatIds })
    .getMany()) as Seat[];

  const dbBooking = (await createQueryBuilder(Booking)
    .leftJoinAndSelect("Booking.bookedSeats", "Seat")
    .where("Booking.id = :id", { id: booking.id })
    .getOne()) as Booking;

  //console.log(JSON.stringify({Seats: seats}, null, '\t'));
  // console.log(JSON.stringify({BookingWithSeats: bookings}, null, '\t'));
  expect(seats.every((x) => x.booking !== null)).toBeTruthy();
  expect(dbBooking?.bookedSeats[0]?.seatNumber).toBe("6a");
  expect(dbBooking?.bookedSeats[1]?.seatNumber).toBe("7a");
});
