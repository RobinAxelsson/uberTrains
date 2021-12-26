import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TravelPlan {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column()
  PlanId: string;
  @Column()
  TripName: string;
  TrainUnitIds: string;
  @Column()
  RouteEventIds: string;
  @Column()
  PriceModel: string;
}
