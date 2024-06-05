import chai from 'chai';
const expect = chai.expect;
import usersSampleDataset from '../src/data/users-sample-test-data.js';
import tripsSampleDataset from '../src/data/trips-sample-test-data.js';
import destinationsSampleDataset from '../src/data/destinations-sample-test-data.js'; 
const allSampleUsers = usersSampleDataset.usersSampleDataset;
const allSampleTrips = tripsSampleDataset.tripsSampleDataset; 
const allSampleDestinations = destinationsSampleDataset.destinationsSampleDataset; 

describe('See if the tests are running', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
    console.log("users:", allSampleUsers)
    console.log("trips:", allSampleTrips)
    console.log("destinations:", allSampleDestinations)
  });
});
