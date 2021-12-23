import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Seat } from "./Seat";

@Entity()
export class TrainUnit {
  @PrimaryGeneratedColumn()
  Id: string;
  @Column()
  Name: string;
  @Column()
  Seats: Seat[];
  @Column()
  Type: string;
}
