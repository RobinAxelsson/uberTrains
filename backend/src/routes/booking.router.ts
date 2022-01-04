import express, { Request, Response } from 'express';
import { createQueryBuilder } from 'typeorm';
import { Booking } from '../models/Booking.entity';
import { BookingManager } from '../services/BookingManager';
import { GetPriceDto } from '../dtos/GetPriceDto';
import { BookingDto } from '../dtos/BookingDto';

const router = express.Router();
router.post("/api/booking", async (req: Request, res: Response) => {
  try {
    let bookingDto: BookingDto = await req.body;
    let booking = await (new BookingManager()).book(bookingDto);
    res.json(booking);
  } catch (err) {
    console.log("Failed!\nError:\n",err);
    res.json(err)
  }
});

router.get("/api/booking", async (req: Request, res: Response) => {
  const bookings = await createQueryBuilder(Booking)
  .leftJoinAndSelect("Booking.bookedSeats", "Seat")
  .getMany() as Booking[];
  res.json(bookings);
});

router.get("/api/getPrice", async (req: Request, res: Response) => {
  try {
    const calculatePriceDto = (await req.body) as GetPriceDto;
    let bookingManager = new BookingManager();
    const price = await bookingManager.getPriceForBooking(calculatePriceDto);
    res.json(price);
    console.log("Success:\nPrice:\n" + price);
  } catch(err) {
    console.log("Failed!\nError:\n",err);
    res.json(err)
  }
});

export {router as bookingRouter}