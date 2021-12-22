import "./App.css";
import TravelForm from "./components/TravelForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookingReceipt from "./components/BookingReceipt";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<TravelForm />} />
          <Route path="/receipt" element={<BookingReceipt />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
