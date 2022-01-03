import {
  Brackets,
  createQueryBuilder,
  getManager,
  getRepository,
} from "typeorm";
import { RouteEvent } from "../models/RouteEvent.entity";
import { TravelPlan } from "../models/TravelPlan.entity";

export class TravelPlanner {
  async getFullTravelPlanById(id: number) {
    return (await createQueryBuilder(TravelPlan)
      .leftJoinAndSelect("TravelPlan.routeEvents", "RouteEvent")
      .leftJoinAndSelect("TravelPlan.trainUnits", "TrainUnit")
      .leftJoinAndSelect("TrainUnit.seats", "Seat")
      .leftJoinAndSelect("Seat.booking", "Booking")
      .where("travelPlan.id = :id", { id: id })
      .getOne()) as TravelPlan;
  }
  async getFullTravelPlanByStartStopDate(start: string, end: string, date: string) {
    
    const startDate = new Date(date);
    const addDay = new Date(date);
    addDay.setDate(addDay.getDate() + 1);

    let date1 = startDate.toISOString();
    let date2 = addDay.toISOString();
    
    const travelPlans = (await createQueryBuilder(TravelPlan)
      .leftJoinAndSelect("TravelPlan.routeEvents", "RouteEvent")
      .leftJoinAndSelect("TravelPlan.trainUnits", "TrainUnit")
      .leftJoinAndSelect("TrainUnit.seats", "Seat")
      .leftJoinAndSelect("Seat.booking", "Booking")
      .where("RouteEvent.dateTime BETWEEN :date1 AND :date2", {
        date1: date1,
        date2: date2,
      })
      .andWhere(
        new Brackets((qb) => {
          qb.where("RouteEvent.location = :loc1", { loc1: start }).orWhere(
            "RouteEvent.location = :loc2",
            { loc2: end }
          );
        })
      )
      .getMany()) as TravelPlan[];

      return this.filterPlans(travelPlans, date, start, end);
  }
  async getTravelPlanInfo(start: string, end: string, date: string) {
    const entityManager = getManager();

    const startDate = new Date(date);
    const addDay = new Date(date);
    addDay.setDate(addDay.getDate() + 1);

    let date1 = startDate.toISOString();
    let date2 = addDay.toISOString();

    const builder = await getRepository(RouteEvent)
      .createQueryBuilder("route")
      .select("GROUP_CONCAT(route.dateTime)", "eventDates")
      .addSelect("GROUP_CONCAT(location)", "orderedLocations")
      .addSelect(subQuery => {
        return subQuery
            .select("travelPlan.id", "travelPlanId")
            .from(TravelPlan, "travelPlan")
    }, "travelPlanId")
    .addSelect(subQuery => {
      return subQuery
          .select("travelPlan.tripName", "tripName")
          .from(TravelPlan, "travelPlan")
  }, "tripName")
      .where("route.dateTime BETWEEN :date1 AND :date2", {
        date1: date1,
        date2: date2,
      })
      .andWhere(
        new Brackets((qb) => {
          qb.where("route.location = :loc1", { loc1: start }).orWhere(
            "route.location = :loc2",
            { loc2: end }
          );
        })
      )
      //.orderBy("route.dateTime")
      .groupBy("travelPlanId")

    const sql = builder.getSql();
    console.log(sql);

    let data = await builder.getRawMany();
    // console.log(data);
    return data;
  }
  filterPlans(
    travelPlans: TravelPlan[],
    date: any,
    startLocation: any,
    endLocation: any
  ) {
    if (
      typeof date !== "string" ||
      typeof startLocation !== "string" ||
      typeof endLocation !== "string"
    )
      return null;

    return travelPlans
      .filter((x) => this.hasCorrectDate(x, date))
      .filter((x) =>
        this.containsStartStopInOrder(x, startLocation, endLocation)
      );
  }
  private hasCorrectDate(travelPlan: TravelPlan, date: string) {
    return travelPlan.routeEvents.some(
      (x) => new Date(x.dateTime).getDay() === new Date(date).getDay()
    );
  }

  private containsStartStopInOrder(
    travelPlan: TravelPlan,
    locationStart: string,
    locationEnd: string
  ) {
    var startEvent = travelPlan.routeEvents.find(
      (x) => x.location.toLowerCase() === locationStart.toLowerCase()
    );
    var endEvent = travelPlan.routeEvents.find(
      (x) => x.location.toLowerCase() === locationEnd.toLowerCase()
    );
    return (
      startEvent !== undefined &&
      endEvent !== undefined &&
      new Date(startEvent.dateTime) < new Date(endEvent.dateTime)
    );
  }
}
