export class travelPlan {
  id!: string;
  train!: string;
  trainId!: string;
  maxCount!: number;
  bookedTickets!: number;
  pricePerStop!: number;
  departured!: boolean;
  routeEvents!: routeEvent[];
}

export class routeEvent {
  dateTime!: string;
  location!: string;
  eventType!: string;
}
