const Seats = ({ train }) => {
  return (
    <div>
      <div className="mt-2 flex justify-center border-2 border-indigo-200 justify-around">
        {train &&
          train.map((item) => (
            <div>
              <p> Vagn: {item.carrier}</p>
              <div className="grid grid-cols-3 gap-4 content-between">
                {item.seats.map((seatNr) => (
                  <div class="form-check">
                    {" "}
                    <input
                      class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      type="checkbox"
                      value={seatNr}
                      id="flexCheckDefault"
                    />
                    <label
                      class="form-check-label inline-block text-gray-800"
                      for="flexCheckDefault"
                    >
                      {seatNr} ,
                    </label>{" "}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-end">
        <button className="mr-8 mt-1 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Betala
        </button>
      </div>
    </div>
  );
};

export default Seats;
