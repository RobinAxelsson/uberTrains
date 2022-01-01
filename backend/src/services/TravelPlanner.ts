import { createQueryBuilder } from "typeorm";
import { BookingDto } from "../dtos/BookingDto";
import { Booking } from "../models/Booking.entity";
import { Seat } from "../models/Seat.entity";
import { TravelPlan } from "../models/TravelPlan.entity";
import { Guid } from "./UtilityFunctions";

export class TravelPlanner {
  async getFullTravelPlanById(id:number){
    return await createQueryBuilder(TravelPlan)
    .leftJoinAndSelect("TravelPlan.routeEvents", "RouteEvent")
    .leftJoinAndSelect("TravelPlan.trainUnits", "TrainUnit")
    .leftJoinAndSelect("TrainUnit.seats", "Seat")
    .leftJoinAndSelect("Seat.booking", "Booking")
    .where("travelPlan.id = :id", {id: id})
    .getOne() as TravelPlan;
  }

  //User can create booking
  async bookSeats(bookingDto: BookingDto){
    const {seatIds, startStation, endStation, paymentInfo} = bookingDto;

    const seats = await Seat.find({where: {id: seatIds}});

    const booking = Booking.create({
      bookingNumber: Guid.newGuid(),
      startStation: startStation,
      endStation: endStation,
      localDateTime: new Date().toUTCString(),
      totalPrice: paymentInfo.totalPrice,
      email: paymentInfo.email,
      bookedSeats: seats,
      stripeBookingNumber: paymentInfo.stripeBookingNumber
    });
    await booking.save();
    
    for await (const seat of seats) {
      seat.booking = booking;
      await seat.save();
    }

    await booking.save();
    return booking;
  }
  async getBookingWithSeats(bookingId:number){
    return await Booking.findOne({
      relations: ["bookedSeats"],
      where: {
        id: bookingId
      },
    })
  }
}
