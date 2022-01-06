import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./Booking.entity";
import { TravelPlan } from "./TravelPlan.entity";
@Entity()
export class RouteEvent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string
  @ManyToMany(() => Booking, booking => booking.routeEvents)
  @JoinTable()
  bookings: Booking[]
  @Column()
  dateTime: string;
  @Column()
  location: string;
  @Column()
  latitude: number
  @Column()
  longitude: number
  @Column()
  specifiedLocation: string; //Like platform "perrong 4b"
  @Column()
  event: string; //arrival, departure (and extendable crossings etc)
  @ManyToOne(()=>TravelPlan, travelPlan => travelPlan.routeEvents)
  travelPlan: TravelPlan
}
