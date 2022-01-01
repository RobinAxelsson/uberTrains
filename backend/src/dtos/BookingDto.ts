export class BookingDto {
  seatIds: number[];
  startStation: string;
  endStation: string;
  paymentInfo: {
    stripeBookingNumber: string;
    email: string;
    totalPrice: number;
  };
}