import "reflect-metadata";
import {createConnection } from "typeorm";
import { travelBooking } from "../models/Travel";
import {station} from "../models/Station";
import {Guid} from "../services/Guid";
export class repository {

//#region Bookings
async AddBooking (totalPrice:number, startStationName:string, endStationName:string, purchasedTickets:number) {
    const Booking = new travelBooking();
    Booking.bookingNumber = Guid.newGuid();
    Booking.totalPrice = totalPrice;
    let date = new Date();
    Booking.localDateTime = date.toDateString() + " " + date.toTimeString();
    let success = true;
    let stations:station[] = [];
    await createConnection().then(async connection => {
        stations = await connection.manager.find(station);
        Booking.startStation = startStationName;
        Booking.endStation = endStationName;
        Booking.totalPrice = totalPrice;
        Booking.purchasedTickets = purchasedTickets;
        Booking.totalPrice 
        await connection.manager.save(Booking).catch(err => {
            success = false;
        });
        await connection.close();
}).catch(err => {
    success = false;
});
return success;
}

async AddBookingByObject(booking:travelBooking) {
let success = true;
await createConnection().then(async connection => {
    let bookings = await connection.manager.find(travelBooking);
    if(bookings.filter(x => x.bookingNumber == booking.bookingNumber).length == 0) {
        await connection.manager.save(booking).catch(err => {
            success = false;
        })
    }
    else {
        success = false;
    }
    await connection.close();
}).catch(err => {
    success = false;
});
return success;
}


async RemoveBooking(Booking:travelBooking) {
    let success = true;
    await createConnection().then(async connection => {
    await connection.manager.remove(Booking).catch(err => {
success = false;
    });
    await connection.close();
    }).catch(err => {
        success = false;
    });
    return success;
}
async RemoveBookingByBookingNumber(bookingNumber:string) {
    let success = true;
    await createConnection().then(async connection => {
        let bookings = await connection.manager.find(travelBooking);
        if(bookings.filter(x => x.bookingNumber == bookingNumber).length == 1) {
            await connection.manager.remove(bookings.find(x => x.bookingNumber == bookingNumber)).catch(err => {
                success = false;
            });
        }
        await connection.close();
        }).catch(err => {
            success = false;
        });
        return success;
}

async GetBookings() {
    let bookings:travelBooking[] = []
        await createConnection().then(async connection => {
            bookings = await connection.manager.find(travelBooking);
            await connection.close();
        });
        return bookings;
}
async GetBookingByBookingNumber(bookingNumber:string) {
    let booking;
    await createConnection().then(async connection => {
        
        booking = await (await this.GetBookings()).find(obj => obj.bookingNumber == bookingNumber);
        await connection.close();
    })
    return booking;
    }
async UpdateBooking(inputBookingId:number, newBooking:travelBooking) {
    let success = true;
    await createConnection().then(async connection => { 
        await connection.manager.update(travelBooking, inputBookingId, newBooking).catch(err => {
            success = false;
        });
    }).catch(err => {
        success = false;
    });
    return success;
}
//#endregion Bookings

//#region Stations(Eventuellt kastas)
async AddStation(stationName:string) {
    let Station = new station();
    Station.name = stationName;
    let success = true;
    await createConnection().then(async connection => {
     let stations = await connection.manager.find(station);
     if(stations.filter(x => x.name == stationName).length == 0) {
        await connection.manager.save(Station).catch(err => {
            success = false;
        });

     }
     await connection.close();
    }).catch(err => {
        success = false;
    });
    return success;
}
async RemoveStation(Station:station) {
    await createConnection().then(async connection => {
        await connection.manager.remove(Station);
        await connection.close();
        });
}
async RemoveStationByName(stationName:string) {
    let success = true;
    await createConnection().then(async connection => {
        let stations = await connection.manager.find(station);
        if(stations.filter(x => x.name == stationName).length == 1) {
            await connection.manager.remove(stations.find(x => x.name == stationName)).catch(err => {
                success = false;
            });
        }
        await connection.close();
        }).catch(err => {
            success = false;
        });
        return success;
}
async GetStations() {
    let stations:station[] = []
    await createConnection().then(async connection => {
        stations = await connection.manager.find(station);
        await connection.close();
    });
    return stations;
}
async GetStationByName() {

}
//#endregion


}

