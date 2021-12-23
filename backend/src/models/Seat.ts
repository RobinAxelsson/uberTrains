import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./Booking";


@Entity()
export class Seat {

  @PrimaryGeneratedColumn()
  Id: string;
  @Column()
  Seat: number;
  @Column()
  Booking!: Booking;
}
