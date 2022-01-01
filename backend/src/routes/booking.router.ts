import express, { Request, Response } from 'express';
import { createQueryBuilder } from 'typeorm';
import { BookingDto } from '../dtos/BookingDto';
import { Booking } from '../models/Booking.entity';
import { TravelPlanner } from '../services/TravelPlanner';

const router = express.Router();
router.get("/api/booking", async (req: Request, res: Response) => {
  const bookings = await createQueryBuilder(Booking)
  .leftJoinAndSelect("Booking.bookedSeats", "Seat")
  .getMany() as Booking[];
  res.json(bookings);
});

router.post("/api/booking", async (req: Request, res: Response) => {
  let bookingDto: BookingDto = req.body;
  let booking = await (new TravelPlanner()).bookSeats(bookingDto);
  res.json(booking);
});

export {router as bookingRouter}