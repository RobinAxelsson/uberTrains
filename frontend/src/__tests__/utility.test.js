const { timeBetweenRouteEvents, extractTravelListData } = require("../services/Utilities");

const sum = (a, b) => a + b;
it("Sanity check sum", () => {
  expect(sum(1, 2)).toEqual(3);
  expect(sum(2, 2)).toEqual(4);
});

it("should calculate correct time", () => {
  let routeEvents = [
    {
      latitude: 57.7072326,
      longitude: 11.9670171,
      dateTime: "2022-02-22T18:30:00.000Z",
      location: "göteborg",
      specifiedLocation: "Platform 5",
      event: "Avgång",
    },
    {
      latitude: 57.7825634,
      longitude: 14.165719,
      dateTime: "2022-02-22T20:30:00.000Z",
      specifiedLocation: "Platform 1",
      location: "jönköping",
      event: "Ankomst",
    }
  ];
    let actualTime = timeBetweenRouteEvents(routeEvents[0].dateTime, routeEvents[1].dateTime);
    expect(actualTime).toStrictEqual("02:00 h")
});


it("should extract correct data", () => {
  let travelPlan = {
    id: 1,
    price: 3333,
    routeEvents: [
      {
        latitude: 57.7072326,
        longitude: 11.9670171,
        dateTime: '2022-02-22T18:30:00.000Z',
        location: 'göteborg',
        specifiedLocation: 'Platform 5',
        event: 'Avgång',
      },
      {
        latitude: 57.7825634,
        longitude: 14.165719,
        dateTime: '2022-02-22T20:30:00.000Z',
        specifiedLocation: 'Platform 1',
        location: 'jönköping',
        event: 'Ankomst',
      },
    ],
  };

  const travelData = extractTravelListData(travelPlan, 'Göteborg', 'Jönköping');
  expect(travelData.startLocation).toBe("Göteborg, Platform 5");
  expect(travelData.endLocation).toBe("Jönköping, Platform 1");
  expect(travelData.travelTime).toBe("02:00 h");
});

it("should extract correct data JKPNG - STHLM", () => {
  let travelPlan = {
    id: 1,
    price: 3333,
    routeEvents:  [
      {
        latitude: 57.7072326,
        longitude: 11.9670171,
        dateTime: '2022-02-22T18:30:00.000Z',
        location: 'göteborg',
        specifiedLocation: 'Platform 5',
        event: 'Avgång',
      },
      {
        latitude: 57.7825634,
        longitude: 14.165719,
        dateTime: '2022-02-22T20:30:00.000Z',
        specifiedLocation: 'Platform 1',
        location: 'jönköping',
        event: 'Ankomst',
      },
      {
        latitude: 57.7825634,
        longitude: 14.165719,
        dateTime: '2022-02-22T20:35:00.000Z',
        specifiedLocation: 'Platform 1',
        location: 'jönköping',
        event: 'Avgång',
      },
      {
        latitude: 59.3251172,
        longitude: 18.0710935,
        dateTime: '2022-02-22T22:30:00.000Z',
        specifiedLocation: 'Platform 10a',
        location: 'stockholm',
        event: 'Ankomst',
      },
    ],
  };

  const travelData = extractTravelListData(travelPlan, 'Göteborg', 'Stockholm');
  expect(travelData.startLocation).toBe("Göteborg, Platform 5");
  expect(travelData.endLocation).toBe("Stockholm, Platform 10a");
  expect(travelData.travelTime).toBe("04:00 h");
});