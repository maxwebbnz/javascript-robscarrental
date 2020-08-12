/*
Rob's Rental's Company
Max Webb 2020

File: homepage.js

Some content referenced in this file can be found in the app file (app.js)
*/

// Global Functions and/or Base defintions of variables \\

var validate = {
  // This is used to vaildate all input in the program, referenced by vaildate.(whateveryouwanttovaildate)
  text: function (str) {
    // Text vaildation
    if (nameReg.test(str)) {
      // If string parsed through matches the nameReg-ex
      return true
      // return true
    } else {
      // else if it does not match
      return false
      // return false
    }
  },
  num: function (str) {
    if (numReg.test(str)) {
      return true
    } else {
      return false
    }
  }
};

// Welcome Section Loader \\
$(document).ready(function () {
  homePage.displayCars();
  homePage.fadeIn();
});

// Pages and there functions, defintions, etc (in order) \\
var homePage = {
  // Display the cars that are avaible on the home page
  displayCars: function () {
    allCars.forEach(element => {
        $('.carousel-item').append('<div class="carousel-item"><img class="d-block w-100" src=' + element.imgurl +'alt="Second slide"></div>');
    })
  },
  fadeIn: function () {
    $(".headers").fadeIn();
  }
}




