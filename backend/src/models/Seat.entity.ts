import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./Booking.entity";
import { TrainUnit } from './TrainUnit.entity';

@Entity()
export class Seat extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  seatNumber: string;
  @ManyToOne(() => TrainUnit, trainUnit => trainUnit.seats)
  trainUnit: TrainUnit;
  @ManyToOne(() => Booking, booking => booking.bookedSeats, {onDelete: "SET NULL"})
  booking!:Booking
}
