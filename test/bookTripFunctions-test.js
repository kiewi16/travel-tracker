import chai from 'chai';
const expect = chai.expect;
import usersSampleDataset from '../src/data/users-sample-test-data.js';
import tripsSampleDataset from '../src/data/trips-sample-test-data.js';
import destinationsSampleDataset from '../src/data/destinations-sample-test-data.js'; 
const { getDestinationId, calculateTripCost } = require('../src/bookTripFunctions.js')
const allSampleUsers = usersSampleDataset.usersSampleDataset;
const allSampleTrips = tripsSampleDataset.tripsSampleDataset; 
const allSampleDestinations = destinationsSampleDataset.destinationsSampleDataset; 

describe('Return Destination Id', function(){
 it('should return the destination Id when given a destination name', function() {
    const destination = "Lima, Peru"    
    const destinationId= getDestinationId(destination, allSampleDestinations)
    expect(destinationId).to.equal(1)
  });

  it('should return the destination Id when given a different destination name', function() {
    const destination = "Stockholm, Sweden"   
    const destinationId= getDestinationId(destination, allSampleDestinations)
    expect(destinationId).to.equal(2)
  });
});
describe('Calculate Trip Cost', function (){
  it('should calculate the cost of a pending trip', function(){
    const destination = "Lima, Peru"    
    const destinationId = getDestinationId(destination, allSampleDestinations)
    const numOfTravelers = 4
    const duration = 5
    const tripCost = calculateTripCost(destinationId, allSampleDestinations, numOfTravelers, duration)

    expect(tripCost).to.equal(2145)
  });
  it('should calculate the cost of a different pending trip', function(){
    const destination = "Stockholm, Sweden" 
    const destinationId = getDestinationId(destination, allSampleDestinations)
    const numOfTravelers = 2
    const duration = 8
    const tripCost = calculateTripCost(destinationId, allSampleDestinations, numOfTravelers, duration)

    expect(tripCost).to.equal(2596)
  });
});