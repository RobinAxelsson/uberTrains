import { StripeInfo } from "../dtos/BookingDto";

const stripe = require("stripe")(
  "sk_test_51K7JpMAwp97GmluXslTTgNnwx2H7CBcUwDpIOjhZoR3gV6LxY6ZZIUnqVdlzdjOWGhVWS2owaJ3SACXg7F6G2Kqs00B1E5iMEs"
);

export interface IPaymentManager {
  Pay(stripeInfo: StripeInfo, price: number): Promise<string>;
}
export class PaymentManager implements IPaymentManager {
  public async Pay(stripeInfo: StripeInfo, price: number) {
    const customer = await stripe.customers.create({
      email: stripeInfo.email,
      source: stripeInfo.id,
    });

    const charge = await stripe.charges.create({      
      amount: Math.round(price * 100),
      currency: "sek",
      customer: customer.id,
      receipt_email: stripeInfo.email,
      description: `Purchased the test`,
      shipping: {
        name: stripeInfo.name,
        address: {
          line1: null,
          line2: null,
          city: null,
          country: null,
          postal_code: null,
        },
      },
    });
    console.log("PaymentManager.Pay()=>Charge:", { charge });
    return charge?.id;
  }
}
export class PaymentManagerStub implements IPaymentManager {
  async Pay(stripeInfo: StripeInfo, price: number) {
    let promise = new Promise<string>((resolve, reject) => {
      setTimeout(() => resolve(stripeInfo.id), 100);
    });
    return await promise;
  }
}
