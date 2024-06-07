function getUserData(users, username) {
    const userId = parseInt(username.match(/\d+/g))
    const user = users.find(user => {
        return user.id === userId
    })
    return user
}

function getTripsTakenByUser(trips, userId) {
    const currentDate = new Date ("2022/10/12") 
    const currentDay = currentDate.getDate()
    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear()
   
    // console.log("day:", currentDay)
    // console.log("month:", currentMonth)
    // console.log("year:", currentYear)
    const userTrips = trips.filter(trip => {
        return trip.userID === userId
    })
    console.log("userTrips:", userTrips)
    const userTripsConvertedDate = userTrips.map(userTrip => {
        const tripDate = new Date(userTrip.date)
        return {
            day: tripDate.getDate(),
            month: tripDate.getMonth() + 1,
            year: tripDate.getFullYear(),
            destinationID: userTrip.destinationID,
            duration: userTrip.duration, 
            travelers: userTrip.travelers,
        }
    })
    // console.log("new user object:", userTripsConvertedDate)
        const tripsTakenByUser = userTripsConvertedDate.filter(userTripConvertedDate => {
            return userTripConvertedDate.year <= currentYear && userTripConvertedDate.month <= currentMonth
        })
        console.log("test:", tripsTakenByUser)
        return tripsTakenByUser
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

function calculateTotalSpentThisYear (trips, destinations, userId) {
    const tripsTakenByUser = trips.filter(trip => {
        return trip.userID === userId && trip.status === "approved"
    })
    const userTripsInfo = tripsTakenByUser.map(trip => {
        return {
            destinationID: trip.destinationID,
            duration: trip.duration,
            numOfTravelers: trip.travelers,
            date: trip.date
        }       
    })
    const tripsInCurrentYear = userTripsInfo.filter(userTrip => {
        return userTrip.date.includes('2022')
    })
    const totalSpentByCategory = tripsInCurrentYear.reduce((accumulator, tripInfo) => {
        destinations.forEach(destination => {
            if (destination.id === tripInfo.destinationID) {
                accumulator.lodgingCosts += destination.estimatedLodgingCostPerDay * tripInfo.duration
                accumulator.flightCosts += destination.estimatedFlightCostPerPerson * tripInfo.numOfTravelers
            }
        })
    return accumulator
    }, {lodgingCosts: 0, flightCosts: 0})  
    const totalSpent = (totalSpentByCategory.lodgingCosts + totalSpentByCategory.flightCosts) 
    const totalSpentWithAgentFee = (totalSpent * .10) + totalSpent
    return totalSpentWithAgentFee
}
export {
    getUserData,
    getTripsTakenByUser,
    getDestinationsVisitedByUser,
    calculateTotalSpentThisYear, 
}