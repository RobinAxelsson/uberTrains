import { Seat } from "./Seat.entity";
import { Entity } from "typeorm/decorator/entity/Entity";
import { BaseEntity, Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RouteEvent } from "./RouteEvent.entity";

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

  @ManyToOne(() => RouteEvent, routeEvent => routeEvent.startBookings)
  startStation: RouteEvent;
  @ManyToOne(() => RouteEvent, routeEvent => routeEvent.endBookings)
  endStation: RouteEvent;
  @Column({nullable: true})
  totalPrice: number;
  @Column({nullable: true})
  email: string;

  @Column({nullable: true})
  stripeId: string;

}
