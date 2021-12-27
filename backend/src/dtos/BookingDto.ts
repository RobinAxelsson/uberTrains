export class BookingDto {
  travelPlanId: string;
  startStation: string;
  endStation: string;
  seatBookings: seatBooking[];
  paymentInfo: {
    stripeBookingNumber: string;
    email: string;
    totalPrice: number;
  };
}
class seatBooking{
    carriage: string
    seat: string
  }