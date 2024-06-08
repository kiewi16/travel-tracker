import chai from 'chai';
const expect = chai.expect;
import usersSampleDataset from '../src/data/users-sample-test-data.js';
import tripsSampleDataset from '../src/data/trips-sample-test-data.js';
import destinationsSampleDataset from '../src/data/destinations-sample-test-data.js'; 
const { getUserData, getTripsTakenByUser, getDestinationsVisitedByUser, getUpcomingTripsForUser, getDestinationsUserWillVisit, calculateTotalSpentThisYear, } = require('../src/userFunctions.js')
const allSampleUsers = usersSampleDataset.usersSampleDataset;
const allSampleTrips = tripsSampleDataset.tripsSampleDataset; 
const allSampleDestinations = destinationsSampleDataset.destinationsSampleDataset; 

describe('Return User Data', function(){
  it('should return user data based on their username', function() {
    const username = "traveler1";
    const user1 = getUserData(allSampleUsers, username);

    expect(user1).to.deep.equal({
      "id":1,
      "name":"Ham Leadbeater",
      "travelerType":"relaxer"
    });
  });

  it('should return a different user/s data based on their username', function() {
    const username = "traveler10";
    const user10 = getUserData(allSampleUsers, username);

    expect(user10).to.deep.equal({
      "id":10,
      "name":"Rickie Jodlowski",
      "travelerType":"relaxer"
    });
  });
});

describe('Return Trips a User has Taken', function(){ 
  it('should return the trips taken by a user before the current date', function() {
    const userId = 3
    const user3Trips = getTripsTakenByUser(allSampleTrips, userId);

    expect(user3Trips).to.deep.equal([{
      "date": new Date ("2022/05/22"),
      "destinationID": 22,
      "duration": 17, 
      "travelers": 4
    },
    {
      "date": new Date ("2022/02/12"),
      "destinationID": 12,
      "duration": 11,
      "travelers": 1
    },
    {
      "date": new Date ("2019/05/19"),
      "destinationID": 37,
      "duration": 7,
      "travelers": 3
    }]);
  });
  it('should return the trips taken by a different user before the current date', function() {
    const userId = 4
    const user4Trips = getTripsTakenByUser(allSampleTrips, userId);

    expect(user4Trips).to.deep.equal([{
      "date": new Date ("2022/02/25"),
      "destinationID": 14,
      "duration": 10, 
      "travelers": 2
    }]);
  });
  it('should return a message if a user has no past trips')
  
  it('should return the destinations a user has visted', function () {
    const userId = 3
    const user3Trips = getTripsTakenByUser(allSampleTrips, userId)
    const user3Destinations = getDestinationsVisitedByUser(user3Trips, allSampleDestinations)

    expect(user3Destinations).to.deep.equal(["Wellington, New Zealand", "Rome, Italy", "Frankfurt, Germany"]);
  });
  it('should return the destinations a different user has visted', function () {
    const userId = 4
    const user4Trips = getTripsTakenByUser(allSampleTrips, userId)
    const user4Destinations = getDestinationsVisitedByUser(user4Trips, allSampleDestinations)

    expect(user4Destinations).to.deep.equal(["Marrakesh, Morocco"]);
  });

  it('should return a message if the user has not visited any destinations')
});

describe('Upcoming Trips for a User', function () {
  it('should return the upcoming trips for a user', function () {
    const userId = 1
    const user1UpcomingTrips = getUpcomingTripsForUser(allSampleTrips, userId)

    expect(user1UpcomingTrips).to.deep.equal([{
      "date": new Date ("2022/09/16"),
      "destinationID": 49,
      "duration": 8, 
      "travelers": 1,
    },
    {
      "date": new Date ("2022/10/14"),
      "destinationID": 5,
      "duration": 4, 
      "travelers": 4,
    }]);
  });
  it('should return the upcoming trips for a different user', function () {
    const userId = 4
    const user4UpcomingTrips = getUpcomingTripsForUser(allSampleTrips, userId)

    expect(user4UpcomingTrips).to.deep.equal([{
      "date": new Date ("2022/09/24"),
      "destinationID": 35,
      "duration": 10, 
      "travelers": 1,
    }]);
  });
  it('should return the destinations a user will visit', function () {
    const userId = 1
    const user1UpcomingTrips = getUpcomingTripsForUser(allSampleTrips, userId)
    const user1UpcomingDestinations = getDestinationsUserWillVisit(user1UpcomingTrips, allSampleDestinations)

    expect(user1UpcomingDestinations).to.deep.equal(["Madrid, Spain", "Castries, St Lucia"])
  });
  it('should return the destinations a different user will visit', function () {
    const userId = 4
    const user4UpcomingTrips = getUpcomingTripsForUser(allSampleTrips, userId)
    const user4UpcomingDestinations = getDestinationsUserWillVisit(user4UpcomingTrips, allSampleDestinations)

    expect(user4UpcomingDestinations).to.deep.equal(["Anchorage, Alaska"])
  });
});

describe('Calculate Total Money Spent on Trips This Year', function () {
  it('should calcuate the total spent on trips this year', function () {
    const userId = 1
    const user1TotalSpentThisYear = calculateTotalSpentThisYear(allSampleTrips, allSampleDestinations, userId)

    expect(user1TotalSpentThisYear).to.equal(9339)
  });
  it('should return 0 if the user has not spent any money on trips this year', function () {
    const userId = 11
    const user11TotalSpentThisYear = calculateTotalSpentThisYear(allSampleTrips, allSampleDestinations, userId)

    expect(user11TotalSpentThisYear).to.equal(0)
  });
});
