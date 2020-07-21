/* Rob's Rental Company 

Filename: app.js
Contains: Main Defintion of cars and core site infomation used in other javascript files.
*/

// Base Car defintions (names, etc)
    // All cars with 1-3 Seats (classifed as small cars on the site)
    var bacMono = {"name": "BAC Mono", "price": 1, "seats": "1", "amountinstock": 3};
    var mx5 = {"name": "Fazada MX5","price": 2, "seats": "2", "amountinstock": 2};
    // All Cars with 4-6 Seats (classifed as family cars on the site)
    var mini = {"name": "The Mini","price": 3, "seats": "4", "amountinstock": 2};
    var falcon = {"name": "Yord Falcon","price": 4, "seats": "5", "amountinstock": 2};
    // All Cars with 7+ Seats (classifed as extra large cars on the site)
    var outLander = {"name": "Yoyota OutLander","price": 4, "seats": "7", "amountinstock": 2};
    var estima = {"name": "Yoyota Estima","price": 4, "seats": "8", "amountinstock": 2};

// All Cars on lot
    const allCars = [bacMono, mx5, mini, falcon, outLander, estima];   

// All Small Cars (listed above)
    const smallCars = [bacMono, mx5]

// All Family Cars (listed above)
    const familyCars = [mini, falcon]

// All Large Cars (listed above)
    const extraLarge = [outLander, estima]
// Function to display the infomation once called, also so we can display updated infomation (future proofing)

function createHTML(){
    var carInfo =
	'<ul>' +
		allCars.map(function (cars) {
            return '<li>' + '<b>' +  cars.name + '</b>' + ' Amount of Seats: ' + cars.seats + '</li>';
        }).join('') +
    '</ul>';
    document.getElementById('cars').innerHTML = carInfo;
    console.log("Written HTML");
}


// Log and inject into the webpage with jQuery
$( document ).ready(function() {
    createHTML();
});
