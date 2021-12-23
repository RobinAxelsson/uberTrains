import { Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class RouteEvent {
  @PrimaryGeneratedColumn()
  Id: string
  DateTime: string;
  Location: string; //Mostly Station Name
  SpecifiedLocation: string; //Like platform "perrong 4b"
  EventType: string; //arrival, departure (and extendable crossings etc)
}
