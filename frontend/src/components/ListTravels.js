// import { Link } from "react-router-dom";
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const ListTravels = ({ availableTravels, setShowTravels, setShowSeats, setChoosenTravel }) => {
  return (
    <div className="w-full mt-2 flex justify-center items-center">
      <div className="overflow-x-auto w-full sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="w-full min-w-full shadow border-b border-gray-200 sm:rounded-lg bg-white bg-opacity-75">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider "
                  >
                    Resa
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider "
                  >
                    Restid
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tåg
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Pris
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {availableTravels &&
                  availableTravels.map((item) => (
                    <tr key={item.trainId} className="border-t border-gray-200">
                      {item.routeEvents.map((i) => (
                        <tr key={item.dateTime}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            {capitalizeFirstLetter(i.location)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
                            {new Date(i.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " | " + new Date(i.dateTime).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            {i.event}
                          </td>
                        </tr>
                      ))}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        4 h 0 min (hard coded)
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.tripName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {new Intl.NumberFormat('sv-se', { style: 'currency', currency: 'SEK' }).format(item.price) + " per biljett"}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {/* <Link to="seats"> */}

                        <button
                          onClick={() => {
                            setShowTravels(false);
                            setShowSeats(true);
                            setChoosenTravel(item);
                          }}
                          className="mt-1 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Välj platser
                        </button>
                        {/* </Link> */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListTravels;
