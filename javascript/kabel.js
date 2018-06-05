
var c = document.getElementById("myCanvas");

var ctx1 = c.getContext("2d");
var multiBlackStartX = 138; 
var multiBlackEndX = 544; 
var multiRedStartX = 178; 
var multiRedEndX = 579; 
var multiBlackStartY = 125; 
var multiBlackEndY = 396; 
var multiRedStartY = 125; 
var multiRedEndY = 401; 


var powerBlackStartX = 58; 
var powerBlackEndX = 116; 
var powerRedStartX = 88; 
var powerRedEndX = 116; 
var powerBlackStartY = 393; 
var powerBlackEndY = 30; 
var powerRedStartY = 393; 
var powerRedEndY = 22; 


function update_kabel(){
    ctx1.clearRect(0, 0, c.width, c.height);
	ctx1.lineWidth=3.7;
	ctx1.strokeStyle="#000000";

	curveBetweenPoints(multiBlackStartX, multiBlackStartY, multiBlackEndX, multiBlackEndY, ctx1);

	ctx1.lineWidth=3.7;
	ctx1.strokeStyle="#851412";

	curveBetweenPoints(multiRedStartX, multiRedStartY, multiRedEndX, multiRedEndY, ctx1);

	var m = document.getElementById("modenya").innerHTML;
	console.log(m);
	if(m!="ohm"){
		ctx1.lineWidth=3.7;
		ctx1.strokeStyle="#000000";
		curveBetweenPoints2(powerBlackStartX, powerBlackStartY, powerBlackEndX, powerBlackEndY, ctx1);
	
		ctx1.lineWidth=3.7;
		ctx1.strokeStyle="#851412";
		curveBetweenPoints2(powerRedStartX, powerRedStartY, powerRedEndX, powerRedEndY, ctx1);	
	}
}

function curveBetweenPoints(startX, startY, endX, endY, ctx){
	ctx.beginPath();
	ctx.moveTo(startX-5,startY-5);
	var bez1x = startX + ((endX-startX)/1.8);
	var bez1y = startY - ((endY-startY)/4.52);
	var bez2x = endX - ((endX-startX)/2.5);
	var bez2y = endY + 2.75*((endY-startY)/4.2);
	ctx.bezierCurveTo(bez1x,bez1y,bez2x,bez2y,endX,endY);
	ctx.stroke();
}
function curveBetweenPoints2(startX, startY, endX, endY, ctx){
	ctx.beginPath();
	ctx.moveTo(startX-5,startY-5);
	var bez1x = startX + 85;
	var bez1y = startY + 85;
	var bez2x = endX - 150;
	var bez2y = endY - ((endY-startY)/15.5);
	ctx.bezierCurveTo(bez1x,bez1y,bez2x,bez2y,endX,endY);
	ctx.stroke();
}


update_kabel();