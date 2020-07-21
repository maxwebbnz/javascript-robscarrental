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
    hideNamePrompt();
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
      alert(clientSeatSelc);
      hideSeatsPrompt()
  }

  function hideSeatsPrompt(){
    $( "#seatneeded" ).fadeOut( "20000", function() {});
    $( "#setrentalleng-start" ).fadeIn( "3000", function() {});
  }

  function setRentalStartDate(){
    startDate = document.getElementById("startDate").value;
    $( "#setrentalleng-start" ).fadeOut( "20000", function() {});
    $( "#setrentalleng-end" ).fadeIn( "3000", function() {});
  }
  function setRentalEndDate(){
    endDate = document.getElementById("endDate").value;
    var endDateSplit = endDate.split("/");
    console.log(endDateSplit);
    processInfomation();
  }

  function processInfomation(){
      try{
        // Tries the first attempt at finding a car that suits the infomation given
        var selectedcar = allCars.find(element => element.seats == clientSeatSelc);
        // If the best car is not in stock lets find the next best thing
        if(selectedcar.amountinstock < 1){
            var selectedcar = allCars.find(element => element.amountinstock > 1);
            // Fixing an error I didn't think about :< this makes sure that we are giving them a car that suits there needs.
            if(selectedcar.seats < clientSeatSelc){
                var selectedcar = allCars.find(element => element.seats > clientSeatSelc);
            }
        }
        // Only console log once we are sure that we are happy with our choice.
        console.log(selectedcar.name);
    }
        // Catching errors to prevent breaks
      catch(err) {
        console.log("We encounted an error, want to try again?" + "\n" + err, 'background: #222; color: #bada55')
    }
  }

