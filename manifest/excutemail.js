const emailContent = {header: "Rob's Rentals Car Company"};

function excuteEmail(){
    Email.send({
        SecureToken: "182ea469-28d5-45ae-a220-b314e5e29c77",
        To : clientEmail,
        From : "maxwebblighting@gmail.com",
        Subject : `Robs Rental Company | ${selectedcar.name}`,
        Body : '<html><head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous"></head><header><h3>' + emailContent.header + '</h3></header><br><h3>Kia Ora ' + clientName + ',<br><b>Here is the car we have selected for you</b><br><table><thead><tr><th>Seats</th></tr></thead><tr><td>' + selectedcar.name + '</td><td>' + selectedcar.seats + '</td></tr></table><br><h3>Your final price comes to $' + finalPrice + '<br>Please any questions please just let us know<br> Thanks, Robs Rentals'
    }).then(
      message => alert(message)
    );
}