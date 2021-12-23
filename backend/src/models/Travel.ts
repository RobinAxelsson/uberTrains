import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import {station} from "./Station";

export class travelPlan {

  id!: string;

  train!: string;

  trainId!: string;

  maxCount!: number;

  bookedTickets!: number;

  pricePerStop!: number;

  departured!: boolean;

  routeEvents!: routeEvent[];
}

export class routeEvent {

  dateTime!: string;

  location!: string;

  eventType!: string;
}

@Entity()
export class travelBooking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookingNumber: string;

  @Column()
  localDateTime: string;

  @Column()
  purchasedTickets: number;

  @Column()
  startStation: string;

  @Column()
  endStation: string;

  @Column()
  totalPrice: number;

}
