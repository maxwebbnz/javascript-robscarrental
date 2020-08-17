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
    // Log for error checking / handling
    console.log("Section Changed to " + section)
  }
}

// Vaildation Object
var validate = {
  // This is used to vaildate all input in the program, referenced by vaildate.(whateveryouwanttovaildate)
  text: function (str) {
    // Text vaildation
    if (textReg.test(str)) {
      // If string parsed through matches the nameReg-ex
      return true
      // return true
    } else {
      // else if it does not match
      return false
      // return false
    }
  },
  nameSpecfic: function (str) {
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
    // Num vaildation
    if (numReg.test(str)) {
      // If string parsed through matches the numReg-ex
      return true
      // return true
    } else {
      // else if does not match
      return false
      // return false
    }
  },
  email: function (str) {
    if (emailReg.test(str)) {
      return true;
    } else {
      return false
    }
  }
}


// End of Global Declerations \\ 
// Welcome Section Loader \\
$(document).ready(function () {
  // run the homePage.display function to display the first content shown on the page
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
    // included the final section for destroying the whole section!
    $(".final").fadeOut();
    console.log("Home Page Destroyed")
  },
  // ran when the program is finished so we can loop back to main home page
  finish: function () {
    $(".final").fadeIn();
    global.setSection("All Done!")
  }
}


// Inserting getting the client's name here!
var nameFinder = {
  display: function () {
    $(".nameFinder").fadeIn();
    global.setSection("Your Name")
  },
  destroy: function () {
    $(".nameFinder").fadeOut();
    // Log for error checking / handling
    console.log("Name Entry Page Destroyed")
  },
  submit: function () {
    if (!validate.nameSpecfic(document.getElementById("clientName").value)) {
      // show the error message under the input box
      $(".alert").fadeIn();
    } else {
      // Set clientName to the value of the clientName input
      clientName = document.getElementById("clientName").value;
      // Destroy this section
      this.destroy()
      // Move on to the next section
      menuSelector.display();
      // Fade in the userName content for the navbar.
      $(".userName").fadeIn();
      // Fill in every userName content with the users name on the page
      document.getElementById("userName").innerHTML = clientName;
    }
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
    // Log for error checking / handling
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
    } if (userPath == "auto") {
      // Change name for section
      global.setSection("Automatic Choice")
      // Fade in the .auto-start div class (Start of process).
      this.autoAllocation("seats")
    }
  },
  // This function below is used for destroying every part of this section
  destroy: function (section) {
    // if the section the program wants to delete is the filter
    if (section == "filter") {
      // fade out the filter class
      $(".filter").fadeOut();
      // Log for error checking / handling
      console.log("All Parts from the Filter Selection Page Destroyed")
      // else if the section the program wants to delete is the auto section
    } else if (section == "auto") {
      // fade out the auto class
      menuSelector.destroy();
      $(".auto").fadeOut();
      $(".price-range").fadeOut();
      $(".seatsselection").fadeOut();
      // Log for error checking / handling.
      console.log("All Parts from the Auto Selection Page Destroyed")
    }
  },
  // The functions below are used for when the user is wanting to find their ideal car
  idealCar: function (_usrErr) {
    // if the text entered into the input of carIdealForClient matches the nameRegex (vaildate func)
    // if the user actually didn't know what they wanted
    if (_usrErr == 'noCar') {
      userPath = "auto";
      this.destroy("filter");
      this.display();
      // log 
      console.log("User made an Error! Whoops! Changing Section to " + userPath)
    } else {
      // set the userIdealCar to the value of the inoput
      userIdealCar = document.getElementById("carIdealForClient").value;
      // enterDetails.destroy('filter')
      this.destroy("filter");
      // Then find the car!
      // Fixed the issue by running it inside of the if statement, I think I am qutie clever haha!
      if (findCar("filter", userIdealCar)) {
        // log success
        console.log("findCar() returned true, conveying infomation to final steps.")
        this.destroy();
        selected.display();
        // Filling in site span's with infomation from selectedCar object
        document.getElementById("carName").innerHTML = selectedCar.name;
        document.getElementById("carImage").src = selectedCar.imgurl;
        document.getElementById("carPrice").innerHTML = selectedCar.price;

      } else {
        // log failure
        console.log("findCar() didn't find a car, that sucks :(")
        // Now we want to tell the user what we are doing
        alert("We couldn't find you a car that matches your wishes, hence why we are now moving you to the automatic")
        userPath = "auto";
        this.destroy("filter");
        this.display();
        console.log("Program made an Error! Whoops! Changing Section to " + userPath)
      }
    }
  },
  // a looping sort of function which loops back around to auto allocation (geez max make it hard on yourself)
  setSection: function (_sec) {
    this.autoAllocation(_sec);
  },
  // This is used for us finding the car for them
  // section stands for what part of the progress we are up to (only used once)
  autoAllocation: function (_section) {
    if (_section == "seats") {
      $(".auto").fadeIn();
      $(".seatsselection").fadeIn();
      $('#seats').change(function () {
        clientSeatSelc = $(this).val();
        console.log("Seat Selection has been set to " + clientSeatSelc);
        // this.autoAllocation("price")
        // instead...
        this.setSection("price");
        this.destroy();
      })
    }
    if (_section == "price") {
      $(".seatsselection").fadeOut();
      $(".price-range").fadeIn();
      $('#b1, #b2, #b3').click(function () {
        userPriceRange = $(this).val();
        console.log(userPriceRange + " is the price range the user wants")
        this.setSection("processInfomation");
        this.destroy();
      });
    }
    // the fun happens now, processing all this manual entries
    if (_section == "processInfomation") {
      try {
        if (userPriceRange == "budget") {
          selectedCar = allCars.find(element => element.seats >= clientSeatSelc);
          if (!selectedCar.price < 100) {
            selectedCar = allCars.find(element => element.price <= 100 && element.seats >= clientSeatSelc);
            if (selectedCar == null) {
              alert("couldn't find a car in this price range")
              this.destroy();
              menuSelector.display();
            }
          }
        } else if (userPriceRange == "family") {
          selectedCar = allCars.find(element => element.seats >= clientSeatSelc);
          if (!selectedCar.price < 200) {
            selectedCar = allCars.find(element => element.price <= 200 && element.seats >= clientSeatSelc);
            if (selectedCar == null) {
              alert("couldn't find a car in this price range")
              this.destroy();
              menuSelector.display();
            }
          }
        } else if (userPriceRange == "professional") {
          selectedCar = allCars.find(element => element.seats >= clientSeatSelc);
          if (!selectedCar.price < 300) {
            selectedCar = allCars.find(element => element.price <= 300 && element.seats >= clientSeatSelc);
            if (selectedCar == null) {
              alert("couldn't find a car in this price range")
              this.destroy();
              menuSelector.display();
            }
          }
        }
        // This only works if there is no errors
        document.getElementById("carName").innerHTML = selectedCar.name;
        document.getElementById("carImage").src = selectedCar.imgurl;
        document.getElementById("carPrice").innerHTML = selectedCar.price;
        this.destroy();
        selected.display();
      }
      catch (err) {
        console.log(err)
        alert("Sorry! \n There was an error with something, sending you to the start")
        this.destroy();
        menuSelector.display();
      }
    }
  }
};

// Show Selected Section Objects
var selected = {
  display: function () {
    $(".showSelected").fadeIn();
    global.setSection("Chosen a " + selectedCar.name)
  },
  destroy: function () {
    $(".showSelected").fadeOut();
    // Log for error checking / handling
    console.log("Selected Page Destroyed")
  },
  happy: function (_happy) {
    if (_happy) {
      console.log("Client has locked in question A")
      this.destroy();
      email.display();
    } else {
      alert("You weren't happy, so we are taking you back around to the start");
      this.destroy();
      menuSelector.display();
    }
  }
}

// Email Section Object
var email = {
  display: function () {
    $(".emailPlease").fadeIn();
    global.setSection("Email")
  },
  destroy: function () {
    $(".emailPlease").fadeOut();
    // Log for error checking / handling
    console.log("Selected Page Destroyed");
  },
  submit: function () {
    // Check that the email passes the vaildation test
    // if it is not a vaild email
    if (!validate.email(clientEmail = document.getElementById("emailAddress").value)) {
      // show the error message under the input box
      $(".alert").fadeIn();
      // else if the email is vaild
    } else {
      // move onto the next section
      clientEmail = document.getElementById("emailAddress").value;
      this.destroy();
      this.sendEmail();
      homePage.finish();
    }
  },
  sendEmail: function () {
    // This code is straight and not revised from v1 (this will be re done in final verison but only here for now ._.)
    const emailContent = { header: "Rob's Rentals Car Company" };
    Email.send({
      SecureToken: "182ea469-28d5-45ae-a220-b314e5e29c77",
      To: clientEmail,
      From: "maxwebblighting@gmail.com",
      Subject: `Robs Rental Company | ${selectedCar.name}`,
      Body: '<html><head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous"></head><header><h3>' + emailContent.header + '</h3></header><br><h3>Kia Ora ' + clientName + ',<br><b>Here is the car we have selected for you</b><br><table><thead><tr><th>Seats</th></tr></thead><tr><td>' + selectedCar.name + '</td><td>' + selectedCar.seats + '</td></tr></table><br><h3>Your final price comes to $' + finalPrice + '<br>Please any questions please just let us know<br> Thanks, Robs Rentals'
    }).then(
      message => alert(message)
    );
  }
}

function findCar(_path, _usrCar) {
  // We don't need to vailate car names because some might have symbols in them :)
  if (_path == 'filter') {
    // Setting the car to the found car 
    selectedCar = allCars.find(element => element.name == _usrCar)
    // Now returning true if we have found a car with the infomation given
    if (selectedCar != null) {
      return true
    } else if (selectedCar == null) {
      return false
    }
  } else {
    console.log("hello i did not work :(")
  }
};






