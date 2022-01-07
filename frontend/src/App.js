import "./App.css";
import TravelForm from "./components/TravelForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookingReceipt from "./components/BookingReceipt";
import Seats from "./components/Seats";
//import { postBooking } from "./services/BookingClient";
function App() {
  return (
  <div>
    <Router>
      
      <Routes>
        <Route path="/seats" element={<Seats />} />
        <Route path="/" element={<TravelForm />} />
        <Route path="/receipt" element={<BookingReceipt />} />
        
      </Routes>
    </Router>
    </div>
  );
}

export default App;




