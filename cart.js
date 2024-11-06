fetch('http://localhost:3000/cart/displayCart')
.then(response => response.json())
.then(data => {
    if (data.items.length > 0){
        let tripsToAdd = ''
        let totalPrice = 0
        for (let item of data.items){
            const trip = item.trip
            const hour = item.hour
            const price = item.price
            totalPrice += Number(price)
            tripsToAdd += `<li class="tripItem">
            <p>${trip}</p>
            <p>${hour}</p>
            <p>${price}€</p>
            <button class="deleteTrip"><p>x</p></button>
        </li>`
        }
        let generateList = `<div id="myCart">
        <p id="titleMyCart">My cart</p>
        <ul id ="tripList">`+ tripsToAdd +`</ul>
        </div>
        <div id="totalSection">
            <p id="total">Total: ${totalPrice}€</p>
            <button id="purchaseButton"><p >Purchase</p></button>
        </div>`
        document.querySelector('#mainContainer').textContent = ""
        document.querySelector('#mainContainer').innerHTML += generateList

        document.querySelectorAll(".deleteTrip").forEach(item => {
            item.addEventListener('click', function() {
                let hour = item.previousElementSibling.previousElementSibling.textContent
                let trip = item.previousElementSibling.previousElementSibling.previousElementSibling.textContent
                const tripToDelete = {
                    trip : trip,
                    hour : hour
                }
                fetch('http://localhost:3000/cart/deleteItem', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(tripToDelete)
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    location.reload();
                })
            });
        });

        document.querySelector('#purchaseButton').addEventListener('click', function(){
            fetch('http://localhost:3000/cart/validateCart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then (data => {
                console.log(data)
                location.reload();
            })
        })
    }
})


// Appel de la route pour supprimer un voyage du panier

