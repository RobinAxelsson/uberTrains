import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class PaymentModel {
  @PrimaryGeneratedColumn()
    Id: string;
    