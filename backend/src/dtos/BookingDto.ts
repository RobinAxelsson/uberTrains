import { PriceModel } from "../models/PriceModel.entity";
import { Coordinates } from "../services/PriceCalculator";

export class BookingDto {
  startStation: station;
  endStation: station;
  seatIds: number[];
  priceModel: PriceModel;
  paymentInfo: {
    stripeBookingNumber: string;
    email: string;
    totalPrice: number;
  };
}
export class station {
  name: string;
  coordinates: Coordinates;
}
