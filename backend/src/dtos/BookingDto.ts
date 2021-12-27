export class BookingDto {
  startStation: string;
  endStation: string;
  seatIds: string[];
  paymentInfo: {
    stripeBookingNumber: string;
    email: string;
    totalPrice: number;
  };
}