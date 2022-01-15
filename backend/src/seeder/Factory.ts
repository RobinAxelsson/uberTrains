import { PriceModel } from '../models/PriceModel.entity';
import { Seat } from '../models/Seat.entity';
import { TrainUnit } from '../models/TrainUnit.entity';

function addSeats(rowCount: number, letterArray:string[]) {
  let seatStrings = [] as string[];
  for (let i = 0; i < rowCount; i++) {
    letterArray.forEach(l => seatStrings.push((i+1)+l));
  }
  console.log(seatStrings);
  return seatStrings.map(x => ({seatNumber: x} as Seat))
}
export function trainFactory(amount: number, rowCount: number, letterArray:string[]) {
  let numbers = Array.from(Array(amount).keys());
  let carriages = numbers.map(n => ({
    name: "Vagn " + (n+1).toString(),
    seats: addSeats(rowCount, letterArray),
    type: "carriage"
  } as TrainUnit))

  return carriages;
}

export function priceModelFactory(name:string, priceConstant:number, trainTypeMultiplyer:number){
let priceModel = {
  name: name,
  priceConstant: priceConstant,
  trainTypeMultiplyer: trainTypeMultiplyer,
} as PriceModel

return priceModel;
}

