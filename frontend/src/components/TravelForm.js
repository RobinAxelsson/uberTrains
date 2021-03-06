import { useState, useEffect } from "react";
import Seats from "./Seats";
import ListTravels from "./ListTravels";
import { JOURNEY_URL } from "../constants/urls";
import { getAllTravelPlans } from "../services/BackendClient";
import { deleteAllBookings } from "../services/BackendClient";
import BookingReceipt from "./BookingReceipt";
const TravelForm = () => {

  let startVal = "";
  let endVal = "";
  let dateVal = new Date().toISOString().split("T")[0];

  if (process.env.REACT_APP_ENVIRONMENT === "Development") {
    startVal = "Göteborg";
    endVal = "Jönköping";
    dateVal = "2022-02-22";
  }

  const [stations, setStations] = useState([])
  const [showTravels, setShowTravels] = useState(false);
  const [showSeats, setShowSeats] = useState(false);
  const [availableTravels, setAvailableTravels] = useState([]);
  const [start, setStart] = useState(startVal);
  const [end, setEnd] = useState(endVal);
  const [date, setDate] = useState(dateVal);
  const [choosenTravel, setChoosenTravel] = useState([]);
  const [choosenSeats, setChoosenSeats] = useState([]);
  const [filteredData, setFilteredData] = useState([])
  const [showForm,setShowForm] = useState(true)
  const [endStationFilter,setEndStationFilter] = useState([])
  const [showReceipt, setShowReceipt] = useState(false);
  const [bookingNumber, setBookingNumber] = useState("");

  useEffect(() => {
    fetch("stations.json", {
      headers: {
        "Content-typ": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setStations(data)
      });
  }, []);

  const filterLocation = e => {
    const search = e.target.value.toLowerCase()

    const filteredStations = stations.filter((val) => { return val.name.toLowerCase().includes(search.toLowerCase()) })
    if (search === "") {
      setFilteredData([])
    } else {
      setFilteredData(filteredStations)
    }
  }

  const filterEndStation = e => {
    const search = e.target.value.toLowerCase()

    const filteredStations = stations.filter((val) => { return val.name.toLowerCase().includes(search.toLowerCase()) })
    if (search === "") {
      setEndStationFilter([])
    } else {
      setEndStationFilter(filteredStations)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let urlStart = encodeURIComponent(start).toLowerCase();
    let urlEnd = encodeURIComponent(end).toLowerCase();
    date && fetch(`${JOURNEY_URL}?date=${date}&start=${urlStart}&end=${urlEnd}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        if (data) {
          setAvailableTravels(data);
          setShowTravels(true);
          setShowForm(false)
        }
      });
  };
  console.log("filter", filteredData)

  return (
    <div className="">
      <div className="flex justify-center items-center">
        {showForm && 
        <form
          className="w-11/12 tablet:w-6/12 laptop:w-4/12 rounded-md border-white border-8 border-opacity-5 bg-white bg-opacity-75 mt-6 flex-col flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="w-full border-white border-8 border-opacity-5 flex justify-center items-center">
            <h2 className="font-bold text-4xl">Vart vill du resa?</h2>
          </div>
          <div className="mt-4 w-11/12">
            <input
              maxlength="30"
              type="text"
              className="w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
              placeholder="Från:"
              required
              value={start}
              onChange={(e) => {setStart(e.target.value);  filterLocation(e)}}
            />
          </div>
          {filteredData.length !== 0 &&
          <div className="bg-white w-11/12 border-white border-8 border-opacity-5">
          <ul>
            {filteredData && filteredData
             .map((item) =>
              <li className="cursor-pointer" onClick={() => {setStart(item.name); setFilteredData([])}} key={item.id}>{item.name}</li>
            )}
          </ul>
          </div> 
            }   
          <div className="mt-1 w-11/12">
            <input
              maxlength="30"
              type="text"
              className="w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
              placeholder="Till:"
              required
              value={end}
              onChange={(e) => {setEnd(e.target.value); filterEndStation(e)}}
            />
          </div>
          {endStationFilter.length !== 0 &&
          <div className="bg-white w-11/12 border-white border-8 border-opacity-5">
          <ul>
            {endStationFilter && endStationFilter
             .map((item) =>
              <li className="cursor-pointer" onClick={() => {setEnd(item.name); setEndStationFilter([])}} key={item.id}>{item.name}</li>
            )}
          </ul>
          </div>
          }
          <div className="mt-1 w-11/12">
            <input
              type="date"
              max="2999-12-31"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-7/12 sm:text-sm border-gray-300 rounded-md"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button className="mt-1 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Fortsätt
          </button>
        </form>
        }
        {process.env.REACT_APP_ENVIRONMENT === "Development" && (
          <button
            onClick={async () => {
              let data = await getAllTravelPlans();
              if (data) {
                setAvailableTravels(data);
                setShowTravels(true);
              }
              console.log(availableTravels);
            }}
            class="mt-1 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Alla resor
          </button>
        )}
        {process.env.REACT_APP_ENVIRONMENT === "Development" && (
          <button
            onClick={async () => {
              deleteAllBookings().then((res) => {
                console.log(res);
              });
            }}
            name="delete-all-bookings"
            class="mt-1 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Delete all bookings
          </button>
        )}
      </div>
      <div>
        {showTravels && (
          <ListTravels
            startStation={[start]}
            endStation={[end]}
            availableTravels={availableTravels}
            setShowTravels={setShowTravels}
            setShowSeats={setShowSeats}
            setChoosenTravel={setChoosenTravel}
          />
        )}
      </div>
      <div className="flex justify-center items-center">
        {showSeats && (
          <Seats
            availableTravels={availableTravels}
            setChoosenSeats={setChoosenSeats}
            choosenSeats={choosenSeats}
            choosenTravel={choosenTravel}
            setShowReceipt={setShowReceipt}
            setShowSeats={setShowSeats}
            setBookingNumber={setBookingNumber}
          />
        )}
      </div>
      <div>

        {showReceipt && (<BookingReceipt
          choosenSeats={choosenSeats}
          choosenTravel={choosenTravel}
          bookingNumber={bookingNumber}
        />)}
      </div>
    </div>
  );
};

export default TravelForm;
