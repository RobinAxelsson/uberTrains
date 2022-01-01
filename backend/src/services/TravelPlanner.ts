import { createQueryBuilder, getRepository } from "typeorm";
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

  async bookSeats(bookingDto: BookingDto){
  
    const booking = {
      bookingNumber: Guid.newGuid(),
      localDateTime: Date().toString(),
      email: bookingDto.paymentInfo.email,
      totalPrice: bookingDto.paymentInfo.totalPrice,
      stripeBookingNumber: bookingDto.paymentInfo.stripeBookingNumber,
      startStation: bookingDto.startStation,
      endStation: bookingDto.endStation,
      bookedSeats: [] as Seat[]
    } as Booking;
  
    for (const id of bookingDto.seatIds) {
      const seat = await Seat.findOne(id);
      booking.bookedSeats.push(seat as Seat);
      await Seat.save(seat as Seat);
    }
  
    const dbBooking = await Booking.save(booking);
    return dbBooking;
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
