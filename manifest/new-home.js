$(document).ready(function () {
    $("#header").fadeIn("20000", function () { });
    document.title = "Home | Rob's Rentals"
  });
  
  $("beginbutton").click(function () {
    alert("Handler for .click() called.");
  });
  
  function selectionChooser() {
    $(".welcome").fadeOut("20000", function () { });
    $(".selection").animate({ marginLeft: '1%' }, "slow");
    $(".selection").fadeIn("20000", function () { });
  }

  // Could we do it this way?

  function sectionFader(sectOut, sectIn){
      if(sectOut == "welcome"){
        $(".welcome").fadeOut("20000", function () { });
      };
      if(sectIn == "selection"){
        $(".selection").animate({ marginLeft: '1%' }, "slow");
        $(".selection").fadeIn("20000", function () { });
      }
    
    };