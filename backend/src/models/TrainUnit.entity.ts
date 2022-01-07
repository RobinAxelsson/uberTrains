import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Seat } from "./Seat.entity";
import { TravelPlan } from './TravelPlan.entity';

@Entity()
export class TrainUnit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToOne(() => TravelPlan, travelPlan => travelPlan.trainUnits)
  travelPlan: TravelPlan;

  @OneToMany(() => Seat, seat => seat.trainUnit)
  seats: Seat[];
  @Column()
  type: string;
}
