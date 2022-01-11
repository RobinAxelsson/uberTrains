import { FAKEBOOKING_URL } from "../constants/urls";
import { postBooking } from "../services/BackendClient";
import BookingCheckout from "./BookingCheckout";

const Seats = ({ setChoosenSeats, choosenSeats, choosenTravel }) => {
  return (
    <div className="mb-6 w-11/12 tablet:w-6/12 laptop:w-4/12 mt-2 flex justify-center items-center">
      <div className="mt-2 flex justify-center justify-around bg-white bg-opacity-75 rounded-md shadow-md w-4/5">
        <div className="">
          <div className="mt-1">
            {choosenTravel &&
              choosenTravel.trainUnits
                .filter((t) => t.seats.some((x) => x.booking === null))
                .map((t) => (
                  <div>
                    {" "}
                    <p className="font-bold"> {t.name}</p>
                    <div className="grid grid-cols-3 gap-4 content-between">
                      {t.seats
                        .filter((x) => x.booking === null)
                        .map((s) => (
                          <div class="form-check">
                            {" "}
                            <input
                              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer "
                              type="checkbox"
                              value={s.id}
                              id="flexCheckDefault"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  let input = [...choosenSeats, s.id];
                                  setChoosenSeats(input);
                                } else {
                                  setChoosenSeats(
                                    choosenSeats.filter(
                                      (number) => number !== s.id
                                    )
                                  );
                                }
                              }}
                            />
                            <label
                              class="form-check-label inline-block text-gray-800"
                              for="flexCheckDefault"
                            >
                              {s.seatNumber.toUpperCase()}
                            </label>{" "}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
          </div>
          <div className="mt-2 mr-12 -ml-3 flex justify-end">
            {process.env.REACT_APP_ENVIRONMENT === "Development" && (
              <button
                onClick={() => {
                  postBooking(
                    choosenSeats,
                    choosenTravel,
                    "stripe-id-ab123",
                    "uber@trains.se",
                    "Bob An",
                    FAKEBOOKING_URL
                  );
                }}
                class="mt-1 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Gratis
              </button>
            )}
            <BookingCheckout
              choosenSeats={choosenSeats}
              choosenTravel={choosenTravel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seats;
