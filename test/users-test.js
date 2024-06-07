import chai from 'chai';
const expect = chai.expect;
import usersSampleDataset from '../src/data/users-sample-test-data.js';
import tripsSampleDataset from '../src/data/trips-sample-test-data.js';
import destinationsSampleDataset from '../src/data/destinations-sample-test-data.js'; 
const { getUserData, getTripsTakenByUser, getDestinationsVisitedByUser, calculateTotalSpentThisYear } = require('../src/userFunctions.js')
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

describe('Return User Trips', function(){
  
  it('should return trips taken by a user before the current date based on their user ID', function() {
    const userId = 1
    const user1Trips = getTripsTakenByUser(allSampleTrips, userId);

    expect(user1Trips).to.deep.equal([{
      "day": 16,
      "month": 9,
      "year": 2022,
      "destinationID": 49,
      "duration": 8, 
      "travelers": 1
    },
    {
      "day": 14,
      "month": 10,
      "year": 2022,
      "destinationID": 5,
      "duration": 4,
      "travelers": 4
    }]);
  });
  it('should return specific destinations a user has visted', function () {
    const userId = 1
    const user1Destinations = getDestinationsVisitedByUser(allSampleTrips, allSampleDestinations, userId)

    expect(user1Destinations).to.deep.equal(["Madrid, Spain", "Castries, St Lucia"]);
  });
});

describe('Calculate Total Money Spent on Trips This Year', function () {
  it('should calcuate the total spent on trips this year', function () {
    const userId = 1
    const user1TotalSpentThisYear = calculateTotalSpentThisYear(allSampleTrips, allSampleDestinations, userId)
  })
})
