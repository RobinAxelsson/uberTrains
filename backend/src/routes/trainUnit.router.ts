import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { TrainUnit } from '../models/TrainUnit.entity';

const router = express.Router();

router.get("/api/trainUnit", async (req: Request, res: Response) => {
  let trainUnitRepository = (await getRepository(TrainUnit));
  let bookings = await trainUnitRepository.find({relations: ["travelPlan"]});
  res.json(bookings);
});

export {router as trainUnitRouter}