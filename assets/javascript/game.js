$(document).ready(function() {


var answers = [];
  var triviaQuestions = [];
  var amount = 2;
  var queryURL = "https://opentdb.com/api.php?amount="+amount+"&difficulty=easy&type=multiple";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    
    function shuffle(array) {
      var temp;
      var i = array.length
      while (i) {
          var m = Math.floor(Math.random() * i--);
          temp = array[i];
          array[i] = array[m];
          array[m] = temp; };
      return array; };
  
  for (var i = 0; i < response.results.length; i++) {
    delete response.results[i].difficulty;
    delete response.results[i].type;
    delete response.results[i].category;
    triviaQuestions.push(response.results[i]);
    answers.push(triviaQuestions[i].incorrect_answers);
    answers[i].push(triviaQuestions[i].correct_answer);
    shuffle(answers[i]);
  }
  
  });
  


  function newGame(){
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
  }
  
  function newQuestion(){
    $('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    for(var i = 0; i < 4; i++){
      var choices = $('<div>');
      choices.text(triviaQuestions[currentQuestion].incorrect_answers[i]);
      choices.attr({'data-value': triviaQuestions[currentQuestion].incorrect_answers[i]});
      choices.addClass('m-1 thisChoice btn btn-primary dark');
      $('#answerList').append(choices);
    }
    countdown();

  }
  
  function countdown(){
    seconds = timer;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    time = setInterval(showCountdown, countInt);
  }



  
  });