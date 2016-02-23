$(document).ready(function(){

	"use strict"

	var game = {

		randomArray: [],
		i: 0,

		getRandomCol: function() {
		    var colors = ['red', 'green', 'blue', 'yellow'];
		    var color = colors[(Math.round(Math.random() * 3))];
		    return color;
		},

		clickSquare: function(id){
			console.log(id);
			$("#" + id).addClass('active');
			setTimeout(function(){
				$('#' + id).removeClass('active');
			}, 350);
		},


		blinkArray: function(array){
			var duration = 750;
			array.forEach(function(color, index){
				setTimeout(function(){
					game.clickSquare(color);
				}, duration);
				duration += 750;
			})
		},


		getId: function(item){
			return item.getAttribute("id");
		},

		gameOver: function(){
			this.randomArray = [];
			this.i = 0;
			console.log("You lose.");
		},


		generateRandomArray: function(color, array){
			this.displayScore(array);
			array.push(color);
			this.blinkArray(array);
			return array;
		},

		compareInput: function(item){
			var id = this.getId(item);
			this.clickSquare(id);

			if (this.randomArray[this.i] == id) {
				this.i++;
				if (this.i == this.randomArray.length) {
					this.changeSimonTurn(this.randomArray);
				}
			} else {
				this.gameOver();
			}
		},

		changeSimonTurn: function(randomArray){
			this.i = 0;
			this.generateRandomArray(this.getRandomCol(), this.randomArray);
		},

		displayScore: function(array){
			$("#score").html("Level: <br>" + array.length);
		},

		runGame: function(){
			this.changeSimonTurn();
		}
	}



	$("#start").click(function(){
		game.runGame();
		$(this).hide();
	});

	$(".light").click(function(){
		game.compareInput(this);
	})

	

});