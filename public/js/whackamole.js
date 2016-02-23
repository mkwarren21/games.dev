"use strict"
var hminterval;
var mintervalId;
var mmintervalId;
var tintervalId;

var points = 0;
var highScore = 0;
var duration = 0;
var reversecounter = 0;
var capture = 0;
var healthpercentage = 0;

//game play

function getId(item){
	return item.getAttribute("id");
}

function generateRandomSquare(){
	var squares = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
	var square = squares[(Math.round(Math.random() * 8))];
	return square;
}

//mole mole mole

function showMole(){
	var hole = generateRandomSquare();
	$("#" + hole).addClass("active");
	reversecounter = reversecounter + 1;
	setTimeout(function(){
		$('#' + hole).removeClass('active');
		animateMole(hole);
	}, duration); 
}

function runMoles(){
	mintervalId = setInterval(function(){
		showMole();
	}, duration + 100);
}

function runManyMoles(){
	mmintervalId = setInterval(function(){
		showMole();
	}, 600);
}

function animateMole(id) {
	$("#"+id).animate({
		"background-position": "30px"
	}, 10).animate({
		"background-position": "60px"
	}, 10).animate({
		"background-position": "30px"
	},10, function(){
      animateMole(id);
});
}

function stopMole(){
	clearInterval(mintervalId);
	clearInterval(mmintervalId);
	clearInterval(hminterval);
}

function displayMoleScore(){
	points = points + 1;
	$("#score").html("RF's caught : " + points);
}

function captureMole(id){
	$("#"+id).removeClass("active", 400, "easeInBounce", function(){
		displayMoleScore();
	});
}

function runtimer(timer){
	points = 0;
	var timer = timer;
	var intervalId = setInterval(function (){
		if (timer>9){
			$("#timer").html("00:"+ timer);
		} else {
			$("#timer").html("00:0"+ timer);
		}
		
		timer--;
		if (timer<0){
			stopMole();
			updateHighScore();
			clearInterval(intervalId);
		}
	}, 1000);
}

function checkActive(id){
	if ($("#"+id).hasClass("active")){
		return true;
	}
}

//selectors

function selectLevel (){
	var value = $('input[name="difficulty"]:checked').val();
	switch (value) {
    case "easy":
    	duration = 750;
    	break;
    case "medium":
    	duration = 600;
    	break;
    case "hard":
    	duration = 450;	
    	break;
    default:
    	console.log("I'm broken.")
	}
}

function selectSound (){
	var value = $('input[name="sound"]:checked').val();
	if (value == "sound"){
		return true;
	} else{
		return false;
	}
}

//metrics

function updateHighScore(){
	if (points>highScore){
		highScore = points;
		$("#highscore").html("High Score<br>"+ highScore);
	}
}

function setHealthmeter(){
	var juice = $("#juice");
	setTimeout(function(){
		hminterval = setInterval(function(){
			healthpercentage = (parseFloat(capture/reversecounter)) * 100;
			juice.css("height", healthpercentage + "%");
			if (healthpercentage < 50){
				juice.css("background-color", "rgba(153, 0, 0, 0.8)")
			}
			if (healthpercentage > 50){
				juice.css("background-color", "rgba(0, 0, 179, 0.8)")
			}
			if (healthpercentage < 35){
				gameOver();
			}
		}, 5);
	}, 2000);
}


function gameOver(){
	stopMole();
	stopSong();
	$("#lost").show();
	
}

function stopSong(){
	document.getElementById("barry").pause();
	document.getElementById("barry").currentTime = 0;
}

$("#start").click(function(){
	var barry = document.getElementById("barry");
	selectLevel();
	if (duration == 450){
		runManyMoles();
	}
	if (selectSound()){
		barry.play();
	}
	runMoles();
	runtimer(29);
	setHealthmeter();
});

$(".molehole").click(function(e){
	var id = getId(this);
	if(checkActive(id)){
		capture = capture + 1;
		captureMole(id);
	}
})

$("#star_labs").click(function(e){
	location.reload(true);
})












