/* Rob's Rental Company 

Filename: app.js
Contains: Main Defintion of cars and core site infomation used in other javascript files.
*/



// Base Client Infomation
var clientName;
var clientSeatSelc;
var rentalTime;
var rentalTimePrice;
var selectedCar;
var finalPrice;
var clientEmail;
// New Variables (For v2)
var usersPath;
var userIdealCar;
var userPriceRange;

//  Regex's for name and numeric values vaildation

// textReg just checks for letters and white space, it won't pass numbers
const textReg = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
// numReg only passes numbers, nothing else + characters
const numReg = /^\d+$/;
// designed to check for emails
const emailReg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
// this checks for white space, and a proper email address!
const nameReg= /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;

// Common names that are entered as fake
const commonNames = {}

// Base rental fee charged on everything
const rentalFee = 4.50;


// Base Car defintions (names, etc)
    // All cars with 1-3 Seats (classifed as small cars on the site)
    var bacMono = {"name": "BAC Mono", "price": 40, "seats": 1, "amountinstock": 2, "imgurl": "https://thedriven.io/wp-content/uploads/2019/09/electric-mini-cooper-se-P90357228_highRes.jpg"};
    var mx5 = {"name": "Fazada MX5","price": 230, "seats": "2", "amountinstock": 0, "imgurl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Mazda_Roadster_%28MX-5%29_by_Negawa_Bridge_%28cropped%29.jpg/1200px-Mazda_Roadster_%28MX-5%29_by_Negawa_Bridge_%28cropped%29.jpg"};
    // All Cars with 4-6 Seats (classifed as family cars on the site)
    var mini = {"name": "The Mini","price": 100, "seats": "4", "amountinstock": 2, "imgurl": "https://thedriven.io/wp-content/uploads/2019/09/electric-mini-cooper-se-P90357228_highRes.jpg"};
    var falcon = {"name": "Yord Falcon","price": 120, "seats": "5", "amountinstock": 2};
    // All Cars with 7+ Seats (classifed as extra large cars on the site)
    var outLander = {"name": "Yoyota OutLander","price": 140, "seats": "7", "amountinstock": 2};
    var estima = {"name": "Yoyota Estima","price": 180, "seats": "8", "amountinstock": 2};

// All Cars on lot
    const allCars = [bacMono, mx5, mini, falcon, outLander, estima];   

// Function to display the infomation once called, also so we can display updated infomation (future proofing)
/* Old Code that was used for testing data.
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

*/
