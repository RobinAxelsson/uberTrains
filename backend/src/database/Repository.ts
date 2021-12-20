import { connect } from "net";
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { Booking } from "../models/Booking";

export class Repository {

AddBooking(bookingNumber:string, totalPrice:number) {
createConnection().then(async connection => {

const booking = new Booking();
booking.bookingNumber = bookingNumber;
booking.totalPrice = totalPrice;
await connection.manager.save(booking);

});
}
RemoveBooking(booking:Booking) {
    createConnection().then(async connection => {

    await connection.manager.remove(booking);

    });
}

}