import { BookingDto } from "../dtos/BookingDto";
import { Booking } from "../models/Booking.entity";
import { Seat } from "../models/Seat.entity";
import { TravelPlan } from "../models/TravelPlan.entity";
import { Guid } from "./UtilityFunctions";

export class BookingManager {
    async bookSeats(bookingDto: BookingDto) {

        const {paymentInfo, startStation, endStation} = bookingDto;
        const booking = {
          bookingNumber: Guid.newGuid(),
          localDateTime: Date().toString(),
          email: paymentInfo.email,
          totalPrice: paymentInfo.totalPrice,
          stripeBookingNumber: paymentInfo.stripeBookingNumber,
          startStation: startStation,
          endStation: endStation,

          bookedSeats: [] as Seat[],
        } as Booking;
    
        for (const id of bookingDto.seatIds) {
          const seat = await Seat.findOne(id);
          booking.bookedSeats.push(seat as Seat);
          await Seat.save(seat as Seat);
        }
    
        const dbBooking = await Booking.save(booking);
        return dbBooking;
      }
  }
