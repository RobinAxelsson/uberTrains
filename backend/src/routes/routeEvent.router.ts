import express, { Request, Response } from "express";
import { RouteEvent } from "../models/RouteEvent.entity";
import { DbEntityManager } from "../services/DbEntityManager";

const router = express.Router();
router.get("/api/routeEvent/:id", async (req: Request, res: Response) => {

  try {
    let {id} = await req.params;
    let routeEvents = await RouteEvent.find({
      relations: ["travelPlan"],
      where: {id: id}
    });
    res.json(routeEvents);
  } catch (err) {
    console.log("Failed!\nError:\n", err);
    res.json(err);
  }
});

router.post("/api/routeEvent", async (req: Request, res: Response) => {
  try {
    const dbEntityManager = new DbEntityManager();
    const routeEvent = await dbEntityManager.InsertRouteEvent(req.body);
    res.json(routeEvent);
  } catch (err) {
    console.log("Failed!\nError:\n", err);
    res.json(err);
  }
});

export { router as routeEventRouter };
