var randomArray = [];
var i = 0;
var uincre = 0;
var ucounter = 0;

//generates a random color
function getRandomCol() {
    var colors = ['red', 'green', 'blue', 'yellow'];
    color = colors[(Math.round(Math.random() * 3))];
    return color;
}

//between these three functions, the colors will be activated by different images
function clickSquare(id){
	console.log(id);
	$("#" + id).addClass('active');
	setTimeout(function(){
		$('#' + id).removeClass('active');
	}, 350);
}

function highlightSquare(id){
	$("#" + id).addClass('activate');
	setTimeout(function(){
		$('#' + id).removeClass('activate');
	}, 350);
}

function blinkArray (array){
	var duration = 750;
	array.forEach(function(color, index){
		setTimeout(function(){
			highlightSquare(color);
		}, duration);
		duration += 750;
	})
}

//key gameplaying functions
function getId(item){
	return item.getAttribute("id");
}

function gameOver(){
	randomArray = [];
	i = 0;
	console.log("Hail Hydra");
	$("body").addClass("hydra");
	$(".hh").show();
	$("#replay").show("easeInBack");
}

function generateRandomArray(color, array){
	displayScore(array);
	array.push(color);
	blinkArray(array);
	return array;
}
function changeSimonTurn(randomArray){
	i = 0;
	generateRandomArray(getRandomCol(), randomArray);
}

function displayScore(array){
	$("#scorecard").html("Level: <br>" + array.length);
}

function resetOriginal(){
	$("body").removeClass("hydra");
	$(".hh").hide("explode", {pieces: 200}, 2000);
	$("#replay").hide("easeInBack");
}

// ultron bonus 

function engageUltron(){
	activateUltron();
}

function activateUltron(){
	$("#ultron").show();
	fallingUltron();
}

function fallingUltron(){
	var newq = makeNewUltronPosition();
	var oldq = $('#ultron').offset();
	var speed = calcSpeed([oldq.top, oldq.left], newq);
     $('#ultron').animate({ top: newq[0], left: newq[1] }, speed, function(){
      fallingUltron();
      countingUltron();
      if (ucounter >3){
      	gameOver();
      	$("#ultron").hide();
      }
    });
}

function countingUltron(){
	ucounter ++;
	return ucounter;
}

function makeNewUltronPosition(){
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    return [nh,nw];    
}

function calcSpeed(prev, next) {
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    var greatest = (x > y) ? x : y;
    var speedModifier = 0.1;
    var speed = Math.ceil(greatest/speedModifier);
    return speed;
}

function displayUltronScore(unincre){
	uincre = uincre + 1;
	$("#ult_score").html("Ultrons killed: <br>" + uincre);
}

function resetUltron(){
	displayUltronScore(uincre);
	engageUltron();
}

//game logic
$("#start").click(function(e){
	generateRandomArray(getRandomCol(), randomArray);
});

$(".color-btn").click(function(e){
	var id = getId(this);
	clickSquare(id);

	if (randomArray[i] == id) {
		i++;
		if (i>6){
			engageUltron();
		}
		if (i == randomArray.length) {
			changeSimonTurn(randomArray);
		}
	} else {
		gameOver();
	}
});

$("#ultron").click(function(e){
	$(this).stop();
	$(this).hide( "explode", function() {
		resetUltron();
		ucounter = 0;
	});
});

$("#replay").click(function(e){
	generateRandomArray(getRandomCol(), randomArray);
	resetOriginal();

});



