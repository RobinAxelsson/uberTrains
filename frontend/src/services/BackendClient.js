
import axios from "axios";
import { BOOKING_URL, TRAVELPLAN_URL } from "../constants/urls";
export async function postBooking(choosenSeats, choosenTravel, id, email, name, url){
    console.log({url: url});
    const response = await axios.post(url, {
        travelPlanId: choosenTravel.id,
        routeEventIds: choosenTravel.routeEvents.map(e => e.id),
        seatIds: choosenSeats, 
        stripeInfo: {
          id: id,
          email: email,
          name: name,
        }
      }).catch((err)=>{
        
        console.log(err);
        return;
      });
      console.log(response);
      
      return response;
}
export async function getAllTravelPlans(){
  const response = await axios.get(TRAVELPLAN_URL).catch((err)=>{
      console.log(err);
      return null;
    });
    console.log(response);
    
    return response.data;
}
export async function deleteAllBookings(){
  const response = await axios.delete(BOOKING_URL).catch((err)=>{
      console.log(err);
      return null;
    });
    console.log(response);
    
    return response;
}