import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { RouteEvent } from '../models/RouteEvent.entity';
import { Seat } from '../models/Seat.entity';

const router = express.Router();

router.get("/api/routeEvent", async (req: Request, res: Response) => {
  let routeEventRepository = (await getRepository(RouteEvent));
  let routeEvents = await routeEventRepository.find({relations: ["travelPlan"]});
  res.json(routeEvents);
});

export {router as routeEventRouter}