import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import { BOOKING_URL } from "../constants/urls";
import { postBooking } from "../services/BackendClient";
import { useState } from 'react';
import Toast from './toast/Toast'

toast.configure();
function BookingCheckout({ choosenSeats, choosenTravel, setShowReceipt, setShowSeats, setBookingNumber}) {

  async function handleToken(token) {
    showToast('info')
    const { card, email, id } = token;
    const response = await postBooking(choosenSeats, choosenTravel, id, email, card.name, BOOKING_URL)
    
    if(response.status !== 200){
      showToast('error')
      console.log("BackendClient.postBooking failed");
      console.log(response?.message);
      return
    }
else if(response.status === 200) {
  
  return(
    
    setBookingNumber(response.data.bookingNumber),   
    setShowReceipt(true),
    setShowSeats(false)
  );
}


  }
  const [list, setList] = useState([]);
  let toastProperties = null;
  
  const showToast = type => {
    switch(type) {
      case 'success':
        toastProperties = {
          id: list.length+1,
          title: 'Success! ',
          description: 'Your payment has been successfully processed! \n     An email is on its way to you :)',
          backgroundColor: '#5cb85c',
          
        }
        break;
      case 'info':
        toastProperties = {
          id: list.length+1,
          title: 'Vänligen vänta!',
          description: 'Behandlar betalningen ...',
          backgroundColor: '#e0702b'
        }
        break;   
      case 'error':
        toastProperties = {
          id: list.length+1,
          title: 'Error',
          description: '',
          backgroundColor: '#f0ad4e'
        }
        break;
      default:
        toastProperties = [];
    }
    setList([...list, toastProperties]);
  }   

  return (
    <div className="mb-3 mt-3">
      <StripeCheckout
    
        locale= "sv"
        stripeKey="pk_test_51K7JpMAwp97GmluX8sVfd1zSkEGFdj6fAaqbqSH40qdWc4RcL12RSJ8jxNkHR2fDCpe1f3T3xzzEzuKZhsNQ8QKE00DVMxtEkG"
        token={handleToken}
        name="uberTrains"
        billingAddress
        shippingAddress
        amount={choosenSeats.length * choosenTravel.price * 100}
        currency="SEK"
        label="Betala"
        
      />
    <Toast toastlist={list} position="top-right" setList={setList} />
    </div>
  );
}

export default BookingCheckout;
