import { useState, useEffect } from "react";
import "./App.css";
import $ from 'jquery';
function App() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    let canceled = false;
    fetch("http://localhost:4000/api/stations")
      .then((res) => res.json())
      .catch((error) => console.log("error", error))
      .then((data) => {
        if (canceled) {
          return;
        }
        setStations(data);
        console.log(stations);
      });
    return () => {
      canceled = true;
    };
  }, []);

  function checkSelected() {
    if ($('#selectDeparture').is(':checked') || $('#selectArrival').is(':checked')) {
      // Add button press logic here
    }
  }

  return (
    <div className="App">
      <label>När vill du resa?</label> <br />

      <input type="radio" id="immediateDeparture" name="timeSelector" value="immediateDeparture" />
      <label for="immediateDeparture">Nu</label>

      <input type="radio" id="selectDeparture" name="timeSelector" value="selectDeparture" onChange={() => checkSelected()} />
      <label for="selectDeparture">Välj avgångstid</label>

      <input type="radio" id="selectArrival" name="timeSelector" value="selectArrival" onChange={() => checkSelected()} />
      <label for="selectArrival">Välj ankomsttid</label>

      {stations &&
        stations.map((station) => (
          <div>
            <p className="station-name">{station.name}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
