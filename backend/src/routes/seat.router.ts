import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Seat } from '../models/Seat.entity';

const router = express.Router();

router.get("/api/seat", async (req: Request, res: Response) => {
  let seatRepository = (await getRepository(Seat));
  let seats = await seatRepository.find({ relations: ["trainUnit"]});
  console.log(JSON.stringify(seats));
  res.json(seats);
});

export {router as seatRouter}