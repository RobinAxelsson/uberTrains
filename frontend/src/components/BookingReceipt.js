const BookingReceipt = (prop) => {
    var bookedSeats = [];
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    function getBookedSeats() {
        let seats = [];
        prop.choosenTravel.trainUnits.forEach(t => {
            t.seats.forEach(s => {
              prop.choosenSeats.forEach(cs => {
                if(s.id === cs) {
                        if(t.name.startsWith("Vagn")) {
                            seats.push(t.name + ": Säte " + s.seatNumber.toUpperCase());
                        }
                        else {
                            seats.push("Vagn " + t.name + ": Säte " + s.seatNumber.toUpperCase());
                        }
                }   
            })  
            })
        })
        return seats;
    }
    function getBookedSeatsString() {
        let seats = "";
        prop.choosenTravel.trainUnits.forEach(t => {
            t.seats.forEach(s => {
              prop.choosenSeats.forEach(cs => {
                if(s.id === cs) {
                        if(t.name.startsWith("Vagn")) {
                            seats += t.name + ": Säte " + s.seatNumber.toUpperCase() + " | ";
                        }
                        else {
                            seats += "Vagn " + t.name + ": Säte " + s.seatNumber.toUpperCase() + " | ";
                        }
                }   
            })  
            })
        })
        return seats.slice(0, seats.length - 3);
    }
class seatMapper {
constructor(seatNumber, wagon) {
    this.seatNumber = seatNumber;
    this.wagon = wagon;
}
}
    return (
        
      <div className="mb-4 flex flex-col">
         <div className="flex justify-center items-center">
         <form className="mt-6 bg-white flex justify-center items-center bg-opacity-75 border-opacity-5 w-11/12 tablet:w-6/12 laptop:w-4/12 rounded-md shadow-md">
        <div className="relative">
            
        <p className="text-center top-0 left-0 right-0 mt-2">
         <strong className="text-2xl ">Sådär ja!</strong>
         <br></br>
         <span className="text-lg underline">Din bokning är betald och redo</span><br />
        <span className="text-base underline">En bokningsbekräftelse skall ha skickats till din e-post</span>
         
        </p>
        <p className="text-sm mt-10 mb-5">
        <strong className="text-base">Bokningsnummer: </strong> {prop.bookingNumber}
            <br />
            <strong className="text-base">Du har betalat:</strong> {new Intl.NumberFormat('sv-se', { style: 'currency', currency: 'SEK' }).format(prop.choosenTravel.price)}
            <br />
            <br />
            <strong>Avresa:</strong> {capitalizeFirstLetter(prop.choosenTravel.routeEvents[0].location)}<br />
            <strong>Destination:</strong> {capitalizeFirstLetter(prop.choosenTravel.routeEvents[prop.choosenTravel.routeEvents.length - 1].location)}<br />
            <strong>Tid för avresa:</strong> {new Date(prop.choosenTravel.routeEvents[0].dateTime).toLocaleDateString() + " | " + new Date(prop.choosenTravel.routeEvents[0].dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            <br />
            <strong>Tid för ankomst:</strong> {new Date(prop.choosenTravel.routeEvents[prop.choosenTravel.routeEvents.length - 1].dateTime).toLocaleDateString() + " | " + new Date(prop.choosenTravel.routeEvents[prop.choosenTravel.routeEvents.length - 1].dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            <br /><br />
            <strong>Dina bokade sittplatser:</strong><br />
            <span className="text-xs font-bold">
               <p>{getBookedSeatsString()}</p>
           
            </span>
        </p>

        </div>
        
       
        </form>
     
          </div>
      
      </div>
    );
  };
  
  export default BookingReceipt;