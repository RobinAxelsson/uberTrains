export class BookingDto {
  startRouteEventId: number;
  endRouteEventId: number;
  seatIds: number[];
  travelPlanId: number;
  stripeInfo: StripeInfo;
}

export class StripeInfo
{
  email:string
  id: string
  name: string
}