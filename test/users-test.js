import chai from 'chai';
const expect = chai.expect;
import usersSampleDataset from '../src/data/users-sample-test-data.js';
import tripsSampleDataset from '../src/data/trips-sample-test-data.js';
import destinationsSampleDataset from '../src/data/destinations-sample-test-data.js'; 
const { getUserData, getTripsTakenByUser, getDestinationsVisitedByUser, getUpcomingTripsForUser, getDestinationsUserWillVisit, getPendingTripsForUser, getPendingDestinations, calculateTotalSpentThisYear, } = require('../src/userFunctions.js')
const allSampleUsers = usersSampleDataset.usersSampleDataset;
const allSampleTrips = tripsSampleDataset.tripsSampleDataset; 
const allSampleDestinations = destinationsSampleDataset.destinationsSampleDataset; 

describe('Return User Data', function(){
  it('should return user data based on a provided username', function() {
    const username = "traveler1";
    const user1 = getUserData(allSampleUsers, username);

    expect(user1).to.deep.equal({
      "id":1,
      "name":"Ham Leadbeater",
      "travelerType":"relaxer"
    });
  });

  it('should return a different user/s data based on a provided username', function() {
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
  it('should return nothing if a user has no past trips', function (){
    const userId = 1
    const user1Trips = getTripsTakenByUser(allSampleTrips, userId);

    expect(user1Trips).to.deep.equal([])
    expect(user1Trips.length).to.equal(0)
  });
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
  it('should return nothing if a user has no upcoming trips', function (){
    const userId = 3
    const user3UpcomingTrips = getUpcomingTripsForUser(allSampleTrips, userId)

    expect(user3UpcomingTrips).to.deep.equal([])
    expect(user3UpcomingTrips.length).to.equal(0)
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

describe('Trips Pending for a User', function () {
  it.only('should return the pending trips for a user', function () {
    const userId = 1
    const user1PendingTrips = getPendingTripsForUser(allSampleTrips, userId, allSampleDestinations)

    expect(user1PendingTrips).to.deep.equal([{
      "date": new Date ("2022/11/22"),
      "destinationID": 25,
      "duration": 4, 
      "travelers": 7,
    }]);
  });
  it('should return the pending trips for a different user', function () {
    const userId = 4
    const user4PendingTrips = getPendingTripsForUser(allSampleTrips, userId)

    expect(user4PendingTrips).to.deep.equal([{
      "date": new Date ("2022/10/04"),
      "destinationID": 41,
      "duration": 2, 
      "travelers": 4,
    }]);
  });
  it('should return nothing if a user has no pending trips', function () {
    const userId = 9
    const user9PendingTrips = getPendingTripsForUser(allSampleTrips, userId)

    expect(user9PendingTrips).to.deep.equal([]);
  });
  it('should return the pending destinations for a user', function () {
    const userId = 1
    const user1PendingTrips = getPendingTripsForUser(allSampleTrips, userId)
    const user1PendingDestinations = getPendingDestinations(user1PendingTrips, allSampleDestinations)

    expect(user1PendingDestinations).to.deep.equal(["New York, New York"]);
  });
  it('should return the pending destinations for a different user', function () {
    const userId = 4
    const user4PendingTrips = getPendingTripsForUser(allSampleTrips, userId)
    const user4PendingDestinations = getPendingDestinations(user4PendingTrips, allSampleDestinations)

    expect(user4PendingDestinations).to.deep.equal(["Montego Bay, Jamaica"]);
  });
  it('should return nothing if a user has no pending destinations', function () {
    const userId = 9
    const user9PendingTrips = getPendingTripsForUser(allSampleTrips, userId)
    const user9PendingDestinations = getPendingDestinations(user9PendingTrips, allSampleDestinations)

    expect(user9PendingDestinations).to.deep.equal([]);
  });
});

describe('Calculate Total Money Spent on Trips This Year', function () {
  it('should calcuate the total spent on trips this year by a user', function () {
    const userId = 1
    const user1TotalSpentThisYear = calculateTotalSpentThisYear(allSampleTrips, allSampleDestinations, userId)

    expect(user1TotalSpentThisYear).to.equal(9339)
  });
  it('should calcuate the total spent on trips this year by a different user', function () {
    const userId = 10
    const user10TotalSpentThisYear = calculateTotalSpentThisYear(allSampleTrips, allSampleDestinations, userId)

    expect(user10TotalSpentThisYear).to.equal(29271)
  });
  it('should return 0 if the user has not spent any money on trips this year', function () {
    const userId = 11
    const user11TotalSpentThisYear = calculateTotalSpentThisYear(allSampleTrips, allSampleDestinations, userId)

    expect(user11TotalSpentThisYear).to.equal(0)
  });
});
