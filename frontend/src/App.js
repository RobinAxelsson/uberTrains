import { useState } from "react";
import "./App.css";
import TravelForm from "./components/TravelForm";

function App() {
  const [showTravels, setShowTravels] = useState(false);
  const [availableTravels, setAvailableTravels] = useState([]);
  const [start, setStart] = useState([]);
  const [end, setEnd] = useState([]);
  const [date, setDate] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:4000/api/journey?date=${date}&start=${start}&end=${end}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        if (data) {
          setAvailableTravels(data);
          setShowTravels(true);
        }
      });
    console.log(availableTravels);
  };

  return (
    <div>
      <TravelForm
        showTravels={showTravels}
        availableTravels={availableTravels}
        start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
        date={date}
        setDate={setDate}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
