/*
Rob's Rental's Company
Max Webb 2020

File: homepage.js

Some content referenced in this file can be found in the app file (app.js)
*/

// Global Functions and/or Base defintions of variables \\

// Global Object 
var global = {
  setSection: function (section) {
    document.title = "Rob's Rentals | " + section
    console.log("Section Changed to " + section)
  }
}

// Vaildation Object
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

// End of Global Declerations \\ 
// Welcome Section Loader \\
$(document).ready(function () {
  homePage.display();
});


// Pages and there functions, defintions, etc (in order) \\
// Home Page
var homePage = {
  display: function () {
    $(".headers").fadeIn();
    global.setSection("Home")
  },
  destroy: function () {
    $(".headers").fadeOut();
    console.log("Home Page Destroyed")
  }
}

// Menu Selector
var menuSelector = {
  display: function () {
    $(".selector").fadeIn();
    global.setSection("Menu Selection")
  },
  // Setting the path the user wants to take 
  setPath: function (path) {
    userPath = path;
    enterDetails.display(userPath)
  },
  destroy: function () {
    $(".selector").fadeOut();
    console.log("Menu Selection Page Destroyed")
  }
}
// Enter Details for both views
var enterDetails = {
  display: function () {
    // If user wants to use our filter tool
    if (userPath == "filter") {
      // Change name for section
      global.setSection("Filter Selection")
      // Fade in the .filter div class.
      $('.filter').fadeIn();
      // Else if the user wants to use our automatic process (v1 of program)
    } else if (userPath == "auto") {
      // Change name for section
      global.setSection("Automatic Choice")
      // Fade in the .auto-start div class (Start of process).
      $('.auto-start').fadeIn();
    }
  },
  // The functions below are used for when the user is wanting to find their ideal car
  idealCar: function () {
    if (validate.text(document.getElementById("carIdealForClient").value)) {
      userIdealCar = document.getElementById("carIdealForClient").value;
      console.log("hello that is true man")
      this.destroy("filter")
    } else if (!validate.text(document.getElementById("carIdealForClient").value)) {
      $("#carIdealForClient").after('<p class="alert">Are you sure that is correct infomation? Because we dont think so</p>');
      console.log("Error! Incorrect Infomation Given")
    }
  },
  destroy: function (section) {
    if (section == "filter") {
      $(".filter").fadeOut();
      console.log("All Parts from the Filter Selection Page Destroyed")
    } else if (section == "auto") {
      $(".auto").fadeOut();
      console.log("All Parts from the Auto Selection Page Destroyed")
    }
  }
}











