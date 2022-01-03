import { useState } from "react";
import Seats from "./Seats";
import ListTravels from "./ListTravels";

const TravelForm = () => {
  const [showTravels, setShowTravels] = useState(false);
  const [showSeats,setShowSeats] = useState(false)
  const [availableTravels, setAvailableTravels] = useState([]);
  const [start, setStart] = useState([]);
  const [end, setEnd] = useState([]);
  const [date, setDate] = useState([]);
  const [choosenTravel, setChoosenTravel] = useState([])
  const [choosenSeats, setChoosenSeats] = useState([])

  //console.log("travel", choosenTravel)

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

  function getTodaysDate() {
    let today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; // Adding one since January is 0
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;
    return today;
  }

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
              type="date"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-48 sm:text-sm border-gray-300 rounded-md"
              //min={getTodaysDate()}
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
      <div>
      {showTravels && <ListTravels availableTravels={availableTravels} setShowTravels={setShowTravels} setShowSeats={setShowSeats} setChoosenTravel={setChoosenTravel} />}
      </div>
      <div>{ showSeats && <Seats availableTravels={availableTravels} setChoosenSeats={setChoosenSeats}/>}</div>
    </div>
  );
};

export default TravelForm;
