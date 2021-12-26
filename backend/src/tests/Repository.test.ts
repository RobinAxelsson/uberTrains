import { Booking } from '../models/Booking.entity';
import { Guid } from '../services/UtilityFunctions';
import { BookingRepository } from '../services/BookingRepository';
function sum(a: number, b: number) {
  return a + b;
}


test("adds 1+2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

function getBookingRandomBookingNumb(){
  let booking = new Booking();
  booking.BookingNumber = Guid.newGuid();
  booking.StartStation = "Goteborg";
  booking.EndStation = "Stockholm";
  booking.LocalDateTime = new Date().toUTCString();
  booking.PurchasedTickets = 3;
  booking.TotalPrice = 133769;
  return booking;
}
function getTypedBookingNumb(){
  var booking = getBookingRandomBookingNumb();
  booking.BookingNumber = "static-guid-booking-number";
  return booking;
}
// test("Add booking expect success", async () =>{
//   let bookingRepo = new BookingRepository();
//   let booking = getBookingRandomBookingNumb();
//   let actual = await bookingRepo.Create(booking);
//   console.log(JSON.stringify(actual));
//   expect(actual).toBe(booking);
  
// })

// test("Delete booking expect success", async () =>{
//   let bookingRepo = new BookingRepository();
//   let booking = getTypedBookingNumb();
//   await bookingRepo.Create(booking);
//   let actual = await bookingRepo.Delete(booking);

//   expect(actual).toBe(true);
// })

test("Delete booking expect fail", async () =>{
  let bookingRepo = new BookingRepository();
  let booking = getTypedBookingNumb();
  await bookingRepo.Create(booking);
  let actual = await bookingRepo.Delete(booking);

  expect(actual).toBe(false);
})