import { getUserData, getTripsTakenByUser, getDestinationsVisitedByUser, getUpcomingTripsForUser, getDestinationsUserWillVisit, calculateTotalSpentThisYear } from '../src/userFunctions.js'
import usersSampleDataset from './data/users-sample-test-data.js'
import tripsSampleDataset from './data/trips-sample-test-data.js'
import destinationsSampleDataset from './data/destinations-sample-test-data.js'

const users = usersSampleDataset.usersSampleDataset
const trips = tripsSampleDataset.tripsSampleDataset
const destinations = destinationsSampleDataset.destinationsSampleDataset
const loginButton = document.querySelector('#login-button')
const formSection = document.querySelector('.login-form-wrapper')
const mainSection = document.querySelector('.main-wrapper')
const welcomeMessage = document.querySelector('.welcome-message')
const totalAmountSpentThisYear = document.querySelector('.total-amount-spent-this-year')

loginButton.addEventListener('click', authenticateLogin)

function authenticateLogin(event) {
    event.preventDefault()

    let username = document.querySelector('#username').value;
    let id = username.split("r").pop();
    let password = document.querySelector('#password').value;

    if (username === `traveler${id}` && password === "travel" && id <= 50 && id > 0) {
        formSection.classList.add('hidden')
        mainSection.style.display = 'block'
        preFetchUserData(users, username)

    } else {
        alert("Invalid username or password");
    }    
}

function preFetchUserData(users, username) {
    const user = getUserData(users, username)
    const userId = user.id
    updateWelcomeMessage(user)
    const totalSpentThisYear = calculateTotalSpentThisYear(trips, destinations, userId)
    updateMoneySpent(totalSpentThisYear)
    const tripsTakenByUser = getTripsTakenByUser(trips, userId)
    const destinationsVisitedByUser = getDestinationsVisitedByUser(tripsTakenByUser, destinations)
    updateTripsTaken(destinationsVisitedByUser)
    const upcomingTripsForUser = getUpcomingTripsForUser(trips, userId)
    const userUpComingDestinationsByName = getDestinationsUserWillVisit(upcomingTripsForUser, destinations) 
    updateUpcomingTrips(userUpComingDestinationsByName)   
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
    console.log("upcoming trips for user:", upcomingTripsForUser)
    const container = document.querySelector('#upcoming-trips-container')
    upcomingTripsForUser.forEach(upcomingTrip => {
        const upcomingTripText = document.createElement('p')
        upcomingTripText.innerText =`${upcomingTrip}`
        container.appendChild(upcomingTripText);
    })
}

function updateTripsTaken(destinationsVisitedByUser) {
    const container = document.querySelector('#destinations-visited-container')

    if(destinationsVisitedByUser.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'You have no past trips!';
        container.appendChild(message);
    }
    
    destinationsVisitedByUser.forEach(destinationVisited => {
    const destinationVisitedText = document.createElement('p')
    destinationVisitedText.innerText =`${destinationVisited}`
    container.appendChild(destinationVisitedText);
    })
}