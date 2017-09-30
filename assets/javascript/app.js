var triviaQuestions = [{
	question: "In The Little Mermaid, who is NOT one of Triton’s daughter?",
	answerList: ["Andrena", "Adora", "Attina", "Alana"],
	answer: 1
},{
	question: "Which phrase does the Evil Queen in Snow White actually say?",
	answerList: ["Magic mirror, on the wall — who is the fairest one of all?", "Mirror, mirror, on the wall — who is the fairest of them all?", "Mirror, mirror, on the wall — who is the fairest one of all?", "Magic mirror, on the wall — who is the fairest of them all?"],
	answer: 0
},{
	question: "In the movie Tangled, Flynn Rider is wanted dead or alive according to his wanted poster because he's a...",
	answerList: ["Thief", "Bandit", "Treasonist", "Robber"],
	answer: 0
},{
	question: "Which glass slipper did Cinderella leave behind at the ball?",
	answerList: ["right", "left"],
	answer: 1
},{
	question: "Finish the lyrics: “Wouldn't you think I'm the girl, the girl who has everything? Look at this trove, treasures untold…",
	answerList: ["It’s full of gizmos and gadgets galore.", "Wonders from all over the world", "How many wonders can one cavern hold?", "There so much to be known."],
	answer: 2
},{
	question: "In Frozen, What was the only thing that could thaw a frozen heart",
	answerList: ["A spell", "Love", "Support from the country people", "Her sister"],
	answer: 1
},{
	question: "In The Prince of Egypt, how many plagues were there",
	answerList: ["5", "6", "8", "10"],
	answer: 3
},{
	question: "What is Nemo's mom's name?",
	answerList: ["Pearl", "Deb", "Coral", "Dory"],
	answer: 2
},{
	question: "In Lilo and Stitch, what did Lilo stuff inside her doll's head",
	answerList: ["Pillow Fluff", "An Egg", "Picture of her mom", "House key"],
	answer: 1
},{
	question: "How many years does the Genie say he has been trapped in the lamp?",
	answerList: ["100 years", "500 years", "1,000 years", "10,000 years"],
	answer: 3
},{
	question: "What does the matchmaker criticize Mulan for?",
	answerList: ["Being too tall", "Being too skinny", "Having bad posture", "Wearing too much makeup"],
	answer: 1
},{
	question: "What were Mickey and Minnie's original names?",
	answerList: ["Mortimer and Minneola", "Mickelous and Minerva", "Mickelous and Minneola", "Mortimer and Minerva"],
	answer: 3
},{
	question: "What was Wall-E's favorite musical?",
	answerList: ["Showboat", "Hello Dolly", "Bye Bye Birdie", "Meet Me in St. Louis"],
	answer: 1
},{
	question: "What is the time on the white rabbit's pocket watch?",
	answerList: ["12:30", "12:15", "12:25", "12:45"],
	answer: 2
},{
	question: "In tangled, what was the reason for which Rupunzel wanted her mother to leave",
	answerList: ["So she could see the lights", "She wanted freedom", "She was hiding flynn in the room", "She wanted new paint"],
	answer: 0
}];
var search = ['The+little+Mermaid', 'Snow-white+and+the+seven+dwarfs', 'Tangled', 'Cinderella','The+little+Mermaid','Frozen+Elsa', 'The+Prince+Of+Egypt', 'Finding+nemo', 'Stitch', 'Aladdin+Genie', 'Mulan', 'Mickey+Minnie','Wall+E','Alice+in+Wonderland','Tangled'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Correct!!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
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
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
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
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	//giphy api
	var giphyURL = "http://api.giphy.com/v1/gifs/search?q=pixar+" + search[currentQuestion] + "&limit=1&rating=g&api_key=dc6zaTOxFJmzC"
	$.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
		var currentGif = giphy.data;
		$.each(currentGif, function(index,value){
		var embedGif = value.images.original.url;
		newGif = $('<img>');
		newGif.attr('src', embedGif);
		newGif.addClass('gifImg');
		$('#gif').html(newGif);
		});
	});

	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}