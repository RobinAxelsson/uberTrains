import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    fetch("data-sample.json", {
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
  }, []);

  const test = () => {
    let test = Object.keys(jsonData).map((item, i) => {
      return jsonData[item];
    });
    console.log("test", test);
  };
  test();
  console.log(jsonData);
  return (
    <div className="App">
      {jsonData &&
        Object.keys(jsonData).map((item, i) => (
          <div key={i}>
            <p className="station-name"> {jsonData[item].ID}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
