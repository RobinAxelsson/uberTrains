const TravelForm = ({
  handleSubmit,
  start,
  setStart,
  end,
  setEnd,
  date,
  setDate,
  showTravels,
  availableTravels,
}) => {
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
                <p>
                  {item.routeEvents.map((i) => (
                    <div>
                      {i.location}
                      {i.dateTime}
                      {i.eventType}
                    </div>
                  ))}
                </p>
                <button>Boka</button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TravelForm;
