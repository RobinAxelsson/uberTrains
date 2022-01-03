import { PriceModel } from "../models/PriceModel.entity";

export class PriceCalculator {
  getPrice(priceModel: PriceModel, distance: number) {
    return (
      Math.round(
        priceModel.priceConstant *
          (distance * priceModel.trainTypeMultiplyer) *
          100
      ) / 100
    );
  }

  getDistance(startCoords: Coordinates, endCoords: Coordinates) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(endCoords.latitude - startCoords.latitude); // deg2rad below
    var dLon = this.deg2rad(endCoords.longitude - startCoords.longitude);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(startCoords.latitude)) *
        Math.cos(this.deg2rad(endCoords.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return Math.round(d * 100) / 100;
  }
  private deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }
}
export class Coordinates {
  latitude: number;
  longitude: number;
}
