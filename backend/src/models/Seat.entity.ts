import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./Booking.entity";
import { TrainUnit } from './TrainUnit.entity';

@Entity()
export class Seat {

  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  seatNumber: string;
  @ManyToOne(() => TrainUnit, trainUnit => trainUnit.seats)
  trainUnit: TrainUnit;
  @ManyToOne(() => Booking, booking => booking.bookedSeats)
  booking!:Booking
}
