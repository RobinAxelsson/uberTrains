import { Request, Response } from "express";
import "reflect-metadata";

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
// webServer.get("/api/journey", (req: Request, res: Response) => {

// Add repository code!

//   res.json(plan);
// });


