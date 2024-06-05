import chai from 'chai';
const expect = chai.expect;
import usersSampleDataset from '../src/data/users-sample-test-data.js';
import tripsSampleDataset from '../src/data/trips-sample-test-data.js';
import destinationsSampleDataset from '../src/data/destinations-sample-test-data.js'; 
const { getUserData } = require('../src/userFunctions.js')
const allSampleUsers = usersSampleDataset.usersSampleDataset;
const allSampleTrips = tripsSampleDataset.tripsSampleDataset; 
const allSampleDestinations = destinationsSampleDataset.destinationsSampleDataset; 

describe('Return User Data', function(){
  it('should return user data based on their id', function() {
    const username = "traveler1"
    const user1 = getUserData(allSampleUsers, username)

    expect(user1).to.deep.equal({
      "id":1,
      "name":"Ham Leadbeater",
      "travelerType":"relaxer"
    });
  });

  it.only('should return a different user/s data based on their id', function() {
    const username = "traveler10"
    const user10 = getUserData(allSampleUsers, username)

    expect(user10).to.deep.equal({
      "id":10,
      "name":"Rickie Jodlowski",
      "travelerType":"relaxer"
    });
  });
});
