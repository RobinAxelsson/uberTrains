export class BookingDto {
  startRouteEventId: number;
  endRouteEventId: number;
  seatIds: number[];
  travelPlanId: number;
  paymentInfo: {
    stripeBookingNumber: string;
    email: string;
  };
}