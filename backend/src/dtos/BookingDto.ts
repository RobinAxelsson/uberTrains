import { PriceModel } from "../models/PriceModel.entity";
import { Coordinates } from "../services/PriceCalculator";

export class BookingDto {
  seatIds: number[];
  startStation: station;
  endStation: station;
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