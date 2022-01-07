import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import { postBooking } from "../services/BookingClient";
import { sendBookingInfo } from "../services/MailClient";

toast.configure();

function BookingCheckout({ choosenSeats, choosenTravel }) {
  async function handleToken(token) {
    const { card, email, id } = token;
    const response = await postBooking(choosenSeats, choosenTravel, id, email, card.name)
    
    if(response.status !== 200){
      console.log("BackendClient.postBooking failed")
      return
    }
    
    const booking = response.data;
    await sendBookingInfo(booking, card.name, email);
  }

  return (
    <div className="mb-3 mt-3">
      <StripeCheckout
        stripeKey="pk_test_51K7JpMAwp97GmluX8sVfd1zSkEGFdj6fAaqbqSH40qdWc4RcL12RSJ8jxNkHR2fDCpe1f3T3xzzEzuKZhsNQ8QKE00DVMxtEkG"
        token={handleToken}
        name="uberTrains"
        billingAddress
        shippingAddress
        amount={400 * 100}
        currency="SEK"
        
      />
    </div>
  );
}

export default BookingCheckout;
