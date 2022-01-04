import express, { Request, Response } from 'express';
import { TravelPlanner } from '../services/TravelPlanner';

const router = express.Router();

router.get("/api/journey", async (req: Request, res: Response) => {
  try {
      const {end, start, date} = req.query;
      const travelPlanner = new TravelPlanner();
      const travelPlan = await travelPlanner.getFullTravelPlanByStartStopDate((start as string).toLowerCase(), (end as string).toLowerCase(), date as string);
      res.json(travelPlan);
  } catch (err) {
    console.log("Failed!\nError:\n", err);
    res.json(err);
  }
});
router.get("/api/travelPlan/:id", async (req: Request, res: Response) => {
  try {
    const travelPlanner = new TravelPlanner();
    const travelPlan = await travelPlanner.getFullTravelPlanById(parseInt(req.params.id));
    res.json(travelPlan);
  } catch (err) {
    console.log("Failed!\nError:\n", err);
    res.json(err);
  }
 
});

export {router as travelPlanRouter}