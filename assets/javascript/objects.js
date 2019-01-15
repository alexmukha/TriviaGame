window.onload = function() {
var gameRunning = false;




///////////////// TRIVIA /////////
var trivia = {
    start: function() {

        //  TODO: Use setInterval to start the count here and set the clock to running.
        if (!gameRunning) {
          intervalId = setInterval(trivia.count, 1000);
          gameRunning = true;
          // $("#start").html("Start");
          console.log("Hello");
        }
    }

    // $("#main").html("THis is main div");

  }, ////// trivia


//   $("#main").click(start());

}