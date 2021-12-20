import { connect } from "net";
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { Booking } from "../models/Booking";

export class Repository {

async AddBooking (bookingNumber:string, totalPrice:number) {
    const booking = new Booking();
    booking.bookingNumber = bookingNumber;
    booking.totalPrice = totalPrice;
    await createConnection().then(async connection => {
        await connection.manager.save(booking);
        await connection.close();
});
}

async RemoveBooking(booking:Booking) {
    await createConnection().then(async connection => {
    await connection.manager.remove(booking);
    await connection.close();
    });
}

async GetBookings() {
    let bookings:Booking[] = []
        await createConnection().then(async connection => {
            bookings = await connection.manager.find(Booking);
            await connection.close();
        });
        return bookings;
}
}