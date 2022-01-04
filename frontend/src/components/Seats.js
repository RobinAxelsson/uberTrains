import Checkout from "./Checkout";

const Seats = ({ availableTravels,setChoosenSeats, choosenSeats}) => {
  
 
  return (
    <div>
      <div className="mt-2 flex justify-center border-2 border-indigo-200 justify-around">
        {availableTravels &&
          availableTravels.map((item) => (
            <div>
              {item.trainUnits.map((t)=> <div> <p> {t.name}</p>
              <div className="grid grid-cols-3 gap-4 content-between">
                {t.seats.map((s) => (
                  <div class="form-check">
                    {" "}
                    <input
                      class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      type="checkbox"
                      value={s.id}
                      id="flexCheckDefault"
                      onChange={(e) => {
                        if(e.target.checked) {
                          setChoosenSeats([...choosenSeats,s.id])
                        } else {
                          setChoosenSeats(choosenSeats.filter((number) => number !== s.id ))
                        }
                      }}
                    />
                    <label
                      class="form-check-label inline-block text-gray-800"
                      for="flexCheckDefault"
                    >
                      {s.seatNumber} ,
                    </label>{" "}
                  </div>
                ))}
              </div>
               </div>
              )}
              
              
            </div>
          ))}
      </div>
      <div className="mt-2 mr-4 flex justify-end">
        <Checkout />
      </div>
    </div>
  );
};

export default Seats;
