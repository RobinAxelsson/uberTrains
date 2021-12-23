import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TrainUnit } from './TrainUnit';

@Entity()
export class Seat {

  @PrimaryGeneratedColumn()
  Id: number;
  @Column()
  SeatNumber: string;
  @ManyToOne(() => TrainUnit, trainUnit => trainUnit.Seats)
  TrainUnit: TrainUnit;
  @Column()
  BookingNumber!: string;
}
