import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [availableTravels, setAvailableTravels] = useState([]);
  const [start, setStart] = useState([]);
  const [end, setEnd] = useState([]);
  const [date, setDate] = useState([]);

  useEffect(() => {
    fetch(
      "http://localhost:4000/api/journey?date=2012-04-23&start=goteborg&end=stockholm",
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
        setAvailableTravels(data);
      });
  }, []);
  // console.log(availableTravels);

  return (
    <div>
      <h2>Vart vill du resa?</h2>
      <form>
        <label>från</label>
        <input
          type="text"
          required
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <label>till</label>
        <input
          type="text"
          required
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <label>datum</label>
        <input
          type="text"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </form>
    </div>
  );
}

export default App;
