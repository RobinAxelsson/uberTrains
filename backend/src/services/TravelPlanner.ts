import { createQueryBuilder, getConnection, getManager, getRepository } from "typeorm";
import { BookingDto } from "../dtos/BookingDto";
import { Booking } from "../models/Booking.entity";
import { Seat } from "../models/Seat.entity";
import { TravelPlan } from "../models/TravelPlan.entity";
import { Guid } from "./UtilityFunctions";

export class TravelPlanner {
  async getFullTravelPlanById(id:number){
    return await createQueryBuilder(TravelPlan)
    .leftJoinAndSelect("TravelPlan.routeEvents", "RouteEvent")
    .leftJoinAndSelect("TravelPlan.trainUnits", "TrainUnit")
    .leftJoinAndSelect("TrainUnit.seats", "Seat")
    .leftJoinAndSelect("Seat.booking", "Booking")
    .where("travelPlan.id = :id", {id: id})
    .getOne() as TravelPlan;
  }
  async getTravelPlanIdsByInput(start:string, end:string, date:string){
    const entityManager = getManager();

    const startDate = new Date(date);
    const addDay = new Date(date);
    addDay.setDate(addDay.getDate() + 1);

    let date1 = startDate.toISOString();
    let date2 = addDay.toISOString();

    let data = await entityManager.query(
    `SELECT r.travelPlanId
    FROM (
        SELECT travelPlanId, GROUP_CONCAT(location) AS locations
        FROM route_event
        WHERE dateTime BETWEEN '${date1}' AND '${date2}'
        AND (location='${start}' OR location='${end}')
        GROUP BY travelPlanId
        ORDER BY dateTime
    ) AS r
    WHERE r.locations = '${start},${end}'
    ORDER BY travelPlanId`
    ) as any;

    return [...data].map((x: any) => x.travelPlanId);
  }
  async bookSeats(bookingDto: BookingDto){
  
    const booking = {
      bookingNumber: Guid.newGuid(),
      localDateTime: Date().toString(),
      email: bookingDto.paymentInfo.email,
      totalPrice: bookingDto.paymentInfo.totalPrice,
      stripeBookingNumber: bookingDto.paymentInfo.stripeBookingNumber,
      startStation: bookingDto.startStation,
      endStation: bookingDto.endStation,
      bookedSeats: [] as Seat[]
    } as Booking;
  
    for (const id of bookingDto.seatIds) {
      const seat = await Seat.findOne(id);
      booking.bookedSeats.push(seat as Seat);
      await Seat.save(seat as Seat);
    }
  
    const dbBooking = await Booking.save(booking);
    return dbBooking;
  }
}
function createQueryRunner() {
  throw new Error("Function not implemented.");
}

