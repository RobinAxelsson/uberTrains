import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Booking {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bookingNumber: string;

    @Column()
    totalPrice: number;
}