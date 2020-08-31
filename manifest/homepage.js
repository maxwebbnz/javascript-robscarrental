/*
Rob's Rental's Company
Max Webb 2020

File: homepage.js

Some content referenced in this file can be found in the app file (app.js)
*/
// Global Functions and/or Base defintions of variables \\

// Global Object 

var global = {
        /*
    Function Name: setSection
    Purpose: Setting the page Title
  */
  setSection: function (section) {
    document.title = "Rob's Rentals | " + section
    // Log for error checking / handling
    console.log("Section Changed to " + section)
    // fix for not being able to fade out alerts on section change!
    $(".alert").fadeOut();
  }
}

// Vaildation Object used for vaildating inputs and values.
var validate = {
  /*
Function Name: text
Purpose: Vaildating text input
*/
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
  /*
Function Name: nameSpecfc
Purpose: Vaildating name input
*/
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
  /*
Function Name: num
Purpose: Vaildating numeric input
*/
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
  /*
Function Name: email
Purpose: Vaildating email input
*/
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
  /*
Function Name: display
Purpose: Displaying the heading section
*/
  display: function () {
    $(".headers").fadeIn();
    global.setSection("Home")
  },
  /*
Function Name: destroy
Purpose: Getting rid of the heading section
*/
  destroy: function () {
    $(".headers").fadeOut();
    // included the final section for destroying the whole section!
    $(".final").fadeOut();
    console.log("Home Page Destroyed")
  },
  /*
Function Name: finish
Purpose: Displaying the final infomation once program has finished
*/
  finish: function () {
    $(".final").fadeIn();
    global.setSection("All Done!")
  }
}


// Getting Name Section
var nameFinder = {
  /*
Function Name: display
Purpose: Displaying the name input section
*/
  display: function () {
    $(".nameFinder").fadeIn();
    global.setSection("Your Name")
  },
  /*
Function Name: destroy
Purpose: Getting rid of the name input section
*/
  destroy: function () {
    $(".nameFinder").fadeOut();
    // Log for error checking / handling
    console.log("Name Entry Page Destroyed")
  },
  /*
Function Name: submit
Purpose: Getting the value from the input box and setting clientName to that value.
*/
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
// Menu Selector Section
var menuSelector = {
  /*
Function Name: display
Purpose: Displaying the path selection  section
*/
  display: function () {
    $(".selector").fadeIn();
    global.setSection("Menu Selection")
  },
  /*
Function Name: setPath
Purpose: Setting the userPath variable to users path
*/
  setPath: function (_path) {
    userPath = _path;
    enterDetails.display()
  },
  /*
Function Name: destroy
Purpose: Destroying the path selection section
*/
  destroy: function () {
    $(".selector").fadeOut();
    // Log for error checking / handling
    console.log("Menu Selection Page Destroyed")
  }
}

// Enter Details for both views
var enterDetails = {
  /*
Function Name: display
Purpose: Displaying the enterDetails section relevant to the usersPath 
*/
  display: function () {
    // If user wants to use our filter tool
    if (userPath == "filter") {
      // Change name for section
      global.setSection("Select a Car")
      allCars.forEach(function (entry) {
        $("#carList").append(`<option>${entry.name}</option>`);
      });
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

  /*
Function Name: destory
Purpose: Displaying the enterDetails section relevant to the usersPath 
*/
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
  /*
Function Name: idealCar
Purpose: Finding a car that is ideal for the client
*/
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
      // set the userIdealCar to the value of the drop down menu
      userIdealCar = $("#carList").val();;
      // enterDetails.destroy('filter')
      this.destroy("filter");
      // Then find the car!
      // Fixed the issue by running it inside of the if statement, I think I am qutie clever haha!
      if (findCar("filter", userIdealCar)) {
        // log success
        console.log("findCar() returned true, conveying infomation to final steps.")
        this.destroy();
        document.getElementById("carName").innerHTML = selectedCar.name;
        document.getElementById("finalCarName").innerHTML = selectedCar.name;
        document.getElementById("carImage").src = selectedCar.imgurl;
        document.getElementById("carPrice").innerHTML = selectedCar.price;
        selected.display();
        // Filling in site span's with infomation from selectedCar object
      } else {
        // log failure
        console.log("findCar() didn't find a car, that sucks :(")
        // Now we want to tell the user what we are doing
        bootbox.alert("We couldn't find a car for you or we had an error, we will take you back to the start!");
        userPath = "auto";
        this.destroy("filter");
        this.display();
        console.log("Program made an Error! Whoops! Changing Section to " + userPath)
      }
    }
  },
    /*
    Function Name: setSection
    Purpose: A looping function to loop inside itself
  */
  setSection: function (_sec) {
    this.autoAllocation(_sec);
  },
  /*
    Function Name: autoAllocation
    Purpose: Finding Client's Seats Wishes, Price Range and finding a car suited to the client's needs.
  */
  autoAllocation: function (_section) {
    if (_section == "seats") {
      $(".auto").fadeIn();
      $(".seatsselection").fadeIn();
      $('#seatsbutton').click(function () {
        clientSeatSelc = $('#seats').val();
        console.log("Seat Selection has been set to " + clientSeatSelc);
        // this.autoAllocation("price")
        // instead...
        console.log(this);
        enterDetails.setSection("price");
        enterDetails.destroy();
      })
    }
    if (_section == "price") {
      $(".seatsselection").fadeOut();
      $(".price-range").fadeIn();
      $('#b1, #b2, #b3').click(function () {
        userPriceRange = $(this).val();
        console.log(userPriceRange + " is the price range the user wants")
        enterDetails.destroy();
        $(".price-range").fadeOut();
        enterDetails.setSection("processInfomation");
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
              bootbox.alert("Couldn't find a car in that price range!");
              this.destroy();
              menuSelector.display();
            }
          }
        } else if (userPriceRange == "family") {
          selectedCar = allCars.find(element => element.seats >= clientSeatSelc);
          if (!selectedCar.price < 200) {
            selectedCar = allCars.find(element => element.price <= 200 && element.seats >= clientSeatSelc);
            if (selectedCar == null) {
              bootbox.alert("Couldn't find a car in that price range!");
              this.destroy();
              menuSelector.display();
            }
          }
        } else if (userPriceRange == "professional") {
          selectedCar = allCars.find(element => element.seats >= clientSeatSelc);
          if (!selectedCar.price < 300) {
            selectedCar = allCars.find(element => element.price <= 300 && element.seats >= clientSeatSelc);
            if (selectedCar == null) {
              bootbox.alert("Couldn't find a car in that price range!");
              this.destroy();
              menuSelector.display();
            }
          }
        }
        // This only works if there is no errors
        enterDetails.destroy();
        document.getElementById("carName").innerHTML = selectedCar.name;
        document.getElementById("carImage").src = selectedCar.imgurl;
        document.getElementById("carPrice").innerHTML = selectedCar.price;
        selected.display();
      }
      catch (err) {
        console.log(err)
        // POINT OF INTEREST BELOW
        // removed, was causing a looping issue lol bootbox.alert("We encountered an error, restarting program! Sorry for the inconveince");
      }
    }
  },
};

var selected = {
  /*
 Function Name: display
 Purpose: Displaying the end users selected car
*/
  display: function () {
    $(".showSelected").fadeIn();
    global.setSection("Chosen a " + selectedCar.name)
  },
  /*
  Function Name: destroy
  Purpose: Getting rid of the section
*/
  destroy: function () {
    $(".showSelected").fadeOut();
    // Log for error checking / handling
    console.log("Selected Page Destroyed")
  },
  /*
  Function Name: happy
  Purpose: Checking if user is happy with car
*/
  happy: function (_happy) {
    if (_happy) {
      console.log("Client has locked in the car")
      this.destroy();
      dates.display();
    } else {
      bootbox.alert("Taking you back to the start!");
      this.destroy();
      menuSelector.display();
    }
  }
}

// Dates Selection Section Object
var dates = {
  /*
  Function Name: display
  Purpose: Displaying the dates selection section
*/
  display: function () {
    $(".datesSelection").fadeIn();
    global.setSection("Dates")
  },
  /*
Function Name: display
Purpose: Getting rid of the dates selection section
*/
  destroy: function () {
    $(".datesSelection").fadeOut();
    // Log for error checking / handling
    console.log("Selected Page Destroyed");
  },
  /*
Function Name: dateGrab
Purpose: Grabbing the value from the user and setting the rentalDays variable
*/
  dateGrab: function () {
    if (!validate.num(document.getElementById("clientRentalDay").value)) {
      $(".alert").fadeIn();
    } if(document.getElementById("clientRentalDay").value < minRentalDays) {
      $(".alert").fadeIn();
    }else{
      rentalDays = document.getElementById("clientRentalDay").value
      console.log("Client wants to hire the " + selectedCar.name + " for " + rentalDays + " days.")
      this.destroy();
      $(".alert").fadeOut();
      email.display();
    }
  }
}
// Email Section Object
var email = {
  /*
Function Name: display
Purpose: Displaying the email input section
*/
  display: function () {
    $(".emailPlease").fadeIn();
    global.setSection("Email")
  },
  /*
Function Name: destroy
Purpose: Getting rid of the email input section
*/
  destroy: function () {
    $(".emailPlease").fadeOut();
    // Log for error checking / handling
    console.log("Selected Page Destroyed");
  },
  /*
Function Name: submit
Purpose: Getting the users input and setting the clientEmail section and setting HTML infomation to final value
*/
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
      finalPrice = rentalFee * rentalDays + selectedCar.price;
      this.sendEmail();
      document.getElementById("finalCarName").innerHTML = selectedCar.name;
      document.getElementById("rentalTime").innerHTML = rentalDays;
      document.getElementById("finalPrice").innerHTML = finalPrice;
      document.getElementById("emailAddr").innerHTML = clientEmail;
      homePage.finish();
    }
  },
  /*
Function Name: sendEmail
Purpose: Sending an Email to the Client once all infomation has been set
*/
  sendEmail: function () {
    // This code is straight and not revised from v1 (this will be re done in final verison but only here for now ._.)
    const emailContent = { header: "Rob's Rentals Car Company" };
    Email.send({
      SecureToken: "182ea469-28d5-45ae-a220-b314e5e29c77",
      To: clientEmail,
      From: "maxwebblighting@gmail.com",
      Subject: `Robs Rental Company | ${selectedCar.name}`,
      Body: '<html><head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous"></head><header><h3>' + emailContent.header + '</h3></header><br><h3>Kia Ora ' + clientName + ',<br><b>Here is the car we have selected for you</b><br><table><thead><tr><th>Seats</th></tr></thead><tr><td>' + selectedCar.name + '</td><td>' + selectedCar.seats + '</td></tr></table><br><h3>Your final price comes to $' + finalPrice + '<br>Please any questions please just let us know<br> Thanks, Robs Rentals'
    });
  }
}
/*
Function Name: findCar
Purpose: Finding car relveant to user's wishes (filter section only!)
*/

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



