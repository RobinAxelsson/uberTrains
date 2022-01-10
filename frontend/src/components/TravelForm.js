import { useState } from 'react';
import Seats from './Seats';
import ListTravels from './ListTravels';
import LogoForm from './LogoForm';
const TravelForm = () => {
  const [showTravels, setShowTravels] = useState(false);
  const [showSeats, setShowSeats] = useState(false);
  const [availableTravels, setAvailableTravels] = useState([]);
  const [start, setStart] = useState(['goteborg']);
  const [end, setEnd] = useState(['stockholm']);
  const [date, setDate] = useState(['2022-02-22']);
  const [choosenTravel, setChoosenTravel] = useState([]);
  const [choosenSeats, setChoosenSeats] = useState([]);
  const [price, setPrice] = useState([]);

  const getPrice = () => {
    fetch('http://localhost:4000/api/price', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        travelPlanId: choosenTravel.id,
        startRouteEventId: choosenTravel.routeEvents[0].id,
        endRouteEventId: choosenTravel.routeEvents[1].id,
        amount: 1,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        if (data) {
          setPrice(data);
        }
      });
  };
  console.log(price);
  console.log(choosenSeats.length);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/api/journey?date=${date}&start=${start}&end=${end}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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
    <div className="mb-4 flex flex-col">
      <LogoForm></LogoForm>
      <div className="flex justify-center items-center">
        <form
          className="w-11/12 tablet:w-6/12 laptop:w-4/12 rounded-md border-white border-8 border-opacity-5 bg-white bg-opacity-75 mt-6 flex-col flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="w-full border-white border-8 border-opacity-5 flex justify-center items-center">
            <h2 className="font-bold text-4xl">Vart vill du resa?</h2>
          </div>
          <div className="mt-4 w-11/12">
            <input
              type="text"
              className="w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
              placeholder="Från:"
              required
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
          <div className="mt-1 w-11/12">
            <input
              type="text"
              className="w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
              placeholder="Till:"
              required
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
          <div className="mt-1 w-11/12">
            <input
              type="date"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-7/12 sm:text-sm border-gray-300 rounded-md"
              // min={getTodaysDate()}
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
        {showTravels && (
          <ListTravels
            availableTravels={availableTravels}
            setShowTravels={setShowTravels}
            setShowSeats={setShowSeats}
            setChoosenTravel={setChoosenTravel}
          />
        )}
      </div>
      <div className='flex justify-center items-center'>
        {showSeats && (
          <Seats
            availableTravels={availableTravels}
            setChoosenSeats={setChoosenSeats}
            choosenSeats={choosenSeats}
            choosenTravel={choosenTravel}
            price={price}
            getPrice={getPrice}
          />
        )}
      </div>
    </div>
  );
};

export default TravelForm;
