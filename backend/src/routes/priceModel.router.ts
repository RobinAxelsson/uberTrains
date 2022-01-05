import express, { Request, Response } from "express";
import { PriceModel } from "../models/PriceModel.entity";

const router = express.Router();
router.get("/api/priceModel/:id", async (req: Request, res: Response) => {
  try {
    let id = await req.params.id;
    console.log("id from request is: "+ id)
    let priceModel = await PriceModel.findOne(parseInt(id));
    res.json(priceModel);
  } catch (err) {
    console.log("Failed!\nError:\n", err);
    res.json(err);
  }
});

router.post("/api/priceModel", async (req: Request, res: Response) => {
  try {
    const priceModel = await PriceModel.save(await req.body as PriceModel);
    res.json(priceModel);
  } catch (err) {
    console.log("Failed!\nError:\n", err);
    res.json(err);
  }
});

export { router as priceModelRouter };
