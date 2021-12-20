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

  function toggleTimeAndDatePicker() {
    $('#timeAndDatePicker').remove();
    if ($('#selectDeparture').is(':checked') || $('#selectArrival').is(':checked')) {
      // Add button press logic here
      $('#timeAndDateApp').append('<div id="timeAndDatePicker"> <br>' +
        '<label htmlFor="datePicker">Dag</label> <br>' +
        '<input type="date" id="datePicker" /> <br> <br>' +
        '<label htmlFor="timePicker">Tid</label> <br>' +
        '<input type="time" id="timePicker" /> </div>');
    }
  }

  return (
    <div className="App" id="timeAndDateApp">
      <label>När vill du resa?</label> <br />

      <input type="radio" id="immediateDeparture" name="timeSelector" value="immediateDeparture" onChange={() => toggleTimeAndDatePicker()} />
      <label htmlFor="immediateDeparture">Nu</label>

      <input type="radio" id="selectDeparture" name="timeSelector" value="selectDeparture" onChange={() => toggleTimeAndDatePicker()} />
      <label htmlFor="selectDeparture">Välj avgångstid</label>

      <input type="radio" id="selectArrival" name="timeSelector" value="selectArrival" onChange={() => toggleTimeAndDatePicker()} />
      <label htmlFor="selectArrival">Välj ankomsttid</label>
    </div>
  );
}

export default App;
