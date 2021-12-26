import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  BookingNumber: string;

  @Column()
  LocalDateTime: string;

  @Column()
  PurchasedTickets: number;

  @Column()
  StartStation: string;

  @Column()
  EndStation: string;

  @Column()
  TotalPrice: number;

}
