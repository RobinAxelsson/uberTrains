import "reflect-metadata";
import {Booking} from "../models/Booking.entity"
import {Guid} from "./UtilityFunctions";
import { createConnection } from 'typeorm';

//Single responsibility
export class BookingRepository {

// private async Exists(bookingNumber:string){
   
//     return this.GetSingle(bookingNumber) != null;
// }

// async GetSingle(bookingNumber:string) {
//     let booking;
//      booking = (await this.GetAll()).find(obj => obj.BookingNumber == bookingNumber);
//      return booking;
// }

//Create
//Find
//Update
//Delete

async Create(booking:Booking) {
    return await createConnection().then(async connection => {
            let response = await connection.manager.save(booking).catch(async err => {
                console.log(JSON.stringify(err));
                return null;
            });
            console.log(JSON.stringify(response));
            await connection.close();
            return response;
        }).catch(async err => {
            await console.log(JSON.stringify(err));
            return null;
        });
}


// async Update(booking:Booking) {
//     if((await this.Exists(booking.BookingNumber)) == false) {
//         return false;
//     }
//         await createConnection().then(async connection => { 
//         await connection.manager.update(Booking, booking.Id, booking).catch(async err => {
//             console.log(JSON.stringify(err));
//             await connection.close();
//             return false;
//         });
//         await connection.close();
//     }).catch(async err => {
//         console.log(JSON.stringify(err));
//         return false;
//     });
//     return true;
// }
async Delete(booking:Booking) {
    return await createConnection().then(async connection => {
    let response = await connection.manager.remove(booking).catch(async err => {
        console.log(JSON.stringify(err));
        await connection.close();
        return null;
    });
    console.log(JSON.stringify(response));
    await connection.close();

    return response;
    }).catch(err => {
        console.log(JSON.stringify(err));
        return null;
    });
}
// async RemoveBookingByBookingNumber(bookingNumber:string[] | string) {
//     let connection = await createConnection();
//     if(!Array.isArray(bookingNumber)) {
//         let success = true;
    
//         let booking = this.GetSingle(bookingNumber);
//         if(booking == null) return false;
//         await createConnection().then(async connection => {
//                 await connection.manager.remove(booking).catch(async err => {
//                     console.log(JSON.stringify(err));
//                     success = false;
//                 });
                
//             await connection.close();
//             }).catch(err => {
//                 console.log(JSON.stringify(err));
//                 success = false;
//             });
//         return success;
//     }

//     else {
        
//     }
//     }
  

// async GetAll() {
//     let bookings:Booking[] = []
//         await createConnection().then(async connection => {
//             bookings = await connection.manager.find(Booking).catch(err => {
//             return [];
//             });
//             await connection.close();
//         }).catch(err => {
//             console.log(JSON.stringify(err));
//         });
//         return bookings;
// }
}

//#endregion Bookings
