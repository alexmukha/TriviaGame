$(document).ready(function() {
  var timeLeft = 10;
  var timerId = setInterval(countdown, 1000);
  
  
  function start(){
    var $start = $('<button class="btn">Start</button>');
    $start.on('click', countdown);
    // $countdown.preventDefault();
    // $app.empty();
    // $app.append($start);
    correct = 0;
    incorrect = 0;
    // questionIndex = 0;
    // clearTimeout(timerId);
    // timeLeft = 0;
    $("#main").append($start);
}
start();




  function checkResults() {
    $("#timer").removeClass("warning").addClass("normal");
    $("#timer").html("Time\'s Up");
 }

  
  function countdown() {
      if (timeLeft == -0) {
          clearTimeout(timerId);
          checkResults();
      } else {
        if (timeLeft < 5) {
          $("#timer").removeClass("normal").addClass("warning");
        }
          $("#timer").html("You have "+timeLeft+" seconds to answer the question!");
          timeLeft--;
      }
  }
  


});