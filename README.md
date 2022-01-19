# UberTrains Grupp 6

![ubertrains frontpage](img/2022-01-16-21-55-10.png)

## Introduction

This repository contains proof-of-concept booking system for travels by train and is a collaboration between 3 different classes (one Java, one .Net and one Test -class) from the vocational school Teknikhögskolan. We are all Swedish speaking so some of the content is in Swedish. We followed SCRUM Methodology and worked together for 6 weeks (6 sprints).

[SWEDISH-SETUP-GUIDE-NEWBIE-FRIENDLY](KOM-IGÅNG-swedish.md)

[GITHUB-REPO](https://github.com/RobinAxelsson/uberTrains)

## The team

- Alexander Malm (Java-developer) -> [github page](https://github.com/malmz90)
- Albin Alm (.NET-developer) -> [github page](https://github.com/albinalm)
- Maria Herm (Software Tester) -> [github page](https://github.com/mariamurmansk)
- Adam Kärmander (Java-developer) -> [github page](https://github.com/adamkarmander)
- Anas Shikh Aldaya (.NET-developer) -> [github page](https://github.com/ItsAnass)
- Robin Axelsson (.NET-developer) -> [github page](https://github.com/RobinAxelsson)
- Marcus Dagquist (Software Tester) -> [github page](https://github.com/marcusdagquist)

Following software technologies are used.

`Node.js | Express.js | React | CRACO | Sqlite | Tailwind | TypeORM | Prettier`

---

- [UberTrains Grupp 6](#ubertrains-grupp-6)
  - [Introduction](#introduction)
  - [The team](#the-team)
  - [Quick-setup for development](#quick-setup-for-development)
  - [What are the different modes to start the app in?](#what-are-the-different-modes-to-start-the-app-in)
  - [How to add data to the database?](#how-to-add-data-to-the-database)
  - [How do you navigate the files and folders backend?](#how-do-you-navigate-the-files-and-folders-backend)
  - [How do you navigate the files and folders frontend?](#how-do-you-navigate-the-files-and-folders-frontend)
  - [How to delete data in the database?](#how-to-delete-data-in-the-database)
  - [How can you view and query the database?](#how-can-you-view-and-query-the-database)
  - [How do you test the app in mobile?](#how-do-you-test-the-app-in-mobile)
  - [Is there a CI Pipeline/Github-Actions?](#is-there-a-ci-pipelinegithub-actions)
  - [What is Newman?](#what-is-newman)
  - [What tests do Newman run?](#what-tests-do-newman-run)
  - [How to add things to development mode in backend or frontend?](#how-to-add-things-to-development-mode-in-backend-or-frontend)
  - [How do we format the code?](#how-do-we-format-the-code)
  - [How to query data in TypeOrm](#how-to-query-data-in-typeorm)
  - [How do we use branches? Feature branch? CI?](#how-do-we-use-branches-feature-branch-ci)
  - [What is a good getting started?](#what-is-a-good-getting-started)

## Quick-setup for development

From the base directory run:

```shell
# install
cd backend && npm install
npm upgrade
cd ..
cd frontend && npm install
npm upgrade
```

Again from base directory terminal 1

```shell
# run backend
cd backend && npm run watch:dev
```

Again from base directory **but terminal 2**

```shell
# run frontend
cd frontend && npm run start:dev
```

## What are the different modes to start the app in?

Both frontend and backend has a development mode:
```
npm run start:dev
```

- **Frontend dev mode** has some extra buttons to easier debug the application.
- **Backend dev mode** runs the backend with TS-Node and do not transpile the typescript to JavaScript.

## How to add data to the database?

There is two ways to add data to the database: The Seeder class in backend and using endpoint (recommended tool is Postman). The endpoint method is not fully developed and needs to be looked over, also the Seeder can be refactored and smarter. **Right now we seed every time we run the app in development mode**.

## How do you navigate the files and folders backend?

```
# Backend src folder
 ┃
 ┣ database #SQLite saves the entire database in a file.
 ┃ ┣ dev.sqlite3
 ┃ ┣ dev.sqlite3-shm
 ┃ ┗ dev.sqlite3-wal
 ┃
 ┣ dtos #data transfer objects - used in api requests
 ┃ ┣ bookingDto.json
 ┃ ┣ BookingDto.ts
 ┃ ┣ chargeDto.json
 ┃ ┣ getPriceDto.json
 ┃ ┣ GetPriceDto.ts
 ┃ ┣ stripeTokenDto.json
 ┃ ┣ travelPlanDto.json
 ┃ ┗ TravelPlanDto.ts
 ┃
 ┣ models #Database models with TypeOrm annotation
 ┃ ┣ Booking.entity.ts
 ┃ ┣ PriceModel.entity.ts
 ┃ ┣ RouteEvent.entity.ts
 ┃ ┣ Seat.entity.ts
 ┃ ┣ TrainUnit.entity.ts
 ┃ ┗ TravelPlan.entity.ts
 ┃
 ┣ resources
 ┃ ┗ template.html
 ┃
 ┣ routes #The express servers routers or **controllers**
 ┃ ┣ booking.router.ts
 ┃ ┣ priceModel.router.ts
 ┃ ┣ routeEvent.router.ts
 ┃ ┣ seat.router.ts
 ┃ ┣ test.router.ts
 ┃ ┣ trainUnit.router.ts
 ┃ ┗ travelPlan.router.ts
 ┃
 ┣ services
 ┃ ┣ BookingManager.ts
 ┃ ┣ DbEntityManager.ts #Helper with fetching entities
 ┃ ┣ MailService.ts #Sends the confirmation email with stripe info
 ┃ ┣ PaymentManager.ts
 ┃ ┣ PriceCalculator.ts
 ┃ ┣ Seeder.ts
 ┃ ┣ TravelPlanner.ts #Big class that loads full travels when user confirms date.
 ┃ ┗ UtilityFunctions.ts
 ┃
 ┣ tests
 ┃ ┗ TypeOrmRepostitory.test.ts #All tests in same file, Database, functions...
 ┣ .prettierrc #Needed to have same code formatting.
 ┗ index.ts #Loads the express server and connects the database and seeds the database.
```
## How do you navigate the files and folders frontend?

```
# Frontend src folder
 ┣ components #the UI components
 ┃ ┣ toast
 ┃ ┃ ┣ Toast.js
 ┃ ┃ ┗ Toast.module.css
 ┃ ┃
 ┃ ┣ BookingCheckout.js
 ┃ ┣ BookingReceipt.js
 ┃ ┣ Footer.js
 ┃ ┣ ListTravels.js
 ┃ ┣ LogoForm.js
 ┃ ┣ Navbar.js
 ┃ ┣ Seats.js
 ┃ ┣ TravelForm.js
 ┃ ┗ UberTrainIcon.js
 ┃
 ┣ constants # Saves the urls as global variables (easier for proxy)
 ┃ ┗ urls.js
 ┃
 ┣ resources
 ┃ ┣ background.jpg
 ┃ ┣ banner.jpg
 ┃ ┣ logo.jpeg
 ┃ ┣ logo_black.png
 ┃ ┣ logo_transparent.png
 ┃ ┗ logo_white.png
 ┃
 ┣ services
 ┃ ┣ BackendClient.js #sends api-calls to backend
 ┃ ┗ Utilities.js #decouples logic from components
 ┃
 ┣ __tests__
 ┃ ┗ utility.test.js
 ┃
 ┣ .prettierrc #Need for common formatting
 ┣ App.css
 ┣ App.js
 ┣ index.css
 ┣ index.js
 ┣ jsconfig.json
 ┗ logo.svg
```


## How to delete data in the database?

**Easiest is to delete the database folder** - it will be reseeded anyway in the next run.

## How can you view and query the database?

The database is a SQLite relational database and it is saved in database folder under backend/src/database. Recommended tool to work with it is the [VS-Code extension SQLite](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite), follow the documentation.

## How do you test the app in mobile?

We use a proxy configuration in React (see frontend/package.json proxy property) that ports the incoming request in frontend to the backend to be able to avoid CORS complexity (cross origin requests).

1) You need to know your local IP-address.
2) You need to turn off firewall in private network or configure it to give vs code permission to receive incoming signals.
3) You need to start the application in VS Code (in two terminals):
   1) cd frontend && npm run start
   2) cd backend && npm run start:dev
4) Now should you be able to browse to the IP-address $(your-local-address):3000

```
http://192.168.1.4:3000 //example
```

## Is there a CI Pipeline/Github-Actions?

Yes every time you push a branch to GitHub it will run the jobs inside [/.github/workflows/build&test.yml](/.github/workflows/build&test.yml).

[LINK-TO-ACTIONS](https://github.com/RobinAxelsson/uberTrains/actions)

![](/img/2022-01-19-14-17-20.png)

## What is Newman?

Newman is the CLI version of Postman, it is used to run postman tests inside a headless server aka our pipeline. To run this we use a **secret api key** that is saved in the repositories GitHub secrets and is not accessible except for the owner of the repo. The Newman script [/scripts/newman-endpoint-job.sh](/scripts/newman-endpoint-job.sh) is **a bash script** and is made for the ubuntu server that **runs the pipeline.**

## What tests do Newman run?

We share a Postman Collection that is fetched in the pipeline and run by Newman after the backend is started. The [STATIC-IMAGE-OF-THE-POSTMAN-TESTS](https://www.getpostman.com/collections/2fe41057f5b1adcda84f)

## How to add things to development mode in backend or frontend?

Just use the IF-statement at an relevant part of the code.

```javascript
if (process.env.NODE_ENV === "Development") {
  //Enter your feature/functions here
}
```

## How do we format the code?

It is **important to use Prettier extension** to format the code - else the commits will become harder to read and the new formatting will be pushed every time. It has a potential to be a **hazard.**

[PRETTIER-EXTENSION](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

The configuration file(s), one in backend one in frontend.

```json
//from the .prettierrc files
{
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}
```

## How to query data in TypeOrm

Best example in our code is [TravelPlanner.ts](/backend/src/services/TravelPlanner.ts)

```javascript
  async getFullTravelPlanById(id: number) {
    return (await createQueryBuilder(TravelPlan)
      .leftJoinAndSelect("TravelPlan.routeEvents", "RouteEvent")
      .leftJoinAndSelect("TravelPlan.trainUnits", "TrainUnit")
      .leftJoinAndSelect("TravelPlan.priceModel", "PriceModel")
      .leftJoinAndSelect("TrainUnit.seats", "Seat")
      .leftJoinAndSelect("Seat.booking", "Booking")
      .where("travelPlan.id = :id", { id: id })
      .getOne()) as TravelPlan;
  }
```

We use TypeOrms queryBuilder to construct our SQL-queries.

[USED-DOCUMENTATION-TYPEORM-QUERYBUILDER](https://orkhan.gitbook.io/typeorm/docs/select-query-builder)

## How do we use branches? Feature branch? CI?

We create a branch when a new feature should be made, when we are ready we **merge dev into the feature branch.** Push the branch to GitHub to see if it passes the pipeline and if it does **we merge the feature branch into dev.**

We merge to **main** in consultancy with the team.

## What is a good getting started?

If you are comfortable with TypeScript feel free to refactor the Seeder and as second with the seeder provide the app with richer data when it comes to travels would be a nice start! :)
