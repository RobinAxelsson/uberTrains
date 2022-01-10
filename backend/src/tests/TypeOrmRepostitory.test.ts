import { Between, createConnection, createQueryBuilder, getConnection, In } from 'typeorm';
import { Booking } from '../models/Booking.entity';
import { TravelPlan } from '../models/TravelPlan.entity';
import { TrainUnit } from '../models/TrainUnit.entity';
import { Seat } from '../models/Seat.entity';
import { RouteEvent } from '../models/RouteEvent.entity';
import { seed } from '../services/Seeder';
import { TravelPlanner } from '../services/TravelPlanner';
import { BookingDto } from '../dtos/BookingDto';
import { BookingManager } from '../services/BookingManager';
import { PriceCalculator } from '../services/PriceCalculator';
import { PriceModel } from '../models/PriceModel.entity';
import { PaymentManagerStub } from '../services/PaymentManager';
import { GetPriceDto } from '../dtos/GetPriceDto';
import { mailServiceStub } from '../services/MailService';
function sum(a: number, b: number) {
  return a + b;
}
test('Sanity check, expect 1+2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

beforeEach(async () => {
  return await createConnection({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [Booking, TravelPlan, TrainUnit, Seat, RouteEvent, PriceModel],
    synchronize: true,
    logging: false,
  }).catch((err) => console.log(JSON.stringify(err)));
});

afterEach(() => {
  let conn = getConnection();
  return conn.close();
});

describe('Price calculation', () => {
  test('Calculate prize JKPNG-STHLM', async () => {
    await seed();
    const priceCalculator = new PriceCalculator();
    let startCoords = {
      //JKPNG
      latitude: 57.7825634,
      longitude: 14.165719,
    };
    let endCoords = {
      //Sthlm
      latitude: 59.3251172,
      longitude: 18.0710935,
    };
    let distance = priceCalculator.calculateDistance(
      startCoords.latitude,
      startCoords.longitude,
      endCoords.latitude,
      endCoords.longitude,
    );
    let price = priceCalculator.calculatePrice(distance, 0.8, 2, 1);
    expect(distance).toStrictEqual(284.08);
    expect(price).toStrictEqual(454.53);
  });
  test('Calculate prize witch CalculateDto JKPNG-STHLM', async () => {
    await seed();
    const bookingManager = new BookingManager(new PaymentManagerStub(), new mailServiceStub());

    const calculateDto = {
      travelPlanId: 1,
      startRouteEventId: 3,
      endRouteEventId: 4,
      amount: 1,
    } as GetPriceDto;

    const price = await bookingManager.getPriceForBooking(calculateDto);
    expect(price).toStrictEqual(454.53);
  });
});

describe('SQLite interaction with TypeOrm API', () => {
  describe('api/journey, Fetching TravelPlane by start, stop, date', () => {
    test('Get FULL travelPlan by start, stop, date JKPNG-STHLM', async () => {
      await seed();
      const data = await new TravelPlanner().getFullTravelPlanByStartStopDate(
        'jönköping',
        'stockholm',
        '2012-04-23',
      );
      expect(data?.map((x) => x.id)).toStrictEqual([1]);
      expect(data?.map((x) => x.priceModel.priceConstant)).toStrictEqual([2]);
    });
    test('Get FULL travelPlan by start, stop, date STHLM-JKPNG, expect empty array', async () => {
      await seed();
      const data = await new TravelPlanner().getFullTravelPlanByStartStopDate(
        'stockholm',
        'jönköping',
        '2012-04-23',
      );
      expect(data).toStrictEqual([]);
    });
  });
  describe('api/travelPlan', () => {
    test('TravelPlanner GetFullTravelPlanById, Load seeded travelplan id 1 expect 4 routeEvents', async () => {
      await seed();
      const travelPlan = await new TravelPlanner().getFullTravelPlanById(1);
      expect(travelPlan.routeEvents.length).toBe(4);
      expect(travelPlan.trainUnits.length).toBe(2);
      expect(travelPlan.trainUnits[0].seats.length).toBe(2);
      expect(travelPlan.trainUnits[1].seats.length).toBe(2);
    });
  });

  describe('api/book booking seats', () => {
    test('As user I want to be able to book seats', async () => {
      await seed();

      expect((await Booking.find()).length).toBe(0);
      expect((await Seat.find()).length).toBe(4);

      const bookingDto = {
        travelPlanId: 1,
        seatIds: [3, 4],
        routeEventIds: [1, 2, 3, 4],
        stripeInfo: {
          id: 'stripe_1234',
          email: 'post@man.se',
          name: 'KalleBanan',
        },
      } as BookingDto;
      const bookingManager = new BookingManager(new PaymentManagerStub(), new mailServiceStub());

      const booking = await bookingManager.book(bookingDto);

      const seats = (await createQueryBuilder(Seat)
        .leftJoinAndSelect('Seat.booking', 'Booking')
        .where('Seat.id IN (:...ids)', { ids: bookingDto.seatIds })
        .getMany()) as Seat[];

      const dbBooking = (await createQueryBuilder(Booking)
        .leftJoinAndSelect('Booking.bookedSeats', 'Seat')
        .where('Booking.id = :id', { id: booking.id })
        .getOne()) as Booking;

      // console.log(JSON.stringify({Seats: seats}, null, '\t'));
      // console.log(JSON.stringify({BookingWithSeats: booking}, null, '\t'));
      expect(seats.every((x) => x.booking !== null)).toBeTruthy();
      expect(dbBooking?.bookedSeats[0]).not.toBeNull();
      expect(dbBooking?.bookedSeats[1]).not.toBeNull();
      expect(booking.stripeId).toBe('stripe_1234');
    });

    test('As user I dont want to be able to book occupied seats', async () => {
      await seed();

      const bookingDto = {
        travelPlanId: 1,
        seatIds: [1, 2],
        routeEventIds: [1, 2, 3, 4],
        stripeInfo: {
          id: 'stripe_1234',
          email: 'post@man.se',
          name: 'KalleBanan',
        },
      } as BookingDto;
      const bookingManager = new BookingManager(new PaymentManagerStub(), new mailServiceStub());

      await bookingManager.book(bookingDto);

      await expect(bookingManager.book(bookingDto)).rejects.toThrow(
        'All seats are not free with the selected options',
      );
    });
  });
});
