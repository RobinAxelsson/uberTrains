import axios from 'axios';
import { BACKEND_URL, BOOKING_URL } from '../constants/urls';
export async function postBooking(choosenSeats, choosenTravel, id, email, name) {
  const url = BACKEND_URL + BOOKING_URL;
  console.log({ url: url });
  const response = await axios
    .post(url, {
      travelPlanId: choosenTravel.id,
      routeEventIds: choosenTravel.routeEvents.map((e) => e.id),
      seatIds: choosenSeats,
      stripeInfo: {
        id: id,
        email: email,
        name: name,
      },
    })
    .catch((err) => {
      console.log(JSON.stringify({ err: err }, null, '\t'));
      console.log(err);
      return;
    });

  return response;
}
