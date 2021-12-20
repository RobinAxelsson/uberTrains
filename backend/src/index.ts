import { Request, Response } from "express";
import { TravelPlanner } from "./services/TravelPlanner";
import "reflect-metadata";

import { Connection, createConnection } from "typeorm";
import { userInfo } from "os";

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
