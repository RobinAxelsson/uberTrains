import { Request, Response } from "express";
import "reflect-metadata";
import { BookingDto } from './dtos/BookingDto';
import { createConnection } from 'typeorm';
import {seed} from './services/Seeder'
import { Booking } from "./models/Booking.entity";
import { TravelPlan } from "./models/TravelPlan.entity";
import { TrainUnit } from "./models/TrainUnit.entity";
import { Seat } from "./models/Seat.entity";
import { RouteEvent } from './models/RouteEvent.entity';

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
  createConnection({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [Booking, TravelPlan, TrainUnit, Seat, RouteEvent],
    synchronize: true,
    logging: true,
  });
  console.log("App is running in Development mode.")
  seed();
}
else{
  createConnection();
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
webServer.post("/api/booking", (req: Request, res: Response) => {
  let bookingDto = req.body as BookingDto;


  
});


