const filterStations = () => {
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
  }, []);
  console.log(searchStation);
  // console.log("json", jsonData);

  // const test = () => {
  //   let test = jsonData.map((item) => {
  //     return item.routeEvents.map((i) => i.location);
  //   });
  //   console.log("test", test);
  // };

  // const filterStations = (val) => {
  //   console.log("val", val);
  //   if (searchStation === "") {
  //     return val;
  //   } else if (
  //     val.location.toLowerCase().includes(searchStation.toLowerCase())
  //   ) {
  //     return val;
  //   } else {
  //     return false;
  //   }
  // };

  return (
    <div>
      {/* <input
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
        )} */}
    </div>
  );
};

export default filterStations;
