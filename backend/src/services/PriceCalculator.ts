import { TravelPlan } from '../models/TravelPlan.entity';
export class PriceCalculator {

  addJourneyPrice(travelPlans: TravelPlan[], start:string, end:string){
    
    let prices = [] as number[];

    for (const travelPlan of travelPlans) {
      let routeEvents = travelPlan.routeEvents.filter(t => t.location === start || t.location === end);
      let distance = this.calculateDistance(routeEvents[0].latitude, routeEvents[0].longitude, routeEvents[1].latitude, routeEvents[1].longitude);
      let price = this.calculatePrice(distance, travelPlan.priceModel.trainTypeMultiplyer, travelPlan.priceModel.priceConstant, 1);
      prices.push(price);
    }

    for (let i = 0; i < prices.length; i++) {
        (travelPlans[i] as any).price = prices[i];
    }
    return {travelPlans: travelPlans};
  }
  calculatePrice(distance: number, trainTypeMultiplyer: number, priceConstant: number, amount: number) {
    return (
      (Math.round(priceConstant * (distance * trainTypeMultiplyer * amount) * 100) / 100)
    );
  }

  calculateDistance(
    startLat: number,
    startLong: number,
    endLat: number,
    endLong: number
  ) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(endLat - startLat); // deg2rad below
    var dLon = this.deg2rad(endLong - startLong);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(startLat)) *
        Math.cos(this.deg2rad(endLat)) *
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
