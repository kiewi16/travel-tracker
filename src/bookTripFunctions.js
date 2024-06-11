function getDestinationId(destinationInput, destinations) { 
    const destinationId = destinations.filter(destination => {
        return destination.destination === destinationInput
    })
    return destinationId[0].id
}

function calculateTripCost(destinationId, destinations, numOfTravelers, duration){
    const destinationInfo = destinations.filter(destination => {
        return destination.id === destinationId
    })
    const tripCost = (destinationInfo[0].estimatedLodgingCostPerDay * duration) + (destinationInfo[0].estimatedFlightCostPerPerson * numOfTravelers)
    const tripCostWithAgentFee = tripCost * 1.1
    return tripCostWithAgentFee
}
export {
    getDestinationId,
    calculateTripCost
}