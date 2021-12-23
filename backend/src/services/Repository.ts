import "reflect-metadata";
import { Booking } from "../models/Booking";
import {Guid} from "./UtilityFunctions";
import { createConnection } from 'typeorm';


export class repository {
//#region Bookings
async AddBooking (totalPrice:number, startStationName:string, endStationName:string, purchasedTickets:number) {
    let booking = new Booking();
    booking.BookingNumber = Guid.newGuid();
    booking.TotalPrice = totalPrice;
    let date = new Date();
    booking.LocalDateTime = date.toDateString() + " " + date.toTimeString();
    await createConnection().then(async connection => {
        booking.StartStation = startStationName;
        booking.EndStation = endStationName;
        booking.TotalPrice = totalPrice;
        booking.PurchasedTickets = purchasedTickets;
        booking.TotalPrice 
        await connection.manager.save(booking).catch(async err => {
            console.log(JSON.stringify(err));
            await connection.close();
            return false;
        });
        await connection.close();
}).catch(err => {
    console.log(JSON.stringify(err));
    return false;
});
return true;
}

private async BookingExist(bookingNumber:string){
    await createConnection().then(async connection => {
        let bookings = await connection.manager.find(Booking).catch(async err => {
            console.log(JSON.stringify(err));
            await connection.close();
            return null;
        });
        await connection.close();
        let checkBooking = (x:Booking) => x.BookingNumber == bookingNumber;
        if(bookings.filter(checkBooking).length != 0) {
            return true;
        }
    }).catch(err => {
        console.log(JSON.stringify(err));
        return null;
    });
    return false;
}


async AddBookingByObject(booking:Booking) {
    if((await this.BookingExist(booking.BookingNumber)) == false) {
        return false;
    }
    await createConnection().then(async connection => {
            await connection.manager.save(booking).catch(async err => {
                console.log(JSON.stringify(err));
                await connection.close();
                return false;
            });
            await connection.close();
        }).catch(async err => {
            console.log(JSON.stringify(err));
            return false;
        });
        return true;
}


async RemoveBooking(booking:Booking) {
    if((await this.BookingExist(booking.BookingNumber)) == false) {
        return false;
    }
    await createConnection().then(async connection => {
    await connection.manager.remove(booking).catch(async err => {
        console.log(JSON.stringify(err));
        await connection.close();
        return false;
    });
    await connection.close();
    }).catch(err => {
        console.log(JSON.stringify(err));
        return false;
    });
    return true;
}
async RemoveBookingByBookingNumber(bookingNumber:string) {
    if((await this.BookingExist(bookingNumber)) == false) {
        return false;
    }
    await createConnection().then(async connection => {
        let bookings = await connection.manager.find(Booking).catch(async err => {
            console.log(JSON.stringify(err));
            await connection.close();
            return false;
        });
            await connection.manager.remove(bookings.find(x => x.BookingNumber == bookingNumber)).catch(async err => {
                console.log(JSON.stringify(err));
                await connection.close();
                return false;
            });
        await connection.close();
        }).catch(err => {
            console.log(JSON.stringify(err));
            return false;
        });
        return true;
}

async GetBookings() {
    let bookings:Booking[] = []
        await createConnection().then(async connection => {
            bookings = await connection.manager.find(Booking).catch(async err => {
                console.log(JSON.stringify(err));
            });
            await connection.close();
        }).catch(err => {
            console.log(JSON.stringify(err));
        });
        return bookings;
}
async GetBookingByBookingNumber(bookingNumber:string) {
    let booking;
    await createConnection().then(async connection => {
        booking = (await this.GetBookings()).find(obj => obj.BookingNumber == bookingNumber);
        await connection.close();
    }).catch(err => {
        console.log(JSON.stringify(err));
    });
    return booking;
    }
async UpdateBooking(inputBookingId:number, newBooking:Booking) {
    if((await this.BookingExist(bookingNumber)) == false) {
        return false;
    }
        await createConnection().then(async connection => { 
        await connection.manager.update(Booking, inputBookingId, newBooking).catch(async err => {
            console.log(JSON.stringify(err));
            await connection.close();
            return false;
        });
        await connection.close();
    }).catch(async err => {
        console.log(JSON.stringify(err));
        return false;
    });
    return true;
}
//#endregion Bookings
}

