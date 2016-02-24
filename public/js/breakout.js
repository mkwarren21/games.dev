(function(){
	"use strict"

	var canvas = document.getElementById("gameCanvas");
	var ctx = canvas.getContext("2d");
	var x = 0;
	for (var i=1; i<=5; i++){
		ctx.beginPath();
		ctx.rect(5 + x, 5, 50, 20);
		ctx.fillStyle = "#FF0000";
		ctx.fill();
		ctx.closePath();
		
		if(i<5){
			ctx.beginPath();
			ctx.rect(30 + x, 30, 50, 20);
			ctx.fillStyle = "#FF0000";
			ctx.fill();
			ctx.closePath();
		}
		x = x+60;
	}

	ctx.beginPath();
	ctx.arc(150, 140, 10, 0, Math.PI*2, false);
	ctx.fillStyle = "green";
	ctx.fill();
	ctx.closePath();

})();