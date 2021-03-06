import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { seed, seedTravelPlan } from './services/Seeder';
import { testRouter } from './routes/test.router';
import { travelPlanRouter } from './routes/travelPlan.router';
import { bookingRouter } from './routes/booking.router';
import { trainUnitRouter } from './routes/trainUnit.router';
import { seatRouter } from './routes/seat.router';
import { routeEventRouter } from './routes/routeEvent.router';
import { priceModelRouter } from './routes/priceModel.router';

const settings = require('../settings.json');
const express = require('express');
const webServer = express();

require("dotenv").config();

const stripe = require("stripe")(
  "sk_test_51K7JpMAwp97GmluXslTTgNnwx2H7CBcUwDpIOjhZoR3gV6LxY6ZZIUnqVdlzdjOWGhVWS2owaJ3SACXg7F6G2Kqs00B1E5iMEs"
);

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

if (process.env.NODE_ENV === "Development") {
  createConnection()
    .then(async () => {
      await seedTravelPlan('2012-04-23');
      await seedTravelPlan('2022-01-11');
      await seedTravelPlan('2022-02-22');
    })
    .catch((error) => console.log(error));

  console.log("App is running in Development mode.");
} else if (process.env.NODE_ENV === "UnitTest") {
  console.log("App is running in UnitTest mode.");
} else {
  console.log("App is running in default Production mode.");
  createConnection().catch((error) => console.log(error));
}

webServer.use(cors(corsOptions));
webServer.use(express.static("frontend"));
webServer.use(express.json({ limit: "100MB" }));

webServer.listen(settings.port, () =>
  console.log("Listening on http://localhost:" + settings.port)
);

webServer.use(testRouter);
webServer.use(travelPlanRouter);
webServer.use(bookingRouter);
webServer.use(trainUnitRouter);
webServer.use(seatRouter);
webServer.use(routeEventRouter);
webServer.use(priceModelRouter);
