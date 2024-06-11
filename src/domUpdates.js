import { getUserData, getTripsTakenByUser, getDestinationsVisitedByUser, getUpcomingTripsForUser, getDestinationsUserWillVisit, getPendingTripsForUser, calculateTotalSpentThisYear } from '../src/userFunctions.js'
import { getDestinationId, calculateTripCost } from './bookTripFunctions.js'
import { fetchData } from './apiCalls.js'

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
const destinationInput = document.querySelector("#destinations")
const numOfTravelersInput = document.querySelector('#number-of-travelers')
const durationInput = document.querySelector('#duration')

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
calculateTripCostButton.addEventListener('click', displayTripCost)
destinationInput.addEventListener('input', validateInputs)
numOfTravelersInput.addEventListener('input', validateInputs)
durationInput.addEventListener('input', validateInputs)
bookTripButton.addEventListener('click', bookATrip)


function validateInputs() {
    const calculateTripErrorMessage = document.querySelector('.calculate-trip-cost-error-message')
if(destinationInput.value && numOfTravelersInput.value && durationInput.value) {
    calculateTripErrorMessage.innerText = ''
    calculateTripCostButton.removeAttribute('disabled')
} else {
    calculateTripErrorMessage.innerText = "please enter destination, number of travelers, and duration to calculate cost"
}
}

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
    // console.log('user:', user)
    const userId = user.id
    // console.log("userId:", userId)
    updateWelcomeMessage(user)
    const trips = e[1].trips
    // console.log("trips", trips)
    const destinations = e[2].destinations
    globalDestinationData = destinations
    // console.log("destinations:", destinations)
    const totalSpentThisYear = calculateTotalSpentThisYear(trips, destinations, userId)
    updateMoneySpent(totalSpentThisYear)
    const tripsTakenByUser = getTripsTakenByUser(trips, userId)
    const destinationsVisitedByUser = getDestinationsVisitedByUser(tripsTakenByUser, destinations)
    updateTripsTaken(destinationsVisitedByUser)
    const upcomingTripsForUser = getUpcomingTripsForUser(trips, userId)
    const userUpcomingDestinationsByName = getDestinationsUserWillVisit(upcomingTripsForUser, destinations) 
    updateUpcomingTrips(userUpcomingDestinationsByName, upcomingTripsForUser)

    const pendingTripsForUser = getPendingTripsForUser(trips, userId, destinations)
    updatePendingTrips(pendingTripsForUser) 
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

function updatePendingTrips(pendingTripsForUser) {   
    const pendingTripsContainer = document.getElementById('pending-trips-container')
    console.log("line 129:", pendingTripsForUser)
 
    if (pendingTripsForUser.length === 0) {
        const message = document.createElement('p')
        message.innerText = 'No pending trips'
        pendingTripsContainer.appendChild(message); 
    }
        pendingTripsForUser.forEach(pendingTrip=> {
            const pendingTripText = document.createElement('p')
            pendingTripText.innerText =`${pendingTrip.travelers} people traveling to ${pendingTrip.destination} for ${pendingTrip.duration} nights on ${pendingTrip.date}`
            pendingTripsContainer.appendChild(pendingTripText) 
        })
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

    let destination = document.getElementById("destinations").value
    let destinationId = getDestinationId(destination, globalDestinationData)
    // console.log("destinationId:", destinationId)
    let numOfTravelers = +document.getElementById("number-of-travelers").value
    let date = document.getElementById("date").value
    let duration = +document.getElementById("duration").value   
    let suggestedActivities = document.getElementById("suggested-activities")
    let suggestedActivitiesArray = Array.from(suggestedActivities.selectedOptions, option => option.value)
     
    let username = document.querySelector('#username').value
    let usernameId = +username.split("r").pop() 
    
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
        const pendingTripsForUser = getPendingTripsForUser(trips, usernameId, globalDestinationData)
       
        // alert("Your trip is pending travel agent approval.")
        const pendingTripsContainer = document.getElementById('pending-trips-container')
        pendingTripsContainer.innerHTML = ""
       
        updatePendingTrips(pendingTripsForUser)       
    }), 1000)
}