import { Seat } from "./Seat.entity";
import { Entity } from "typeorm/decorator/entity/Entity";
import { BaseEntity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookingNumber: string;

  @Column()
  localDateTime: string;

  @OneToMany(() => Seat, seat => seat.booking, {onDelete: 'SET NULL'})
  bookedSeats: Seat[];

  @Column()
  startStation: string;

  @Column()
  endStation: string;
  @Column({nullable: true})
  totalPrice: number;
  @Column({nullable: true})
  email: string;

  @Column({nullable: true})
  stripeBookingNumber: string;

}
