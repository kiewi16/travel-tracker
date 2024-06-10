function getUserData(users, username) {
    const userId = parseInt(username.match(/\d+/g))
    const user = users.find(user => {
        return user.id === userId
    })
    return user
}

function getTripsTakenByUser(trips, userId) {
    const currentDate = new Date ("2022/06/12") 

    const userTrips = trips.filter(trip => {
        return trip.userID === userId && trip.status === "approved"
    })
    const userTripsConvertedDate = userTrips.map(userTrip => {
        return {
            date: new Date(userTrip.date),
            destinationID: userTrip.destinationID,
            duration: userTrip.duration, 
            travelers: userTrip.travelers,
        }
    })
    const tripsTakenByUser = userTripsConvertedDate.filter(userTripConvertedDate => {
        return userTripConvertedDate.date < currentDate
        })
        return tripsTakenByUser
}

function getDestinationsVisitedByUser(tripsTakenByUser, destinations) {
    const destinationIDs = tripsTakenByUser.map(trip => {
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

function getUpcomingTripsForUser(trips, userId) {
    const currentDate = new Date ("2022/06/12") 

    const userTrips = trips.filter(trip => {
        return trip.userID === userId && trip.status === "approved"
    })
    const userTripsConvertedDate = userTrips.map(userTrip => {
        return {
            date: new Date(userTrip.date),
            destinationID: userTrip.destinationID,
            duration: userTrip.duration, 
            travelers: userTrip.travelers,
        }
    })
    const upcomingTripsForUser = userTripsConvertedDate.filter(userTripConvertedDate => {
        return userTripConvertedDate.date > currentDate
    })
        return upcomingTripsForUser
}

function getDestinationsUserWillVisit(upcomingTripsForUser, destinations) {
    const destinationIDs = upcomingTripsForUser.map(trip => {
        return trip.destinationID      
    })
    const userDestinations = destinations.filter(destination => {
        return destinationIDs.includes(destination.id)
    })
    const userUpComingDestinationsByName = userDestinations.map(destination => {
        return destination.destination
    })
    return userUpComingDestinationsByName
}

function getPendingTripsForUser(trips, userId) {
    const currentDate = new Date ("2022/06/12") 

    const userPendingTrips = trips.filter(trip => {
        return trip.userID === userId && trip.status === "pending"
    })
    const userPendingTripsConvertedDate = userPendingTrips.map(userPendingTrip => {
        return {
            date: new Date(userPendingTrip.date),
            destinationID: userPendingTrip.destinationID,
            duration: userPendingTrip.duration, 
            travelers: userPendingTrip.travelers,
        }
    })
    const pendingTripsForUser = userPendingTripsConvertedDate.filter(userPendingTripConvertedDate => {
        return userPendingTripConvertedDate.date > currentDate
    })
        return pendingTripsForUser
}

// function getPendingDestinations(pendingTripsForUser, destinations) {
//     // console.log("pending Trips for User:", pendingTripsForUser)
//     const pendingTrips= pendingTripsForUser.map(trip => {
//         return {
//             destinationID: trip.destinationID,
//             date: trip.date
//         }     
//     })
//     const userPendingDestinations = destinations.reduce((accumulator, destination) => {
//         pendingTrips.forEach(pendingTrip => {
//             if(pendingTrip.destinationID === destination.id) {
//                 accumulator.destination += destination.destination
//                 accumulator.date += pendingTrip.date
//             }         
//         })
//         return accumulator
//     }, {destination: "", date: new Date 
//     })
//     // console.log("userPendingDestinations:", userPendingDestinations)
//     let arrayUserPendingDestinations = []
//     arrayUserPendingDestinations.push(userPendingDestinations)
//     return arrayUserPendingDestinations
// }

function calculateTotalSpentThisYear(trips, destinations, userId) {
    const startofYear = new Date ("2022/01/01") 
    const endofYear = new Date ("2022/12/31")
    const tripsTakenByUser = trips.filter(trip => {
        return trip.userID === userId && trip.status === "approved"
    })
    const userTripsInfo = tripsTakenByUser.map(trip => {
        return {
            destinationID: trip.destinationID,
            duration: trip.duration,
            numOfTravelers: trip.travelers,
            date: new Date (trip.date)
        }       
    })
    const tripsInCurrentYear = userTripsInfo.filter(userTrip => {
        return userTrip.date >= startofYear && userTrip.date <= endofYear
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
    getUpcomingTripsForUser, 
    getDestinationsUserWillVisit,
    getPendingTripsForUser,
    getPendingDestinations,   
    calculateTotalSpentThisYear,    
}