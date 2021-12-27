import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TravelPlan } from "./TravelPlan.entity";
@Entity()
export class RouteEvent {
  @PrimaryGeneratedColumn()
  id: string
  @Column()
  dateTime: string;
  @Column()
  location: string; //Mostly Station Name
  @Column()
  specifiedLocation: string; //Like platform "perrong 4b"
  @Column()
  event: string; //arrival, departure (and extendable crossings etc)
  @ManyToOne(()=>TravelPlan, travelPlan => travelPlan.routeEvents)
  travelPlan: TravelPlan
}
