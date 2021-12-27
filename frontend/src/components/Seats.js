const Seats = ({ train }) => {
  return (
    <div>
      {train &&
        train.map((item) => (
          <div>
            Vagn:<p>{item.carrier}</p>
            {item.seats.map((seatNr) => (
              <div class="form-check">
                {" "}
                <input
                  class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label
                  class="form-check-label inline-block text-gray-800"
                  for="flexCheckDefault"
                >
                  {seatNr}
                </label>{" "}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Seats;
