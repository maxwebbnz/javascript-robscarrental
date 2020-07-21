$( document ).ready(function() {
    $( "#header" ).fadeIn( "20000", function() {});
});

$( "beginbutton" ).click(function() {
    alert( "Handler for .click() called." );
  });

  function hideHeader(){
    $( "#header" ).fadeOut( "20000", function() {});
    $( "#getname" ).fadeIn( "3000", function() {});
    $('body').animate({backgroundColor: 'blue'}, 'slow');
  }


  function clientNameFinder(){
    clientName = document.getElementById("clientname").value;
    if(clientName == null || clientName == ""){
    
      alert("Whoops! You have entered in a value which is not what we want! Try again.")
      // Common names that are entered as fake
    }else if(clientName == "John Doe" || clientName == "John Smith" || clientName == "No Name"){
      // We want to make sure we have a real name
      confirm("Are you sure your name is " + clientName + "?")
      if(confirm == true){
        // if they are actually weirdly called that name let them pass (hey no judgement here.)
        hideNamePrompt()
      }else if(confirm == false){
        // Remind the client not to be dumb
        alert("Enter in a real name and try again.")
      }
      // Silly me at 10:33PM trying to get my head around it not still sending it to the next step. fixed :>
    }else{
      hideNamePrompt();
    }
    console.log(clientName);
    console.log("Function Completed without a refresh needed!")
  }

  function hideNamePrompt(){
    $( "#getname" ).fadeOut( "20000", function() {});
    $( "#seatneeded" ).fadeIn( "3000", function() {});
    $('body').animate({backgroundColor: 'yellow'}, 'slow');
    console.log(clientName);
  }

  function seatsFinder(){
      clientSeatSelc = document.getElementById("seatsneeded").value;
      if(clientSeatSelc == null || clientSeatSelc == ""){
        alert("Whoops! You have entered in a value which is not what we want! Try again.")
      };
      if(clientSeatSelc){
        hideSeatsPrompt()
      }  
    }

  function hideSeatsPrompt(){
    $( "#seatneeded" ).fadeOut( "20000", function() {});
    $( "#setrentalleng-start" ).fadeIn( "3000", function() {});
  }

  function setRentalStartDate(){
    startDate = document.getElementById("startDate").value;
    $( "#setrentalleng-start" ).fadeOut( "20000", function() {});
    $( "#setrentalleng-end" ).fadeIn( "3000", function() {});
    if(startDate == null || startDate == ""){
      alert("Whoops! You have entered in a value which is not what we want! Try again.")
    };
    if(startDate){
      setRentalEndDate()
    }
  }
  function setRentalEndDate(){
    endDate = document.getElementById("endDate").value;
    var endDateSplit = endDate.split("/");
    console.log(endDateSplit);
    if(endDate == null || endDate == ""){
      alert("Whoops! You have entered in a value which is not what we want! Try again.")
    };
    if(endDate){
      confirmClient()
    }
  }

  function confirmClient(){
    $( "#setrentalleng-end" ).fadeOut( "20000", function() {});
    $( "#clientconfirm" ).fadeIn( "3000", function() {});
    document.getElementById("clname").innerHTML = clientName; 
    document.getElementById("clientseats").innerHTML = clientSeatSelc; 
    document.getElementById("clientrentaldays").innerHTML = endDate - startDate; 
  }

  function confirmed(){
    $( "#clientconfirm" ).fadeOut( "3000", function() {});
    $('body').animate({backgroundColor: 'black'}, 'slow');
    processInfomation();
  }
  
  function processInfomation(){
    $( "#pleasewait" ).fadeIn( "3000", function() {});

      try{
        // Tries the first attempt at finding a car that suits the infomation given
         selectedcar = allCars.find(element => element.seats == clientSeatSelc);
        // If the best car is not in stock lets find the next best thing
        if(selectedcar.amountinstock < 1){
             selectedcar = allCars.find(element => element.amountinstock > 1);
            // Fixing an error I didn't think about :< this makes sure that we are giving them a car that suits there needs.
            if(selectedcar.seats < clientSeatSelc){
                 selectedcar = allCars.find(element => element.seats > clientSeatSelc);
            }
        }
        // Only console log once we are sure that we are happy with our choice.
        console.log(selectedcar.name);
    }
        // Catching errors to prevent breaks
      catch(err) {
        console.log("We encounted an error, want to try again?" + "\n" + err, 'background: #222; color: #bada55')
    }
    try{
      // This gives the amount of time away
      var rentalTime = endDate - startDate;
      // Price is given for the day by charging the rentaltime and doubling it 2
      var rentalTimePrice = rentalTime * 2;
      /* We can now process this all together else
         This gives the daily charge of the car */
      finalPrice = rentalTimePrice + rentalFee + selectedcar.price;
      console.log("Found Price, ready to display")
      informClient(finalPrice, selectedcar);
    }
    catch(err){
      console.log("We encounted an error" + "\n" + err)
    }
  }


  function informClient(){
    $( "#pleasewait" ).fadeOut( "3000", function() {});
    $('body').animate({backgroundColor: 'white'}, 'slow');

    $( "#selectedcar" ).fadeIn( "3000", function() {});
    document.getElementById("carname").innerHTML = selectedcar.name;
    document.getElementById("carimage").src = selectedcar.imgurl;

    document.getElementById("rentalprice").innerHTML = finalPrice;

  }