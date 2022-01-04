import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";

toast.configure();

function Checkout() {
  async function handleToken(token) {
      
    const { card, email, id } = token;

    const response = await axios.post("http://localhost:4000/api/booking", {
      //TODO Get all params from frontend
      startRouteEventId: 1, //Hardcoded
      endRouteEventId: 4, //Hardcoded
      seatIds: [1, 2], //Hardcoded
      travelPlanId: 1, //Hardcoded
      stripeInfo: {
        id: id,
        email: email,
        name: card.name,
      },
    });

    var templateParams = {
      name: card.name,
      email: email,
      message: "Payment Done !" + token.amount_captured + token.amount,
    };

    const { status } = response.data;
    if (status === "success") {
      emailjs
        .send(
          "service_mn8idh9",
          "template_ovo61fm",

          templateParams,

          "user_qWBpxaLTMoG8JmPJ07PXT"
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));

      toast(
        "Success! check email for details",

        { type: "success" }
      );
    } else {
      toast(
        "Something went wrong",

        { type: "error" }
      );
    }
  }

  return (
    <div>
      <StripeCheckout
        stripeKey="pk_test_51K7JpMAwp97GmluX8sVfd1zSkEGFdj6fAaqbqSH40qdWc4RcL12RSJ8jxNkHR2fDCpe1f3T3xzzEzuKZhsNQ8QKE00DVMxtEkG"
        token={handleToken}
        name="uberTrains"
        billingAddress
        shippingAddress
        amount={400 * 100}
        currency="sek"
      />
    </div>
  );
}

export default Checkout;
