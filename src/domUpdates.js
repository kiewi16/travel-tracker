import { getUserData, getTripsTakenByUser, getDestinationsVisitedByUser, getUpcomingTripsForUser, getDestinationsUserWillVisit, getPendingTripsForUser, getPendingDestinations, calculateTotalSpentThisYear } from '../src/userFunctions.js'
import { getDestinationId, calculateTripCost } from './bookTripFunctions.js'
import { fetchData } from './apiCalls.js'
// import usersSampleDataset from './data/users-sample-test-data.js'
// import tripsSampleDataset from './data/trips-sample-test-data.js'
// import destinationsSampleDataset from './data/destinations-sample-test-data.js'

// const users = usersSampleDataset.usersSampleDataset
// const trips = tripsSampleDataset.tripsSampleDataset
// const destinations = destinationsSampleDataset.destinationsSampleDataset
let globalDestinationData = null; 

const usernameInput = document.querySelector('#username')
const usernameErrorMessage = document.querySelector(".username-error-message")
const loginButton = document.querySelector('#login-button')
const formSection = document.querySelector('.login-form-wrapper')
const mainSection = document.querySelector('.main-wrapper')
const welcomeMessage = document.querySelector('.welcome-message')
const totalAmountSpentThisYear = document.querySelector('.total-amount-spent-this-year')
const bookTripButton = document.querySelector('#book-a-trip-button')
const calculateTripCostButton = document.querySelector('#calculate-trip-cost')
const errorMessage = document.querySelector('.error-message')

usernameInput.addEventListener('input', () => {
    const usernameInputId = usernameInput.value.split("r").pop()
    if(usernameInput.value.includes("traveler") && usernameInputId <= 50 && usernameInputId > 0) {
        loginButton.removeAttribute('disabled')
        usernameErrorMessage.setAttribute('hidden', '')

    } else {
        usernameErrorMessage.removeAttribute('hidden')
    }      
})

loginButton.addEventListener('click', authenticateLogin)
bookTripButton.addEventListener('click', bookATrip)
calculateTripCostButton.addEventListener('click', displayTripCost)

function authenticateLogin(event) {
    event.preventDefault()

    let username = document.querySelector('#username').value;
    let id = username.split("r").pop();
    let password = document.querySelector('#password').value;

    if (username === `traveler${id}` && password === "travel" && id <= 50 && id > 0) {
        formSection.classList.add('hidden')
        mainSection.style.display = 'block'
        fetchUserData(username)

    } else {
        alert("Invalid username or password");
    }    
}

function fetchUserData(username) {
    Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')]).then(e => {
    const user = getUserData(e[0].travelers, username)
    console.log('user:', user)
    const userId = user.id
    console.log("userId:", userId)
    updateWelcomeMessage(user)
    const trips = e[1].trips
    console.log("trips before post:", trips)
    const destinations = e[2].destinations
    globalDestinationData = destinations
    console.log("destinations:", destinations)
    const totalSpentThisYear = calculateTotalSpentThisYear(trips, destinations, userId)
    updateMoneySpent(totalSpentThisYear)
    const tripsTakenByUser = getTripsTakenByUser(trips, userId)
    const destinationsVisitedByUser = getDestinationsVisitedByUser(tripsTakenByUser, destinations)
    updateTripsTaken(destinationsVisitedByUser)
    const upcomingTripsForUser = getUpcomingTripsForUser(trips, userId)
    const userUpcomingDestinationsByName = getDestinationsUserWillVisit(upcomingTripsForUser, destinations) 
    updateUpcomingTrips(userUpcomingDestinationsByName, upcomingTripsForUser)

    const pendingTripsForUser = getPendingTripsForUser(trips, userId)
    const userPendingDestinationsByName = getPendingDestinations(pendingTripsForUser, destinations)
    updatePendingTrips(userPendingDestinationsByName) 
    })
}

function updateWelcomeMessage(user) {
    welcomeMessage.innerText = `Let's Go On An Adventure, ${user.name}!`
}

function updateMoneySpent(totalSpentThisYear) {
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    totalAmountSpentThisYear.innerText = `Total Amount Spent on Trips in 2022: ${USDollar.format(totalSpentThisYear)}`
}

function updateUpcomingTrips(userUpcomingDestinationsByName) {
    const upcomingTripsContainer = document.querySelector('#upcoming-trips-container')


    if(userUpcomingDestinationsByName.length === 0) {
        const message = document.createElement('p')
        message.innerText = 'No upcoming trips 😭!'
        upcomingTripsContainer.appendChild(message); 
    }
    else {userUpcomingDestinationsByName.forEach(userUpcomingDestination => {
         const upcomingTripText = document.createElement('p')
         upcomingTripText.innerText =`${userUpcomingDestination}`
         upcomingTripsContainer.appendChild(upcomingTripText)           
    })}
}

function updatePendingTrips(userPendingDestinationsByName) {   
    const pendingTripsContainer = document.getElementById('pending-trips-container')
 
    if (userPendingDestinationsByName[0].travelers === 0) {
        const message = document.createElement('p')
        message.innerText = 'No pending trips'
        pendingTripsContainer.appendChild(message); 
    }

    if (userPendingDestinationsByName[0].travelers !== 0) {
        userPendingDestinationsByName.forEach(pendingDestination => {
            const pendingTripText = document.createElement('p')
            const date = new Date (`${pendingDestination.date}`)
            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
            pendingTripText.innerText =`${pendingDestination.travelers} traveler(s) departing for ${pendingDestination.destination} on ${formattedDate} for ${pendingDestination.duration} night(s)`
            pendingTripsContainer.appendChild(pendingTripText) 
        })
    } 
}

function updateTripsTaken(destinationsVisitedByUser) {
    const container = document.querySelector('#destinations-visited-container')

    if(destinationsVisitedByUser.length === 0) {
        const message = document.createElement('p')
        message.innerText = 'You have no past trips!'
        container.appendChild(message);
    }
    
    destinationsVisitedByUser.forEach(destinationVisited => {
    const destinationVisitedText = document.createElement('p')
    destinationVisitedText.innerText =`${destinationVisited}`
    container.appendChild(destinationVisitedText)
    })
}

function bookATrip(event) {
    event.preventDefault()

    // let id = +document.getElementById("id").value
    // let userId = +document.getElementById("user-id").value
    // let destinationId = +document.getElementById("destinations").value
    let destination = document.getElementById("destinations").value
    let destinationId = getDestinationId(destination, globalDestinationData)
    console.log("destinationId:", destinationId)
    let numOfTravelers = +document.getElementById("number-of-travelers").value
    let date = document.getElementById("date").value
    let duration = +document.getElementById("duration").value
    // let tripCost = calculateTripCost(destinationId, globalDestinationData, numOfTravelers, duration)
    // console.log("trip cost:", tripCost)
    // displayTripCost(tripCost)
    // let status = document.getElementById("status").value
    let suggestedActivities = document.getElementById("suggested-activities")
    let suggestedActivitiesArray = Array.from(suggestedActivities.selectedOptions, option => option.value)
     
    // console.log("idInput:", typeof id)
    // console.log("userIdInput:", typeof userId)
    // console.log("destinations:", typeof destinationId)
    // console.log("number-of-travelers:", typeof numOfTravelers)
    // console.log("date:", typeof date)
    // console.log("duration:", typeof duration)
    // console.log("status:", typeof status)
    // console.log("suggestedActivitiesArray:", suggestedActivitiesArray)
    let username = document.querySelector('#username').value;
    // console.log("username:", username)
    let usernameId = +username.split("r").pop();
    // console.log('usernameId:', typeof usernameId)
    
    
    postTripData(usernameId, destinationId, numOfTravelers, date, duration, suggestedActivitiesArray)

    updatePendingTripsAfterPost(usernameId, globalDestinationData)

    document.getElementById('book-a-trip-form').reset()
    document.getElementById('trip-cost-display').innerText = ''
}

function displayTripCost(event) {
    event.preventDefault()
    let destination = document.getElementById("destinations").value
    let destinationId = getDestinationId(destination, globalDestinationData)
    let numOfTravelers = +document.getElementById("number-of-travelers").value
    let duration = +document.getElementById("duration").value
    const tripCost = calculateTripCost(destinationId, globalDestinationData, numOfTravelers, duration)
    document.getElementById('trip-cost-display').innerText = `Estimated Trip Cost: $${tripCost.toFixed(2)}`
    return tripCost
}

function postTripData(usernameId, destinationId, numOfTravelers, date, duration, suggestedActivitiesArray) {
    let formattedDate = date.split("-").join("/")
    const uniqueTripId = Date.now()
    fetch('http://localhost:3001/api/v1/trips',{
    method:"POST",
    body: JSON.stringify({
      id: uniqueTripId,
      userID: usernameId,
      destinationID: destinationId,
      travelers: numOfTravelers,
      date: formattedDate,
      duration: duration,
      status: "pending",
      suggestedActivities: suggestedActivitiesArray
    }),
    headers: {'Content-Type': 'application/json'}
}).then(response => {
    if(!response.ok) {
        throw new Error(`please fill out all fields before form submittal`)
    } else {
        return response.json()
    }
})
.catch(error => errorMessage.innerText = error.message)
}

function updatePendingTripsAfterPost(usernameId, globalDestinationData) {
    setTimeout(() => fetchData('trips').then(e => {
        const trips = e.trips
        console.log("trips after post:", trips)
        const pendingTripsForUser = getPendingTripsForUser(trips, usernameId)
        const userPendingDestinationsByName = getPendingDestinations(pendingTripsForUser, globalDestinationData)
        
        const pendingTripsContainer = document.getElementById('pending-trips-container')
        pendingTripsContainer.innerHTML = ""
       
        updatePendingTrips(userPendingDestinationsByName)       
    }), 1000)
}