import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./Booking.entity";
import { TravelPlan } from "./TravelPlan.entity";
@Entity()
export class RouteEvent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string
  @OneToMany(() => Booking, booking => booking.startStation, {onDelete: 'SET NULL'})
  startBookings: Booking[]
  @OneToMany(() => Booking, booking => booking.endStation, {onDelete: 'SET NULL'})
  endBookings: Booking[]
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
