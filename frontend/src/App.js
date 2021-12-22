import "./App.css";
import TravelForm from "./components/TravelForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BokningsBekräftelse from "./components/BokningsBekräftelse";

function App() {
  return (
    <Router>
      <div>
        <TravelForm />
        <Routes>
          <Route path="bokning" element={<BokningsBekräftelse />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
