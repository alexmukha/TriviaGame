$(document).ready(function() {
//////// FOR TESTING PURPOSES ONLY /////////////
var testing = true;
///////// false = normal mode /////////////
////////// true = fast mode /////////////

var answers = [];
  var triviaQuestions = [];
  var amount = 2;
  var queryURL = "https://opentdb.com/api.php?amount="+amount+"&difficulty=easy&type=multiple";
if (!testing) {
  var timer = 15;
  var countInt = 1000;
  var endInt = 3000;
  var timeInt = 3000;
} else {
  var timer = 5;
  var countInt = 500;
  var endInt = 500;
  var timeInt = 500;
}
var currentQuestion; 
  var correctAnswer; 
  var incorrectAnswer; 
  var unanswered; 
  var seconds; 
  var time; 
  var answered; 
  var userSelect;
  
  var messages = {
    correct: "That's correct!",
    incorrect: "Wrong choice.",
    endTime: "Time's up!",
    finished: "Let's see the results."
  }
  
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
  

  $('#startBtn').on('click', function(){
    $(this).hide();
    $("#intro").hide();
    newGame();
    console.log(triviaQuestions);
  });
  
  $('#startOverBtn').on('click', function(){
    $(this).hide();
    newGame();
  });
  
  function newGame(){
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    $('#startOverBtn').hide();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
  }
  
  function newQuestion(){
    $('#message').empty();
    $('#correctedAnswer').empty();
    
    answered = true;
    
    $('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    for(var i = 0; i < 4; i++){
      var choices = $('<div>');
      choices.text(triviaQuestions[currentQuestion].incorrect_answers[i]);
      choices.attr({'data-value': triviaQuestions[currentQuestion].incorrect_answers[i]});
      choices.addClass('m-1 thisChoice btn btn-primary');
      $('#answerList').append(choices);
    }
    countdown();
    
    $('.thisChoice').on('click',function(){
      userSelect = $(this).data('value');
      clearInterval(time);
      answerPage();
    });
  }
  
  function countdown(){
      $('#startOverBtn').hide();
    seconds = timer;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;
    time = setInterval(showCountdown, countInt);
  }
  
  function showCountdown(){
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if(seconds < 1){
      clearInterval(time);
      answered = false;
      answerPage();
    }
  }
  
  function answerPage(){
    $('#currentQuestion').empty();
    $('.thisChoice').empty(); //Clears question page
    $('#answerList').empty();
  
    var rightAnswerIndex = triviaQuestions[currentQuestion].correct_answer;
    console.log("Correct: "+rightAnswerIndex);
    if((userSelect == rightAnswerIndex) && (answered == true)){
      correctAnswer++;
      $('#currentQuestion').html(messages.correct);
    } else if((userSelect != rightAnswerIndex) && (answered == true)){
      incorrectAnswer++;
      $('#currentQuestion').html(messages.incorrect);
      $('#correctedAnswer').html('The correct answer was: ' + rightAnswerIndex);
    } else{
      unanswered++;
      $('#message').html(messages.endTime);
      $('#correctedAnswer').html('The correct answer was: ' + rightAnswerIndex);
      answered = true;
    }
    
    if(currentQuestion == (triviaQuestions.length-1)){
      setTimeout(scoreboard, endInt)
    } else{
      currentQuestion++;
      setTimeout(newQuestion, timeInt);
    }	
  }
  
  function scoreboard(){
    $('#currentQuestion').empty();
    $('.question').empty();
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#finalMessage').html(messages.finished);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#startOverBtn').addClass('reset thisChoice btn btn-primary');
    $('#startOverBtn').show();
    $('#startOverBtn').html('Start Over?');
  }

  
  });