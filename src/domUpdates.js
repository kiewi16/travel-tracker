import { getUserData, getDestinationsVisitedByUser } from '../src/userFunctions.js'
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

loginButton.addEventListener('click', authenticateLogin)

function authenticateLogin(event) {
    event.preventDefault()

    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;

    if (username === "traveler1" && password === "password") {
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
    const destinationsVisitedByUser = getDestinationsVisitedByUser(trips, destinations, userId)
    updateTripsTaken(destinationsVisitedByUser )
}

function updateWelcomeMessage(user) {
    welcomeMessage.innerText = `Let's Go On An Adventure, ${user.name}!`
}

function updateTripsTaken(destinationsVisitedByUser) {
    console.log(destinationsVisitedByUser)
    const container = document.querySelector('#destinations-visited-container')
    destinationsVisitedByUser.forEach(destinationVisited => {
        const destinationVisitedText = document.createElement('p')
        destinationVisitedText.innerText =`${destinationVisited}`
        container.appendChild(destinationVisitedText);
    })
}