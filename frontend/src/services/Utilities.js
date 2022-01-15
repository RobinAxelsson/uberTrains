export function timeBetweenRouteEvents(routeEventA, routeEventB) {
  let start = new Date(routeEventA);
  let end = new Date(routeEventB);
  let ms = end - start;
  let hours = Math.floor(ms / 3600000);
  let minutes = Math.floor((ms % 3600000) / 60000);
  const format = (val) => (val === 0 ? '00' : val < 10 ? '0' + val : val);
  let out = `${format(hours)}:${format(minutes)} h`;
  return out;
}

function newGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function formatDateTime(dateTime) {
  return new Date(dateTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function filterRouteEvents(start, end, routeEvents) {
  //routeEvents
  let filtered = routeEvents.filter(
    (r) =>
      (r.location.toLowerCase() === start.toLowerCase() &&
        r.event.toLowerCase() === 'avgång') ||
      (r.location.toLowerCase() === end.toLowerCase() &&
        r.event.toLowerCase() === 'ankomst')
  );
  if (filtered.length !== 2)
    throw new Error('Two locations is not found in routeEvents');
  if (new Date(filtered[0].dateTime) > new Date(filtered[1].dateTime))
    throw new Error(
      'The route event locations are not in correct order timewise'
    );

  return { startEvent: filtered[0], endEvent: filtered[1] };
}

function formatPrice(price) {
  return (
    new Intl.NumberFormat('sv-se', {
      style: 'currency',
      currency: 'SEK',
    }).format(price) + ' per biljett'
  );
}
export function extractTravelListData(travelPlan, start, end) {
  const output = {};
  const { routeEvents, price } = travelPlan;

  const { startEvent, endEvent } = filterRouteEvents(start, end, routeEvents);
  output.travelPlan = travelPlan;
  output.trainUnits = travelPlan.trainUnits;
  output.startLocation = `${capitalizeFirstLetter(start)}, ${
    startEvent.specifiedLocation
  }`;
  output.endLocation = `${capitalizeFirstLetter(end)}, ${
    endEvent.specifiedLocation
  }`;
  output.startDateString =
    formatDateTime(startEvent.dateTime) + ' ' + startEvent.event;
  output.endDateString =
    formatDateTime(endEvent.dateTime) + ' ' + endEvent.event;
  output.dateTime = new Date(startEvent.dateTime).toLocaleDateString();
  output.travelTime = timeBetweenRouteEvents(
    startEvent.dateTime,
    endEvent.dateTime
  );
  output.price = formatPrice(price);
  output.id = newGuid();
  output.tripName = travelPlan.tripName;
  return output;
}
