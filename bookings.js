fetch('http://localhost:3000/booking/displayBookings')
.then(response => response.json())
.then(data => {
    if (data.items.length > 0){
        let tripsToAdd = ''
        for (let item of data.items){
            const trip = item.trip
            const hour = item.hour
            const price = item.price
            tripsToAdd += `<li class="tripItem">
            <p>${trip}</p>
            <p>${hour}</p>
            <p>${price}€</p>
            <p id="time">Departure in 5 hours</p>
            </li>`
        }
        let generateList = `<div id="myBookings">
            <p id="titleMyCart">My bookings</p>
            <ul id ="tripList">`+ tripsToAdd +`</ul>
            <p id="enjoy">Enjoy your travels with Tickethack!</p>
        </div>`
        document.querySelector('#mainContainer').textContent = ""
        document.querySelector('#mainContainer').innerHTML += generateList
    }
})