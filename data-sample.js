var travelPlans = [
  {
    ID: "676381c9-3aca-4474-9490-7de4a71e1c89",
    train: "X2000",
    trainId: "SJ1337",
    maxCount: 250,
    bookedTickets: 100,
    pricePerStop: 300,
    departured: false,
    routeEvents: [
      {
        dateTime: "2012-04-23T18:30:43.511Z",
        location: "Göteborg",
        event: "Departure",
      },
      {
        dateTime: "2012-04-23T20:30:43.511Z",
        location: "Jönköping",
        event: "Arrival",
      },
      {
        dateTime: "2012-04-23T20:35:43.511Z",
        location: "Jönköping",
        event: "Departure",
      },
      {
        dateTime: "2012-04-23T22:30:43.511Z",
        location: "Stockholm",
        event: "Arrival",
      },
    ],
  },
];
var bookings = [
  {
    id: "2266a136-3208-4385-9881-d9b90b346e28",
    travelPlan: "676381c9-3aca-4474-9490-7de4a71e1c89",
    paymentType: "stripe",
    paymentId: "66e3d0d2-b92e-42ad-a0e1-3e06bea8b156",
    paymentReceived: true,
    buyer: "Boris Grischenko",
    tickets: 3,
    price: 1800,
    start: "Göteborg",
    end: "Stockholm",
    email: "borran@happy.com",
  },
];
