import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import { BOOKING_URL } from "../constants/urls";
import { postBooking } from "../services/BackendClient";

toast.configure();
function BookingCheckout({ choosenSeats, choosenTravel, setShowReceipt, setShowSeats, setBookingNumber}) {

  async function handleToken(token) {
    const { card, email, id } = token;
    const response = await postBooking(choosenSeats, choosenTravel, id, email, card.name, BOOKING_URL)
    
    if(response.status !== 200){
      console.log("BackendClient.postBooking failed");
      console.log(response?.message);
      return
    }
else if(response.status === 200) {
  console.log("Booking number: " + response.data.bookingNumber);
  return(
    setBookingNumber(response.data.bookingNumber),
    setShowReceipt(true),
    setShowSeats(false)
  );
}
   
  }

  return (
    <div className="mb-3 mt-3">
      <StripeCheckout
        stripeKey="pk_test_51K7JpMAwp97GmluX8sVfd1zSkEGFdj6fAaqbqSH40qdWc4RcL12RSJ8jxNkHR2fDCpe1f3T3xzzEzuKZhsNQ8QKE00DVMxtEkG"
        token={handleToken}
        name="uberTrains"
        billingAddress
        shippingAddress
        amount={choosenSeats.length * choosenTravel.price * 100}
        currency="SEK"
      />
    
    </div>
  );
}

export default BookingCheckout;
