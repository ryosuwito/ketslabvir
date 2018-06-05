var btnStart = document.getElementById("btn-start");
btnStart.addEventListener("click",function(){
	document.getElementById("is_started").innerHTML = "yes";
	var batasWaktu = document.getElementById("batas-waktu").innerHTML;
    var lastTimer = addMinutes(new Date(), batasWaktu).getTime();
    document.getElementById("timer-box").classList.remove("hidden"); 
    document.getElementById("form-jawaban").classList.remove("hidden");
	document.getElementById("form-message-box").classList.add("hidden");
    var audio = new Audio('/src/tiktok.mp3');
	var x = setInterval(function(){
	    audio.play();
	    var newTimer = new Date();
	    var distance = lastTimer - newTimer; 

	    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	    document.getElementById("time-counter").innerHTML = hours + ":" + minutes + ":" + seconds;
		if (distance < 0) {
		    clearInterval(x);
		    document.getElementById("time-counter").innerHTML = "--:--:--";
		}
	},1000);
});
function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}
