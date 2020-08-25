/* Rob's Rental Company 

Filename: app.js
Contains: Main Defintion of cars and core site infomation used in other javascript files.
*/



// Base Client Infomation
var clientName;
var clientSeatSelc;
// renamed to rentalTimeDays | var rentalTime;
var rentalDays;
// no longer needed in v2 |var rentalTimePrice;
var selectedCar;
// this is used a lot more now haha (below)
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


// Base rental fee charged on everything
const rentalFee = 4.50;

// Min Date of Rental
const minRentalDays = 1;


// Base Car defintions (names, etc)
    // All cars with 1-3 Seats (classifed as small cars on the site)
    var bacMono = {"name": "BAC Mono", "price": 40, "seats": 1, "amountinstock": 2, "imgurl": "https://live.staticflickr.com/5315/5892319792_0bd960d91b_b.jpg"};
    var mx5 = {"name": "Fazada MX5","price": 230, "seats": "2", "amountinstock": 0, "imgurl": "https://upload.wikimedia.org/wikipedia/commons/c/c0/2nd_Mazda_MX-5_Miata.jpg"};
    // All Cars with 4-6 Seats (classifed as family cars on the site)
    var mini = {"name": "The Mini","price": 100, "seats": "4", "amountinstock": 2, "imgurl": "https://thedriven.io/wp-content/uploads/2019/09/electric-mini-cooper-se-P90357228_highRes.jpg"};
    var falcon = {"name": "Yord Falcon","price": 120, "seats": "5", "amountinstock": 2, "imgurl": "https://upload.wikimedia.org/wikipedia/commons/c/cc/2014_Ford_Falcon_%28FG_X%29_XR6_Turbo_sedan_%2823382738252%29.jpg"};
    // All Cars with 7+ Seats (classifed as extra large cars on the site)
    var outLander = {"name": "Yoyota OutLander","price": 140, "seats": "7", "amountinstock": 2, "imgurl": "https://p0.pikist.com/photos/798/853/toyota-rav-4-hybrid-crossover-suv-cars-road-trip-travel-amg.jpg"};
    var estima = {"name": "Yoyota Estima","price": 180, "seats": "8", "amountinstock": 2, "imgurl": "https://upload.wikimedia.org/wikipedia/commons/0/05/1997_Toyota_Estima_Lucida_2.2_Front.jpg"};

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
