var questions = [
    {
        question: "Who was the first actor to play the role of James Bond?",
        options: ["Sean Connery","Timothy Dalton", "Roger Moore"],
        answer: "Sean Connery",
    },
    
    {
        question: "Who directed the Lord of the Rings movie trilogy?",
        options: ["Steven Spielberg","Peter Jackson", "James Cameron"],
        answer: "Peter Jackson",
    },
    
    {
        question: "Which movie is not on the list of top 10 highest grossing films of all time?",
        options: ["Star Wars: The Last Jedi","Avatar","The Avengers"],
        answer: "Star Wars: The Last Jedi",
    },
    {
        question: "What was the name of the second Indiana Jones movie, released in 1984?",
        options: ["Raiders of the Lost Ark","Temple of Doom", "The Last Crusade"],
        answer:"Temple of Doom",
    },
    {
        question: "Who directed the epic historical drama Schindler's List in 1993?",
        options: ["Martin Scorsese","David Fincher","Steven Spielberg"],
        answer: "Steven Spielberg",
    },
    {

        question: "Which film did not win a best picture award?",
        options: ["Argo","The Departed","Moneyball"],
        answer: "Moneyball",
    }
]


var time = 20;
var intervalId;
var timeOn = false;
var correct;
var incorrect;
var unanswered;
var userChoice;
var answer=false;
var currentQuestion;

$("#startButton").on('click', function(){
    $(this).hide();

    startGame();
});


function startGame(){

    correct=0;
    incorrect=0;
    unanswered=0;
    currentQuestion=0;
    nextQuestion();
}

function nextQuestion(){
    answer=false;
    $("#question").empty();
    $("#jumbotron").hide();

    if (currentQuestion >= questions.length) {
        $("#question").empty();
        $("#question").append("<h3>Game Over!</h3>");
        $('#question').append("Correct: " + correct + "<br> Incorrect: " + incorrect + "<br> Unanswered: " + unanswered);
        $("#timer").hide();
        return false;
    }
    else
        startTimer();
        $('#question').text('Question # ' + (currentQuestion+1) + ' / ' + questions.length);
        $('#question').text(questions[currentQuestion].question);
        
        for (var i = 0; i < questions[currentQuestion].options.length; i++){
            var list = $('<div>');
            list.text(questions[currentQuestion].options[i]);
            list.addClass('chooseAnswer');
            list.data("data-choiceValue", questions[currentQuestion].options[i]);
            $('#question').append(list);
        }

        $('.chooseAnswer').on('click', function(){
            userChoice = $(this).data("data-choiceValue");
            console.log(userChoice);
            answer = true;
            if (answer === true) {
                checkAnswer()
            }
        });
    }

function checkAnswer(){
    if (userChoice === questions[currentQuestion].answer && answer === true){
        correct++
        currentQuestion++;
        $('#question').empty();
        $('#question').html('Correct!');
        stopTimer();
    }
    else if (userChoice != questions[currentQuestion].answer && answer === true) {
        incorrect++
        $('#question').empty();
        $('#question').html("Incorrect!, The correct answer was " + questions[currentQuestion].answer);
        currentQuestion++;
        stopTimer();
    }

        var nextQ = $('<button>').text('Next Question')
        $('#question').append(nextQ);
        $('button').click(function(){
            nextQuestion()

        });
        


}

function startTimer(){
    timeOn = true;
    intervalId = setInterval(decrement, 1000);
}

function decrement() {
    if (currentQuestion < questions.length){
        time--;
        $('#timer').html(time);

    if (time === 0){
        stopTimer()
        unanswered++
        $('#question').html("You ran out of time! The answer was " + questions[currentQuestion].answer);
        
        var nextQ = $('<button>').text('Next Question')
        $('#question').append(nextQ);
        $('button').click(function(){
            nextQuestion()
        

        });
        
    }
    else {
    }
}
}

function stopTimer(){
    clearInterval(intervalId);
    timeOn = false;
    time  = 20;
}


