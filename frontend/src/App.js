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

  function toggleTimeAndDatePicker() {
    $('#timeAndDatePicker').remove();
    if ($('#selectDeparture').is(':checked') || $('#selectArrival').is(':checked')) {
      // Add button press logic here
      $('#timeAndDateApp').append('<div id="timeAndDatePicker"> <br>' +
        '<label htmlFor="datePicker">Dag</label> <br>' +
        `<input type="date" id="datePicker" min="${getTodaysDate()}" /> <br> <br>` +
        '<label htmlFor="timePicker">Tid</label> <br>' +
        '<input type="time" id="timePicker" /> <br> <br>' +
        '<button type="button" id="searchButton">Sök resor</button> </div>');
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
