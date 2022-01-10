import { BookingDto } from "../dtos/BookingDto";
import { Booking } from "../models/Booking.entity";
import { Seat } from "../models/Seat.entity";
import { PriceCalculator } from "./PriceCalculator";
import { Guid } from "./UtilityFunctions";
import { GetPriceDto } from "../dtos/GetPriceDto";
import { TravelPlan } from "../models/TravelPlan.entity";
import { RouteEvent } from "../models/RouteEvent.entity";
import { createQueryBuilder } from "typeorm";
import { IPaymentManager } from "./PaymentManager";
import { IMailService } from "./MailService";

export class BookingManager {
  priceCalculator: PriceCalculator;
  paymentManager: IPaymentManager;
  mailService: IMailService;
  constructor(paymentManager: IPaymentManager, mailService: IMailService) {
    this.priceCalculator = new PriceCalculator();
    this.paymentManager = paymentManager;
    this.mailService = mailService;
  }
  async getPriceForBooking(calculatePriceDto: GetPriceDto) {
    const { amount, endRouteEventId, startRouteEventId, travelPlanId } =
      calculatePriceDto;
    let entities = await this.getEntities(travelPlanId, [
      startRouteEventId,
      endRouteEventId,
    ]);
    const { routeEvents, travelPlan } = entities;
    let startRouteEvent = routeEvents[0];
    let endRouteEvent = routeEvents[1];

    let distance = this.priceCalculator.calculateDistance(
      startRouteEvent.latitude,
      startRouteEvent.longitude,
      endRouteEvent.latitude,
      endRouteEvent.longitude
    );

    return this.priceCalculator.calculatePrice(
      distance,
      travelPlan?.priceModel.trainTypeMultiplyer as number,
      travelPlan?.priceModel.priceConstant as number,
      amount
    );
  }
  async validateSeatsAreFree(seatIds: number[], routeEventIds: number[]) {
    const seats = await createQueryBuilder(Seat)
      .leftJoinAndSelect("Seat.booking", "Booking")
      .leftJoinAndSelect("Booking.routeEvents", "RouteEvent")
      .whereInIds(seatIds)
      .getMany();
    let seatsBookings = seats.map((s) => s.booking).filter((x) => x !== null);
    let seatBookingRouteEvents = seatsBookings
      .map((b) => b.routeEvents)
      .flat(1)
      .filter((x) => x !== null);

    if (seatBookingRouteEvents.length === 0) return;
    let dbSeatEventIds = seatBookingRouteEvents.map((x) => x.id);
    if (routeEventIds.filter((x) => dbSeatEventIds.includes(x)).length > 0)
      throw new Error("All seats are not free with the selected options");
    return;
  }
  async book(bookingDto: BookingDto) {
    const {
      routeEventIds,
      seatIds,
      travelPlanId,
      stripeInfo: stripeToken,
    } = bookingDto;

    await this.validateSeatsAreFree(seatIds, routeEventIds); //throws if err

    const { routeEvents, travelPlan, seats } = await this.getBookingEntities(
      travelPlanId,
      routeEventIds,
      seatIds
    );

    let startRouteEvent = routeEvents[0];
    let endRouteEvent = routeEvents[routeEvents.length - 1];

    let distance = this.priceCalculator.calculateDistance(
      startRouteEvent.latitude,
      startRouteEvent.longitude,
      endRouteEvent.latitude,
      endRouteEvent.longitude
    );

    let price = this.priceCalculator.calculatePrice(
      distance,
      travelPlan?.priceModel.trainTypeMultiplyer as number,
      travelPlan?.priceModel.priceConstant as number,
      bookingDto.seatIds.length
    );

    let stripeId = await this.paymentManager.Pay(stripeToken, price);

    const booking = {
      bookingNumber: Guid.newShortGuid(),
      localDateTime: Date().toString(),
      email: stripeToken.email,
      totalPrice: price,
      stripeId: stripeId,
      routeEvents: routeEvents,
      bookedSeats: [] as Seat[],
    } as Booking;

    for (const id of seatIds) {
      const seat = await Seat.findOne(id);
      booking.bookedSeats.push(seat as Seat);
      await Seat.save(seat as Seat);
    }

    const dbBooking = await Booking.save(booking);
    let mailResponse = await this.mailService.sendEmail(dbBooking, seats);

    console.log(mailResponse);
    return dbBooking;
  }
  private async getEntities(travelPlanId: number, routeEventIds: number[]) {
    console.log({ travelPlanId: travelPlanId, routeEventIds: routeEventIds });
    const travelPlan = await createQueryBuilder(TravelPlan)
      .leftJoinAndSelect("TravelPlan.priceModel", "PriceModel")
      .where("travelPlan.id = :id", { id: travelPlanId })
      .getOne();

    if (travelPlan instanceof TravelPlan === false) {
      console.log(
        JSON.stringify(
          {
            travelPlanWhenNotFound: travelPlan,
            travelPlanId: travelPlanId,
            routeEventIds: routeEventIds,
          },
          null,
          "\t"
        )
      );

      throw new Error("TravelPlan not found!");
    }

    const routeEvents = [] as RouteEvent[];

    for (const id of routeEventIds) {
      let routeEvent = (await RouteEvent.findOne(id)) as RouteEvent;
      if (routeEvent instanceof RouteEvent === false)
        throw new Error("RouteEvent was not found");
      routeEvents.push(routeEvent);
    }
    return {
      travelPlan: travelPlan,
      routeEvents: routeEvents,
    };
  }
  private async getBookingEntities(
    travelPlanId: number,
    routeEventIds: number[],
    seatIds: number[]
  ) {
    console.log({ travelPlanId: travelPlanId, routeEventIds: routeEventIds });
    const travelPlan = await createQueryBuilder(TravelPlan)
      .leftJoinAndSelect("TravelPlan.priceModel", "PriceModel")
      .where("travelPlan.id = :id", { id: travelPlanId })
      .getOne();

    const seats = await createQueryBuilder(Seat)
      .leftJoinAndSelect("Seat.trainUnit", "TrainUnit")
      .where("Seat.id IN (:...ids)", { ids: seatIds })
      .getMany();

    if (travelPlan instanceof TravelPlan === false) {
      console.log(
        JSON.stringify(
          {
            travelPlanWhenNotFound: travelPlan,
            travelPlanId: travelPlanId,
            routeEventIds: routeEventIds,
          },
          null,
          "\t"
        )
      );

      throw new Error("TravelPlan not found!");
    }

    const routeEvents = [] as RouteEvent[];

    for (const id of routeEventIds) {
      let routeEvent = (await RouteEvent.findOne(id)) as RouteEvent;
      if (routeEvent instanceof RouteEvent === false)
        throw new Error("RouteEvent was not found");
      routeEvents.push(routeEvent);
    }
    return {
      travelPlan: travelPlan,
      routeEvents: routeEvents,
      seats: seats,
    };
  }
}
