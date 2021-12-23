import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Seat } from "./Seat";

@Entity()
export class TrainUnit {
  @PrimaryGeneratedColumn()
  Id: string;
  @Column()
  Name: string;

  @OneToMany(() => Seat, seat => seat.TrainUnit)
  Seats: Seat[];
  @Column()
  Type: string;
}
