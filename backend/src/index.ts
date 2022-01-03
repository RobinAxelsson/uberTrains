import { Request, Response } from "express";
import { TravelPlanner } from "./services/TravelPlanner";
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { userInfo } from "os";


const settings = require("../settings.json");
const path = require("path");
require("dotenv").config()
const express = require("express");
const webServer = express();
const stripe = require("stripe")("sk_test_51K7JpMAwp97GmluXslTTgNnwx2H7CBcUwDpIOjhZoR3gV6LxY6ZZIUnqVdlzdjOWGhVWS2owaJ3SACXg7F6G2Kqs00B1E5iMEs")
const bodyParser = require("body-parser")
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

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
  let plan = TravelPlanner.apiFilter(date, start, end);
  res.json(plan);
});

webServer.post("/checkout", async (req:Request, res:Response) => {
	console.log("Request:", req.body);
  
	let error;
	let status;
	try {
	  const { product, token } = req.body;
  
	  const customer = await stripe.customers.create({
		email: token.email,
		source: token.id
	  });
  
	  
	  const charge = await stripe.charges.create(
		{
		  amount: 400*100,
		  currency: "usd",
		  customer: customer.id,
		  receipt_email: token.email,
		  description: `Purchased the test`,
		  
		}
		
	  );

	  console.log("Charge:", { charge });
	  status = "success";
	 
	} catch (error) {
	  console.error("Error:", error);
	  status = "failure";
	}
  
	res.json({ error, status });
  });

// const driver = require("better-sqlite3");
// const db = driver(path.join(__dirname, "database", settings.dbName));
//
// webServer.get("/api/:table", (req: Request, res: Response) => {
//   let preparedStatement = db.prepare(`
//   SELECT *
//    FROM ${req.params.table}
//    `);
//   let result = preparedStatement.all();
//   res.json(result);
//});
