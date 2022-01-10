import express, { Request, Response } from 'express';
import { TravelPlanner } from '../services/TravelPlanner';
import { DbEntityManager } from '../services/DbEntityManager';
import { PriceCalculator } from '../services/PriceCalculator';

const router = express.Router();

router.get("/api/journey", async (req: Request, res: Response) => {
  try {
    const { end, start, date } = req.query;

    console.log(JSON.stringify({query: req.query}, null, '\t'));
    
    if(typeof end !== 'string' || typeof start !== 'string' || typeof date !== 'string') throw new Error("Invalid queryparams")

    let parsedStart = decodeURIComponent(start as string).toLowerCase();
    let parsedEnd = decodeURIComponent(end as string).toLowerCase();

    console.log(JSON.stringify({PARSED_START: parsedStart, PARSED_END: parsedEnd}, null, '\t'));

    const travelPlanner = new TravelPlanner();
    const travelPlans = await travelPlanner.getFullTravelPlanByStartStopDate(
      (start as string).toLowerCase(),
      (end as string).toLowerCase(),
      date as string,
    );

      (new PriceCalculator).addJourneyPrice(travelPlans, start as string, end as string);
      res.json(travelPlans);

    new PriceCalculator().addJourneyPrice(travelPlans, start as string, end as string);

    res.json(travelPlans);
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

router.post("/api/travelPlan", async (req: Request, res: Response) => {
  try {
    const dbEntityManager = new DbEntityManager();
    const travelPlan = await dbEntityManager.InsertTravelPlan(req.body);
    res.json(travelPlan);
  } catch (err) {
    console.log("Failed!\nError:\n", err);
    res.json(err);
  }
});

export {router as travelPlanRouter}