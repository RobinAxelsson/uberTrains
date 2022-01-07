import "./App.css";
import TravelForm from "./components/TravelForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {

  return (
  <div className="flex flex-col min-h-screen" >
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<TravelForm />} />
      </Routes>
    </Router>
    <Footer/>
    </div>
  );
}

export default App;




