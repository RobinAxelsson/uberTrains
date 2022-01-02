import express, { Request, Response } from 'express';
import { TravelPlan } from '../models/TravelPlan.entity';
import { TravelPlanner } from '../services/TravelPlanner';

const router = express.Router();
router.get("/api/journey", async (req: Request, res: Response) => {
  const {end, start, date} = req.query;
  const travelPlanner = new TravelPlanner();
  const ids = await travelPlanner.getTravelPlanIdsByInput((start as string).toLowerCase(), (end as string).toLowerCase(), date as string);
  
  let travelPlans = [] as TravelPlan[];
  for (const id of ids) {
    const plan = await travelPlanner.getFullTravelPlanById(id)  
    travelPlans.push(plan);
  }
  
  res.json(travelPlans);
});

router.get("/api/travelPlan/:id", async (req: Request, res: Response) => {
  const travelPlanner = new TravelPlanner();
  const travelPlan = await travelPlanner.getFullTravelPlanById(parseInt(req.params.id));
  res.json(travelPlan);
});

export {router as travelPlanRouter}