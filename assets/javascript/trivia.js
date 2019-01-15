





var $app = $('#app');

init();

function init() {
    var $start = $('<button>start</button>');
    $start.on('click', showQuestion);
    $app.empty();
    $app.append($start);
}
 







function showQuestion() {
    $app.empty();
    var question = question[0];
    var $question = $('<div class="card">');
    var $q = $('<h2>'+question.q+'</h2>');
    var $button;


    $queston.append($q);

    for (var i = 0; i < question.options.length; i++) {
        $button = $("<button>"+question.options[i]+"</button>");
        $button.on('click', function() {
            var value = $(this).text();
            var answer = questions[0].answer;
            if (value === answer) {
                console.log("congrats");
            } else {
console.log("wrong");
            }
        })
        $question.append($button);
    }

$app.append($question);






}



