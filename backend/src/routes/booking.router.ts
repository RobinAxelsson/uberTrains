import express, { Request, Response } from "express";
import { createQueryBuilder } from "typeorm";
import { Booking } from "../models/Booking.entity";
import { BookingManager } from "../services/BookingManager";
import { GetPriceDto } from "../dtos/GetPriceDto";
import { BookingDto } from "../dtos/BookingDto";
import { PaymentManager, PaymentManagerStub } from "../services/PaymentManager";

const router = express.Router();
router.post("/api/booking", async (req: Request, res: Response) => {
  try {
    let bookingDto: BookingDto = await req.body;

    let booking = await new BookingManager(new PaymentManager()).book(
      bookingDto
    );
    res.json(booking);
  } catch (err) {
    console.log("Failed!\nError:\n", err);
    res.json(err);
  }
});

if (process.env.NODE_ENV === "Development") {
  router.post("/api/fakebooking", async (req: Request, res: Response) => {
    try {
      let bookingDto: BookingDto = await req.body;

      let booking = await new BookingManager(new PaymentManagerStub()).book(
        bookingDto
      );
      res.json(booking);
    } catch (err) {
      console.log("Failed!\nError:\n", err);
      res.json(err);
    }
  });
}
router.get("/api/booking/:id", async (req: Request, res: Response) => {
  try {
    const booking = (await createQueryBuilder(Booking)
      .leftJoinAndSelect("Booking.bookedSeats", "Seat")
      .leftJoinAndSelect("Booking.startStation", "startStation")
      .leftJoinAndSelect("Booking.endStation", "endStation")
      .where("booking.id = :id", { id: parseInt(req.params.id) })
      .getOne()) as Booking;
    res.json({booking: booking, status: "success"});
  } catch (err) {
    console.log("Failed!\nError:\n", err);
    res.json(err);
  }
});

router.get("/api/price", async (req: Request, res: Response) => {
  try {
    const calculatePriceDto = (await req.body) as GetPriceDto;

    console.log(calculatePriceDto);

    let bookingManager = new BookingManager(new PaymentManager());
    const price = await bookingManager.getPriceForBooking(calculatePriceDto);
    if(isNaN(price)) throw new Error(JSON.stringify({message: "Server could not calculate price", requestBody: req.body}));
    console.log(JSON.stringify({message: "Server could not calculate price", requestBody: req.body, price: price}))

    res.json({price});
    console.log("Success:\nPrice:\n" + price);
  } catch (err) {
    console.log("Failed!\nError:\n", err);
    res.json(err);
  }
});

export { router as bookingRouter };
