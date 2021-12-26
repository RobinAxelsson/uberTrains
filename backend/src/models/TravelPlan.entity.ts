import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TrainUnit } from "./TrainUnit.entity";

@Entity()
export class TravelPlan {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  planId: string;
  @Column()
  tripName: string;
  @OneToMany(() => TrainUnit, trainUnit => trainUnit.travelPlan)
  trainUnits: TrainUnit[];
  @Column()
  routeEventIds: string;
  @Column()
  priceModel: string;
}
