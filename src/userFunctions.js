function getUserData(users, username) {
    const userId = parseInt(username.match(/\d+/g))
    const user = users.find(user => {
        return user.id === userId
    })
    return user
}

function getTripsTakenByUser(trips, userId) {
    const userTrips = trips.filter(trip => {
        return trip.userID === userId
    })
    return userTrips
}

function getDestinationsVisitedByUser(trips, destinations, userId) {
    const userTrips = trips.filter(trip => {
        return trip.userID === userId
    })
    const destinationIDs = userTrips.map(trip => {
        return trip.destinationID
    })
    const userDestinations = destinations.filter(destination => {
        return destinationIDs.includes(destination.id)
    })
    const userDestinationsByName = userDestinations.map(destination => {
        return destination.destination
    })
    return userDestinationsByName
}
export {
    getUserData,
    getTripsTakenByUser,
    getDestinationsVisitedByUser,
}