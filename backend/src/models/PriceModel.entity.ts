import { Entity } from "typeorm/decorator/entity/Entity";
import { BaseEntity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TravelPlan } from './TravelPlan.entity';
@Entity()
export class PriceModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToMany(() => TravelPlan, travelPlan => travelPlan.priceModel)
  travelPlans: TravelPlan[];
  @Column()
  trainTypeMultiplyer: number;
  @Column()
  priceConstant: number;
}
