import express, { Request, Response } from 'express';
import { createQueryBuilder, getRepository } from 'typeorm';
import { BookingDto } from '../dtos/BookingDto';
import { Booking } from '../models/Booking.entity';
import { Seat } from '../models/Seat.entity';
import { TravelPlanner } from '../services/TravelPlanner';
import { Guid } from '../services/UtilityFunctions';

const router = express.Router();
router.get("/api/booking", async (req: Request, res: Response) => {
  const bookings = await createQueryBuilder(Booking)
  .leftJoinAndSelect("Booking.bookedSeats", "Seat")
  .getMany() as Booking[];
  res.json(bookings);
});

router.post("/api/booking", async (req: Request, res: Response) => {
  let bookingDto: BookingDto = req.body;
  console.log(JSON.stringify(bookingDto));
  let seatRepository = (await getRepository(Seat));

  let booking = {
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
    let seat = await seatRepository.findOne(id);
    booking.bookedSeats.push(seat as Seat);
    await seatRepository.save(seat as Seat);
  }

  let bookingRepository = await getRepository(Booking);
  let retrnedBooking = await bookingRepository.save(booking);
  res.json(retrnedBooking);
});

export {router as bookingRouter}