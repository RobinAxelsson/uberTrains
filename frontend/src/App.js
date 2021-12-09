import { useState, useEffect } from "react";
import "./App.css";
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

  return (
    <div className="App">
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
