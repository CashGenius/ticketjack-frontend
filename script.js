document.getElementById('search-button').addEventListener('click', () => {

const departure = document.getElementById('departure-input').value;
const arrival = document.getElementById('arrival-input').value;
let date = document.getElementById('date-input').value;

let tripToSearch = {
    departure: departure,
    arrival: arrival,
    date: date,
}


fetch('http://localhost:3000/trips/findTrips', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tripToSearch)
})
    .then(response => response.json())
    .then(data => {
        let tripsToAdd = '';

        if (data.trips.length > 0) {

            for (let trip of data.trips) {
                let departure = trip.departure
                let arrival = trip.arrival
                let date = trip.date
                let hour = moment(date).format('HH[h]mm')
                let price = trip.price
                tripsToAdd += `<li class="tripItem">
                            <p>${departure}>${arrival}</p>
                            <p>${hour}</p>
                            <p>${price}€</p>
                            <p id="bookingButton">Book</p>
                        </li>`
            }
            document.querySelector('.information-box').textContent = ''
            document.querySelector('.information-box').innerHTML += `<div id="tripContainer">
                    <ul id ="tripList">` + tripsToAdd + `</ul>
                </div>`
                document.querySelector('.information-box').style.overflow = "scroll"
                document.querySelectorAll('#bookingButton').forEach(button => {
                    button.addEventListener('click', function() {
                        const trip = button.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
                        const hour = button.previousElementSibling.previousElementSibling.textContent;
                        let price = button.previousElementSibling.textContent;
                        price = price.replace('€', '');
                        price = parseInt(price);
                        const date = document.getElementById('date-input').value;
                        const tripsToAdd = {
                            trip: trip,
                            hour: hour,
                            price: price,
                            date: date,
                        }
                        fetch('http://localhost:3000/cart/addToCart', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(tripsToAdd)
                        })
                        .then(response => response.json())
                            .then(data => {
                                console.log(data)
                                window.location.href = 'http://127.0.0.1:5500/frontend/cart.html'
                            })
                    })
                })
        } else {
            document.querySelector('.information-box').textContent = ''
            document.querySelector('.information-box').innerHTML += `<img src="./images/notfound.png" alt="train icon" id="train-icon" class="train-icon">
                <div class="divider"></div>
                <p class="slogan">
                    No trip found.
                </p>`
            document.querySelector('.information-box').style.overflow = "none"
        }
    })
});
