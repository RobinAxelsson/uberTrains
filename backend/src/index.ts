import { Request, Response } from "express";
import "reflect-metadata";
import { BookingDto } from './dtos/BookingDto';
import { createConnection, getRepository } from 'typeorm';
import { TravelPlan } from "./models/TravelPlan.entity";
import { Seat } from "./models/Seat.entity";
import { seed } from "./services/Seeder";
import { Booking } from './models/Booking.entity';
import { TrainUnit } from "./models/TrainUnit.entity";
import { RouteEvent } from './models/RouteEvent.entity';
import { Guid } from './services/UtilityFunctions';

const settings = require("../settings.json");
const path = require("path");
const express = require("express");
const webServer = express();
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
if(process.env.NODE_ENV === "Development"){
  createConnection().then(async ()=>{
    await seed();
  }).catch(error => console.log(error));

  console.log("App is running in Development mode.")
}
else{
  createConnection().catch(error => console.log(error));
}

webServer.use(cors(corsOptions));

webServer.use(express.static("frontend"));

webServer.use(express.json({ limit: "100MB" }));

webServer.listen(settings.port, () =>
  console.log("Listening on http://localhost:" + settings.port)
);

webServer.get("/helloworld", (req: Request, res: Response) =>
  res.send("<h1>Hello World</h1>")
);
webServer.get("/query", (req: Request, res: Response) => {
  let params = req.query;
  res.json(params);
});
webServer.get("/api/journey", (req: Request, res: Response) => {
  let end = req.query.end;
  let start = req.query.start;
  let date = req.query.date;
  res.json({});
});
webServer.get("/api/seats", async (req: Request, res: Response) => {
  let seatRepository = (await getRepository(Seat));
  let seats = await seatRepository.find({ relations: ["trainUnit"]});
  console.log(JSON.stringify(seats));
  res.json(seats);
});
webServer.get("/api/travelPlan", async (req: Request, res: Response) => {
  let travelPlanRepository = (await getRepository(TravelPlan));
  let routeEventsRepository = (await getRepository(RouteEvent));
  let trainUnitRepository = (await getRepository(TrainUnit));
  let seatRepository = (await getRepository(Seat));

  let travelPlan = (await travelPlanRepository.find())[0];
  let routeEvents = await routeEventsRepository.find({where: {travelPlan: travelPlan}});
  let trainUnits = await trainUnitRepository.find({where: {travelPlan: travelPlan}});

  trainUnits[0].seats = await seatRepository.find({where:{trainUnit: trainUnits[0]}, relations: ["booking"]});
  trainUnits[1].seats = await seatRepository.find({where:{trainUnit: trainUnits[1]}, relations: ["booking"]});

  travelPlan.trainUnits = trainUnits;
  travelPlan.routeEvents = routeEvents;
  res.json(travelPlan);
});
webServer.get("/api/booking", async (req: Request, res: Response) => {
  let bookingRepository = (await getRepository(Booking));
  let bookings = await bookingRepository.find();
  res.json(bookings);
});
webServer.post("/api/booking", async (req: Request, res: Response) => {
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
webServer.get("/api/trainUnit", async (req: Request, res: Response) => {
  let trainUnitRepository = (await getRepository(TrainUnit));
  let bookings = await trainUnitRepository.find({relations: ["travelPlan"]});
  res.json(bookings);
});
webServer.get("/api/routeEvent", async (req: Request, res: Response) => {
  let routeEventRepository = (await getRepository(RouteEvent));
  let routeEvents = await routeEventRepository.find({relations: ["travelPlan"]});
  res.json(routeEvents);
});

