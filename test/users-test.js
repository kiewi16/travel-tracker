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
  it('should return trips taken by a user based on their user ID', function() {
    const userId = 1
    const user1Trips = getTripsTakenByUser(allSampleTrips, userId);

    expect(user1Trips).to.deep.equal([{
      "id":1,"userID":1,
      "destinationID":49,
      "travelers":1,
      "date":"2022/09/16",
      "duration":8,
      "status":"approved",
      "suggestedActivities":[],
    },
    {
      "id":11,
      "userID":1,
      "destinationID":5,
      "travelers":4,
      "date":"2022/10/14",
      "duration":4,
      "status":"approved",
     "suggestedActivities":[]
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
