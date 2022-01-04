import express, { Request, Response } from "express";
import { getRepository } from "typeorm";
import { RouteEvent } from "../models/RouteEvent.entity";

const router = express.Router();
router.get("/api/routeEvent/:id", async (req: Request, res: Response) => {
  let params = await req.params;
  let routeEventRepository = await getRepository(RouteEvent);
  let routeEvents = await routeEventRepository.find({
    relations: ["travelPlan"],
    where: {id: params.id}
  });
  res.json(routeEvents);
});

export { router as routeEventRouter };
