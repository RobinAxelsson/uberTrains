import axios from "axios"
import StripeCheckout from 'react-stripe-checkout';
import {toast} from 'react-toastify';


toast.configure()

 function Checkout() {

    async function handleToken(token){
        const response = await axios.post("http://localhost:4000/checkout",{
            token,
            
        });
        const {status}= response.data
        if (status==='success'){
            

             toast('Success! check email for details',

              {type:'success'})
        }else
        {
            toast('Something went wrong',

              {type:'error'})
        }      
    }
    
    return (

        <div >
       
          <StripeCheckout

            stripeKey="pk_test_51K7JpMAwp97GmluX8sVfd1zSkEGFdj6fAaqbqSH40qdWc4RcL12RSJ8jxNkHR2fDCpe1f3T3xzzEzuKZhsNQ8QKE00DVMxtEkG"
            token={handleToken}
            amount={3000*100}
            name="uberTrains"
         />
       
        </div>
        
    )
}

export default Checkout