import { getUserData, getTripsTakenByUser, getDestinationsVisitedByUser, getUpcomingTripsForUser, getDestinationsUserWillVisit, calculateTotalSpentThisYear } from '../src/userFunctions.js'
import { fetchData } from './apiCalls.js'
// import usersSampleDataset from './data/users-sample-test-data.js'
// import tripsSampleDataset from './data/trips-sample-test-data.js'
// import destinationsSampleDataset from './data/destinations-sample-test-data.js'

// const users = usersSampleDataset.usersSampleDataset
// const trips = tripsSampleDataset.tripsSampleDataset
// const destinations = destinationsSampleDataset.destinationsSampleDataset
const loginButton = document.querySelector('#login-button')
const formSection = document.querySelector('.login-form-wrapper')
const mainSection = document.querySelector('.main-wrapper')
const welcomeMessage = document.querySelector('.welcome-message')
const totalAmountSpentThisYear = document.querySelector('.total-amount-spent-this-year')
const bookTripButton = document.querySelector('#book-a-trip-button')

loginButton.addEventListener('click', authenticateLogin)
bookTripButton.addEventListener('click', bookATrip)

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
    console.log("trips:", trips)
    const destinations = e[2].destinations
    console.log("destinations:", destinations)
    const totalSpentThisYear = calculateTotalSpentThisYear(trips, destinations, userId)
    updateMoneySpent(totalSpentThisYear)
    const tripsTakenByUser = getTripsTakenByUser(trips, userId)
    const destinationsVisitedByUser = getDestinationsVisitedByUser(tripsTakenByUser, destinations)
    updateTripsTaken(destinationsVisitedByUser)
    const upcomingTripsForUser = getUpcomingTripsForUser(trips, userId)
    const userUpcomingDestinationsByName = getDestinationsUserWillVisit(upcomingTripsForUser, destinations) 
    updateUpcomingTrips(userUpcomingDestinationsByName)   
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
    totalAmountSpentThisYear.innerText = `Total Amount Spent on Trips in 2022 (including upcoming trips in 2022): ${USDollar.format(totalSpentThisYear)}`
}

function updateUpcomingTrips(upcomingTripsForUser) {
    const container = document.querySelector('#upcoming-trips-container')

    if(upcomingTripsForUser.length === 0) {
        const message = document.createElement('p')
        message.innerText = 'You have no upcoming trips :(!'
        container.appendChild(message); 
    }
    upcomingTripsForUser.forEach(upcomingTrip => {
        const upcomingTripText = document.createElement('p')
        upcomingTripText.innerText =`${upcomingTrip}`
        container.appendChild(upcomingTripText);
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

    let id = +document.getElementById("id").value
    let userId = +document.getElementById("user-id").value
    let destinationId = +document.getElementById("destinations").value
    let numOfTravelers = +document.getElementById("number-of-travelers").value
    let date = document.getElementById("date").value
    let duration = +document.getElementById("duration").value
    let status = document.getElementById("status").value
    let suggestedActivities = document.getElementById("suggested-activities")
    let suggestedActivitiesArray = Array.from(suggestedActivities.selectedOptions, option => option.value)
    console.log("idInput:", typeof id)
    console.log("userIdInput:", typeof userId)
    console.log("destinations:", typeof destinationId)
    console.log("number-of-travelers:", typeof numOfTravelers)
    console.log("date:", typeof date)
    console.log("duration:", typeof duration)
    console.log("status:", typeof status)
    console.log("suggestedActivitiesArray:", suggestedActivitiesArray)
    postTripData(id, userId, destinationId, numOfTravelers, date, duration, status, suggestedActivitiesArray)
}

function postTripData(id, userId, destinationId, numOfTravelers, date, duration, status, suggestedActivitiesArray) {
    let formattedDate = date.split("-").join("/")
    fetch('http://localhost:3001/api/v1/trips',{
    method:"POST",
    body: JSON.stringify({
      id: id,
      userID: userId,
      destinationID: destinationId,
      travelers: numOfTravelers,
      date: formattedDate,
      duration: duration,
      status: status,
      suggestedActivities: suggestedActivitiesArray
    }),
    headers: {'Content-Type': 'application/json'}
  }).then(response => response.json())
  .then(data => {
    console.log("success:", data)
  })
}