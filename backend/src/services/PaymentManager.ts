import { StripeInfo } from "../dtos/BookingDto";

const stripe = require("stripe")(
    "sk_test_51K7JpMAwp97GmluXslTTgNnwx2H7CBcUwDpIOjhZoR3gV6LxY6ZZIUnqVdlzdjOWGhVWS2owaJ3SACXg7F6G2Kqs00B1E5iMEs"
  );


export class PaymentManager
{
    async Pay(stripeInfo:StripeInfo, price:number){
        const customer = await stripe.customers.create({
            email: stripeInfo.email,
            source: stripeInfo.id,
          });
        
          const charge = await stripe.charges.create({
            amount: price,
            currency: "sek",
            customer: customer.id,
            receipt_email: stripeInfo.email,
            description: `Purchased the test`,
            shipping: {
              name: stripeInfo.name,
            },
          });
          console.log("PaymentManager.Pay()=>Charge:", { charge });
          return charge.id;
    }
}