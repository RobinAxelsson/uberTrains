// import { Link } from "react-router-dom";

const ListTravels = ({ availableTravels, setShowTravels, setShowSeats, setChoosenTravel }) => {
  return (
    <div className="w-full mt-2 flex justify-center items-center">
      <div className="w-full sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="w-full min-w-full shadow border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Resa
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
                  ></th>
                </tr>
              </thead>
              <tbody>
                {availableTravels &&
                  availableTravels.map((item) => (
                    <tr key={item.trainId}>
                      {item.routeEvents.map((i) => (
                        <tr key={item.dateTime}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {i.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {i.dateTime}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {i.eventType}
                          </td>
                        </tr>
                      ))}

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.tripName}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {/* <Link to="seats"> */}

                        <button
                          onClick={() => {
                            setShowTravels(false);
                            setShowSeats(true);
                            setChoosenTravel(item)
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
