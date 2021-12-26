import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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
  EventType: string; //arrival, departure (and extendable crossings etc)
}
