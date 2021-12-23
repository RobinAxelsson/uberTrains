import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [jsonData, setJsonData] = useState([]);
  const [searchStation, setSearchStation] = useState("");

  useEffect(() => {
    fetch("travelplan.json", {
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
        setJsonData(data);
      });
    return () => {
      canceled = true;
    };
  });

  return (
    <div className="App">
      <input
        placeholder="Search"
        type="search"
        name="search"
        value={searchStation}
        onChange={(e) => {
          setSearchStation(e.target.value);
        }}
      />

      {jsonData &&
        jsonData.map((item) =>
          item.routeEvents
            .filter(filterStations)
            .map((i) => <div>{i.location}</div>)
        )}
    </div>
  );
}

export default App;
