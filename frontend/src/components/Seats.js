import BookingCheckout from './BookingCheckout';

const Seats = ({ setChoosenSeats, choosenSeats, choosenTravel }) => {
  return (
    <div className="w-full mt-2 flex justify-center items-center">
      <div className="mt-2 flex justify-center justify-around bg-white bg-opacity-75 rounded-md shadow-md w-4/5">
        <div className="">
          <div className="mt-1">
            {choosenTravel &&
              choosenTravel.trainUnits.map((t) => (
                <div>
                  {' '}
                  <p className="font-bold"> {t.name}</p>
                  <div className="grid grid-cols-3 gap-4 content-between">
                    {t.seats.map((s) => (
                      <div class="form-check">
                        {' '}
                        <input
                          class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer "
                          type="checkbox"
                          value={s.id}
                          id="flexCheckDefault"
                          onChange={(e) => {
                            if (e.target.checked) {
                              let input = [...choosenSeats, s.id];
                              setChoosenSeats(input);
                              //setChoosenSeats([...choosenSeats,s.id])
                            } else {
                              setChoosenSeats(choosenSeats.filter((number) => number !== s.id));
                            }
                          }}
                        />
                        <label
                          class="form-check-label inline-block text-gray-800"
                          for="flexCheckDefault"
                        >
                          {s.seatNumber.toUpperCase()}
                        </label>{' '}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
          <div className="mt-2 mr-12 -ml-3 flex justify-end">
            <BookingCheckout choosenSeats={choosenSeats} choosenTravel={choosenTravel} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seats;
