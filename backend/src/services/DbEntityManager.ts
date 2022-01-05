import { createQueryBuilder } from "typeorm";
import { PriceModel } from "../models/PriceModel.entity";
import { Seat } from "../models/Seat.entity";
import { TrainUnit } from "../models/TrainUnit.entity";
import { TravelPlan } from "../models/TravelPlan.entity";
import { RouteEvent } from "../models/RouteEvent.entity";
import { RouteEventDto, TravelPlanDto } from "../dtos/TravelPlanDto";

export class DbEntityManager {
  async InsertTravelPlan(travelPlanDto: TravelPlanDto) {
    const { planId, priceModelId, routeEvents, trainUnits, tripName } =
      travelPlanDto;

    let travelPlan = {
      planId: planId,
      tripName: tripName,
      priceModel: await PriceModel.findOne(priceModelId),
      routeEvents: routeEvents,
    } as TravelPlan;

    for (const tu of trainUnits) {
      for (const s of tu.seats) {
        await Seat.save(s);
      }
      await TrainUnit.save(tu);
    }

    for (const re of routeEvents) {
      const {
        dateTime,
        event,
        latitude,
        location,
        longitude,
        specifiedLocation,
      } = re;

      const routeEvent = {
        dateTime: dateTime,
        event: event,
        latitude: latitude,
        longitude: longitude,
        location: location,
        specifiedLocation: specifiedLocation,
      } as RouteEvent;

      await RouteEvent.save(routeEvent);
    }
    return await TravelPlan.save(travelPlan);
  }
  async InsertRouteEvent(routeEventDto: RouteEventDto){
    const routeEvent = routeEventDto as RouteEvent
    return await RouteEvent.save(routeEvent);
  }
}
