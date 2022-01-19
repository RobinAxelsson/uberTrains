import express, { Request, Response } from "express";
import { createQueryBuilder } from "typeorm";
import { Booking } from "../models/Booking.entity";
import { BookingManager } from "../services/BookingManager";
import { GetPriceDto } from "../dtos/GetPriceDto";
import { PaymentManager, PaymentManagerStub, IPaymentManager } from '../services/PaymentManager';
import { mailService, mailServiceStub, IMailService } from '../services/MailService';

const router = express.Router();

async function routerBook(bookingDto: any, res: Response, paymentManager:IPaymentManager, mailService:IMailService){
  try {
  console.log({ parsedRequestBody: JSON.stringify(bookingDto, null, '\t') });

  let booking = await new BookingManager(
    paymentManager,
    mailService
  ).book(bookingDto);
  res.json(booking);
} catch (err) {
  console.log("Failed!\nError:\n", err);
  res.status(404);
  res.json((err as Error).message);
}
}
router.post("/api/booking", async (req: Request, res: Response) => {
    let bookingDto = await req.body;
    routerBook(bookingDto, res, new PaymentManager, new mailService);
});

if (process.env.NODE_ENV === "Development") {
  router.post("/api/fakebooking", async (req: Request, res: Response) => {
    let bookingDto = await req.body;
    routerBook(bookingDto, res, new PaymentManagerStub, new mailServiceStub);
  });
};

router.get("/api/booking", async (req: Request, res: Response) => {
  try {
    const allBookings = (await createQueryBuilder(Booking)
      .leftJoinAndSelect("Booking.bookedSeats", "Seat")
      .leftJoinAndSelect("Booking.routeEvents", "RouteEvents")
      .getMany()) as Booking[];

    if(allBookings === undefined) throw new Error("No booking found!");

    res.json(allBookings);
  } catch (err) {
    console.log("Failed!\nError:\n", err);
    res.json((err as Error).message);
  }
});
router.get("/api/booking/:id", async (req: Request, res: Response) => {
  try {
    let id = parseInt(req.params.id);
    if(id === NaN) throw new Error("Id must be a number");

    const booking = (await createQueryBuilder(Booking)
      .leftJoinAndSelect("Booking.bookedSeats", "Seat")
      .leftJoinAndSelect("Booking.routeEvents", "RouteEvent")
      .where("booking.id = :id", { id: parseInt(req.params.id) })
      .getOne()) as Booking;
    if(booking === undefined) throw new Error("No booking found!");

    res.json({booking: booking, status: "success"});
  } catch (err) {
    console.log("Failed!\nError:\n", err);
    res.json((err as Error).message);
  }
});
router.delete("/api/booking/:id", async (req: Request, res: Response) => {
  try {
    let id = parseInt(req.params.id);
    if(id === NaN) throw new Error("Id must be a number");

    let booking = await Booking.findOne(id);
    if(booking === undefined) throw new Error("Booking not found");

    let reply = await Booking.remove(booking);
    if(typeof reply === 'undefined') res.status(200)
    res.send("Booking deleted");

  } catch (err) {
    console.log("Failed!\nError:\n", err);
    res.status(404);
    res.json((err as Error).message);
  }
});
router.delete("/api/booking", async (req: Request, res: Response) => {
  try {

    let bookings = await Booking.find();
    if(bookings === undefined) throw new Error("Booking not found");

    let reply = await Booking.remove(bookings);
    if(typeof reply === 'undefined') res.status(200)
    res.send("All bookings deleted");

  } catch (err) {
    console.log("Failed!\nError:\n", err);
    res.status(404);
    res.json((err as Error).message);
  }
});
router.post("/api/price", async (req: Request, res: Response) => {
  try {
    const calculatePriceDto = (await req.body) as GetPriceDto;

    console.log(calculatePriceDto);

    let bookingManager = new BookingManager(
      new PaymentManager(),
      new mailService()
    );
    const price = await bookingManager.getPriceForBooking(calculatePriceDto);
    if (isNaN(price))
      throw new Error(
        JSON.stringify({
          message: "Server could not calculate price",
          requestBody: req.body,
        })
      );
    console.log(
      JSON.stringify({
        message: "Server could not calculate price",
        requestBody: req.body,
        price: price,
      })
    );

    res.json(price);
    console.log("Success:\nPrice:\n" + price);
  } catch (err) {
    console.log("Failed!\nError:\n", err);
    res.json(err);
  }
});

export { router as bookingRouter };
