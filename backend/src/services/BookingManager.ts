import { BookingDto } from "../dtos/BookingDto";
import { Booking } from "../models/Booking.entity";
import { Seat } from "../models/Seat.entity";
import { PriceCalculator } from "./PriceCalculator";
import { Guid } from "./UtilityFunctions";

export class BookingManager {
  async bookSeats(bookingDto: BookingDto) {
    const { paymentInfo, startStation, endStation, priceModel, seatIds } =
      bookingDto;

    const priceCalculator = new PriceCalculator();

    let distance = priceCalculator.getDistance(
      startStation.coordinates,
      endStation.coordinates
    );
    let price = priceCalculator.getPrice(priceModel, distance);
    let totalPrice = price * seatIds.length;
    const booking = {
      bookingNumber: Guid.newGuid(),
      localDateTime: Date().toString(),
      email: paymentInfo.email,
      totalPrice: totalPrice,
      stripeBookingNumber: paymentInfo.stripeBookingNumber,
      startStation: startStation.name,
      endStation: endStation.name,

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
}
