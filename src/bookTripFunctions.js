// pass through the destination.value that is selected by the user
// generate the destinationId so that it can be passed to the post request function bookTrip()

function getDestinationId(destinationInput, destinations) { 
    const destinationId = destinations.filter(destination => {
        return destination.destination === destinationInput
    })
    // console.log(destinationId[0].id)
    return destinationId[0].id
}

function calculateTripCost(destinationId, destinations, numOfTravelers, duration){
    const destinationInfo = destinations.filter(destination => {
        return destination.id === destinationId
    })
    // console.log("destinationInfo:", destinationInfo)
    const tripCost = (destinationInfo[0].estimatedLodgingCostPerDay * duration) + (destinationInfo[0].estimatedFlightCostPerPerson * numOfTravelers)
    const tripCostWithAgentFee = tripCost * 1.1
    return tripCostWithAgentFee
}
export {
    getDestinationId,
    calculateTripCost
}