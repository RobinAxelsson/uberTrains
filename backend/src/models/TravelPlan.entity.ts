import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PriceModel } from "./PriceModel.entity";
import { RouteEvent } from "./RouteEvent.entity";
import { TrainUnit } from "./TrainUnit.entity";

@Entity()
export class TravelPlan extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  planId: string;
  @Column()
  tripName: string;
  @OneToMany(() => TrainUnit, trainUnit => trainUnit.travelPlan, {nullable: true})
  trainUnits: TrainUnit[];
  @OneToMany(() => RouteEvent, routeEvent => routeEvent.travelPlan)
  routeEvents: RouteEvent[];
  @ManyToOne(() => PriceModel, priceModel => priceModel.travelPlans)
  priceModel: PriceModel;
}
