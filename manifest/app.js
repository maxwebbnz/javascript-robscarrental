/* Rob's Rental Company 

Filename: app.js
Contains: Main Defintion of cars and core site infomation used in other javascript files.
*/



// Base Client Infomation
var clientName;
var clientSeatSelc;
var rentalTime;
var rentalTimePrice;
var selectedcar;
var finalPrice;
var clientEmail;

// EMOJI regex for detecting emojis throughout the program.
const emoji = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g


// Common names that are entered as fake
const commonNames = {}

// Base rental fee charged on everything
const rentalFee = 4.50;


// Base Car defintions (names, etc)
    // All cars with 1-3 Seats (classifed as small cars on the site)
    var bacMono = {"name": "BAC Mono", "price": 1, "seats": 1, "amountinstock": 2, "imgurl": "https://cimg1.ibsrv.net/ibimg/hgm/1920x1080-1/100/738/2021-bac-mono_100738709.jpg"};
    var mx5 = {"name": "Fazada MX5","price": 2, "seats": "2", "amountinstock": 0};
    // All Cars with 4-6 Seats (classifed as family cars on the site)
    var mini = {"name": "The Mini","price": 3, "seats": "4", "amountinstock": 2};
    var falcon = {"name": "Yord Falcon","price": 4, "seats": "5", "amountinstock": 2};
    // All Cars with 7+ Seats (classifed as extra large cars on the site)
    var outLander = {"name": "Yoyota OutLander","price": 4, "seats": "7", "amountinstock": 2};
    var estima = {"name": "Yoyota Estima","price": 4, "seats": "8", "amountinstock": 2};

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
