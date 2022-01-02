import { useState } from "react";

import ListTravels from "./ListTravels";
import Seats from "./Seats";

const TravelForm = ({}) => {
  const [showTravels, setShowTravels] = useState(false);
  const [availableTravels, setAvailableTravels] = useState([]);
  const [start, setStart] = useState([]);
  const [end, setEnd] = useState([]);
  const [date, setDate] = useState([]);
  const [seats, setSeats] = useState([]);
  const [showSeats, setShowSeats] = useState(false);
  const [choosenTravel, setChoosenTravel] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:4000/api/journey?date=${date}&start=${start}&end=${end}`
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        if (data) {
          setAvailableTravels(data);
          setShowTravels(true);
          setShowSeats(false);
        }
      });
    console.log("travels", availableTravels);
  };

  const getAvailableSeats = (id) => {
    fetch("http://localhost:4000/api/seats")
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((data) => {
        if (data) {
          setSeats(data);
          setShowTravels(false);
          setShowSeats(true);
          setChoosenTravel(id);
        }
      });
    // console.log("seats", seats);
  };
  console.log(choosenTravel);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center">
        <form className="mt-6 justify-center" onSubmit={handleSubmit}>
          <div>
            <h2 className="font-bold text-4xl">Vart vill du resa?</h2>
          </div>
          <div className="mt-4">
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-96 sm:text-sm border-gray-300 rounded-md"
              placeholder="Från:"
              required
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
          <div className="mt-1">
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-96 sm:text-sm border-gray-300 rounded-md"
              placeholder="Till:"
              required
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
          <div className="mt-1">
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-96 sm:text-sm border-gray-300 rounded-md"
              placeholder="Datum:"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button className="mt-1 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Fortsätt
          </button>
        </form>
      </div>
      {showTravels && (
        <ListTravels
          availableTravels={availableTravels}
          getAvailableSeats={getAvailableSeats}
          showTravels={showTravels}
          setChoosenTravel={setChoosenTravel}
        />
      )}
      {showSeats && <Seats train={seats} />}
    </div>
  );
};

export default TravelForm;
