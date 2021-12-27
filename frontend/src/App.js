import "./App.css";
import TravelForm from "./components/TravelForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookingReceipt from "./components/BookingReceipt";
import Navbar from "./components/Navbar";
import Seats from "./components/Seats";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/seats" element={<Seats />} />
        <Route path="/" element={<TravelForm />} />
        <Route path="/receipt" element={<BookingReceipt />} />
      </Routes>
    </Router>
  );
}

export default App;
