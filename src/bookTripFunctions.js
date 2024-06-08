// pass through the destination.value that is selected by the user
// generate the destinationId so that it can be passed to the post request function bookTrip()

function getDestinationId(destinationInput, destinations) { 
    const destinationId = destinations.filter(destination => {
        return destination.destination === destinationInput
    })
    // console.log(destinationId[0].id)
    return destinationId[0].id
}

export {
    getDestinationId
}