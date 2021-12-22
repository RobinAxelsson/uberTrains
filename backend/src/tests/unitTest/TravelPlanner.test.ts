import { travelPlan } from "../../models/Travel";
import { TravelPlanner } from "../../services/TravelPlanner";

function sum(a: number, b: number) {
  return a + b;
}
test("adds 1+2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

const travelPlans: travelPlan[] = [
  {
    id: "676381c9-3aca-4474-9490-7de4a71e1c89",
    train: "X2000",
    trainId: "SJ1337",
    maxCount: 250,
    bookedTickets: 100,
    pricePerStop: 300,
    departured: false,
    routeEvents: [
      {
        dateTime: "2012-04-23T18:30:43.511Z",
        location: "Goteborg",
        eventType: "departure",
      },
      {
        dateTime: "2012-04-23T20:30:43.511Z",
        location: "Jonkoping",
        eventType: "arrival",
      },
      {
        dateTime: "2012-04-23T20:35:43.511Z",
        location: "Jonkoping",
        eventType: "departure",
      },
      {
        dateTime: "2012-04-23T22:30:43.511Z",
        location: "Stockholm",
        eventType: "arrival",
      },
    ],
  },
];

test("Expecting filter queries to get correct journey.", () => {
  expect(
    TravelPlanner.filterPlans(
      travelPlans,
      "2012-04-23",
      "Goteborg",
      "Stockholm"
    )
  ).toStrictEqual([travelPlans[0]]);
});
test("Expecting still filter queries to get correct journey when asking for Jonkoping.", () => {
  expect(
    TravelPlanner.filterPlans(
      travelPlans,
      "2012-04-23",
      "Jonkoping",
      "Stockholm"
    )
  ).toStrictEqual([travelPlans[0]]);
});
test("Expecting still filter queries to get correct journey when asking for Goteborg-Jonkoping.", () => {
  expect(
    TravelPlanner.filterPlans(
      travelPlans,
      "2012-04-23",
      "Goteborg",
      "Jonkoping"
    )
  ).toStrictEqual([travelPlans[0]]);
});

test("Expecting no retour bookable", () => {
  expect(
    TravelPlanner.filterPlans(
      travelPlans,
      "2012-04-23",
      "Stockholm",
      "Goteborg"
    )
  ).toStrictEqual([]);
});
