import { extractTravelListData } from '../services/Utilities';

const TableHeader = (title) => (
  <th
    scope="col"
    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider "
  >
    {title}
  </th>
);

const cell = (cellFont, vals) => (
  <td className={cellFont}>
    {vals.map(x => (
      <div>
        {x}
      </div>
    ))}
  </td>
)

const ListTravels = ({
  startStation: [[start]],
  endStation: [[end]],
  availableTravels,
  setShowTravels,
  setShowSeats,
  setChoosenTravel,
}) => {
  console.log('availableTravels', availableTravels);
  return (
    <div className="w-full mt-2 flex justify-center items-center">
      <div className="overflow-x-auto w-full sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="w-full min-w-full shadow border-b border-gray-200 sm:rounded-lg bg-white bg-opacity-75">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {TableHeader('Resa')}
                  {TableHeader('Tid')}
                  {TableHeader('Datum')}
                  {TableHeader('Restid')}
                  {TableHeader('Tåg')}
                  {TableHeader('Pris')}
                  {TableHeader('')}
                </tr>
              </thead>
              <tbody>
                {availableTravels &&
                  availableTravels
                    .map((travelPlan) => {
                      console.log(travelPlan);
                      let data = extractTravelListData(travelPlan, start, end);
                      console.log(data);
                      return data;
                    })
                    .map((item) => {
                      const cellFont =
                        'px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium';
                      return (
                        <tr key={item.id} className="border-t border-gray-200">
                          {cell(cellFont, [item.startLocation, item.endLocation])}
                          {cell(cellFont, [item.startDateString, item.endDateString])}
                          {cell(cellFont, [item.dateTime])}
                          {cell(cellFont, [item.travelTime])}
                          {cell(cellFont, [item.tripName])}
                          {cell(cellFont, [item.price])}
                          
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => {
                                setShowTravels(false);
                                setShowSeats(true);
                                setChoosenTravel(item.travelPlan);
                              }}
                              className="mt-1 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Välj platser
                            </button>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListTravels;
