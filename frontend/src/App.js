import "./App.css";
import TravelForm from "./components/TravelForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookingReceipt from "./components/BookingReceipt";
import Navbar from "./components/Navbar";
import Seats from "./components/Seats";
import Checkout from "./components/Checkout";

function App() {

  return (
  <div>
    <Router>
      <Navbar />
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




