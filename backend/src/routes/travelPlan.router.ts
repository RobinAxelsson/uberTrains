import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { RouteEvent } from '../models/RouteEvent.entity';
import { Seat } from '../models/Seat.entity';
import { TrainUnit } from '../models/TrainUnit.entity';
import { TravelPlan } from '../models/TravelPlan.entity';

const router = express.Router();
router.get("/api/journey", (req: Request, res: Response) => {
  const {end, start, date} = req.query;
  
  
  res.json({});
});

router.get("/api/travelPlan", async (req: Request, res: Response) => {
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

export {router as travelPlanRouter}