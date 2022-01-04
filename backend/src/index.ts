import "reflect-metadata";
import { createConnection } from "typeorm";
import { seed } from "./services/Seeder";
import { testRouter } from "./routes/test.router";
import { travelPlanRouter } from "./routes/travelPlan.router";
import { bookingRouter } from "./routes/booking.router";
import { trainUnitRouter } from "./routes/trainUnit.router";
import { seatRouter } from "./routes/seat.router";
import { routeEventRouter } from "./routes/routeEvent.router";
import { PriceCalculator } from "./services/PriceCalculator";
import { copyFileSync } from "fs";
import { Request, Response } from "express";
const settings = require("../settings.json");
const path = require("path");
const express = require("express");
const webServer = express();
const stripe = require("stripe")(
  "sk_test_51K7JpMAwp97GmluXslTTgNnwx2H7CBcUwDpIOjhZoR3gV6LxY6ZZIUnqVdlzdjOWGhVWS2owaJ3SACXg7F6G2Kqs00B1E5iMEs"
);
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

if (process.env.NODE_ENV === "Development") {
  createConnection()
    .then(async () => {
      await seed();
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
webServer.post("/checkout", async (req: Request, res: Response) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const charge = await stripe.charges.create({
      amount: 400 * 100,
      currency: "sek",
      customer: customer.id,
      receipt_email: token.email,
      description: `Purchased the test`,
      shipping: {
        name: token.card.name,
        address: {
          line1: token.card.address_line1,
          line2: token.card.address_line2,
          city: token.card.address_city,
          country: token.card.address_country,
          postal_code: token.card.address_zip,
        },
      },
    });

    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});
