import { BookingDto } from "../dtos/BookingDto";
import { Booking } from "../models/Booking.entity";
import { Seat } from "../models/Seat.entity";
import { PriceCalculator } from "./PriceCalculator";
import { Guid } from "./UtilityFunctions";
import { GetPriceDto } from "../dtos/GetPriceDto";
import { TravelPlan } from "../models/TravelPlan.entity";
import { RouteEvent } from "../models/RouteEvent.entity";
import { createQueryBuilder } from "typeorm";
import { PaymentManager } from './PaymentManager';

export class BookingManager {
  priceCalculator: PriceCalculator;
  paymentManager: PaymentManager;
  constructor() {
    this.priceCalculator = new PriceCalculator();
    this.paymentManager = new PaymentManager();
  }
  async getPriceForBooking(calculatePriceDto: GetPriceDto) {
    const { amount, endRouteEventId, startRouteEventId, travelPlanId } =
      calculatePriceDto;
    let entities = await this.getEntities(
      travelPlanId,
      startRouteEventId,
      endRouteEventId
    );
    const { startRouteEvent, endRouteEvent, travelPlan } = entities;
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
  async book(bookingDto: BookingDto) {
    const {
      startRouteEventId,
      endRouteEventId,
      seatIds,
      travelPlanId,
      stripeInfo: stripeToken
    } = bookingDto;

    const { startRouteEvent, endRouteEvent, travelPlan } =
      await this.getEntities(travelPlanId, startRouteEventId, endRouteEventId);

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
    console.log(JSON.stringify({price: price}), null, '\t');
    
    let stripeId = await this.paymentManager.Pay(stripeToken, price);
    
    const booking = {
      bookingNumber: Guid.newGuid(),
      localDateTime: Date().toString(),
      email: stripeToken.email,
      totalPrice: price,
      stripeId: stripeId,
      startStation: startRouteEvent.location,
      endStation: endRouteEvent.location,

      bookedSeats: [] as Seat[],
    } as Booking;

    for (const id of seatIds) {
      const seat = await Seat.findOne(id);
      booking.bookedSeats.push(seat as Seat);
      await Seat.save(seat as Seat);
    }

    const dbBooking = await Booking.save(booking);
    return dbBooking;
  }
  private async getEntities(
    travelPlanId: number,
    startRouteEventId: number,
    endRouteEventId: number
  ) {
    const travelPlan = (await createQueryBuilder(TravelPlan)
    .leftJoinAndSelect("TravelPlan.priceModel", "PriceModel")
    .where("travelPlan.id = :id", {id: travelPlanId})
    .getOne())

    console.log(JSON.stringify({ BookingManagerGetEntities: travelPlan }, null, "\t"));
    const startRouteEvent = (await RouteEvent.findOne(
      startRouteEventId
    )) as RouteEvent;
    const endRouteEvent = (await RouteEvent.findOne(
      endRouteEventId
    )) as RouteEvent;
    return {
      travelPlan: travelPlan,
      startRouteEvent: startRouteEvent,
      endRouteEvent: endRouteEvent,
    };
  }
}
