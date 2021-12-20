import { useState } from "react";
import "./App.css";
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
      <h2>Vart vill du resa?</h2>
      <form onSubmit={handleSubmit}>
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
        <button>fortsätt</button>
      </form>
      {showTravels && (
        <div>
          {availableTravels &&
            availableTravels.map((item) => (
              <div>
                <p>Tåg: {item.train}</p>
                <p>TågId: {item.trainId}</p>
                <button>Boka</button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default App;
