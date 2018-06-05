var multi_is_off = true;
var multi_is_rotating_right = true;
var current_degree_multi = 0;
var display_multimeter = document.getElementById("displayMultimeter");
var display_multimeter_small = document.getElementById("displayMultimeterSmall");
var btn_multimeter = document.getElementById("btnMultimeter");
var knob_multimeter = document.getElementById("knobMultimeter");

var multi_led_1 = document.getElementById("multiLed1");
var multi_led_2 = document.getElementById("multiLed2");
var multi_led_3 = document.getElementById("multiLed3");
var multi_led_4 = document.getElementById("multiLed4");
var multi_led_5 = document.getElementById("multiLed5");
var multi_led_6 = document.getElementById("multiLed6");
var multi_led_7 = document.getElementById("multiLed7");
var multi_led_8 = document.getElementById("multiLed8");
var multi_led_9 = document.getElementById("multiLed9");
var multi_led_10 = document.getElementById("multiLed10");
var multi_led_11 = document.getElementById("multiLed11");
var multi_led_12 = document.getElementById("multiLed12");
var multi_led_13 = document.getElementById("multiLed13");
var multi_led_14 = document.getElementById("multiLed14");
var multi_led_15 = document.getElementById("multiLed15");

btn_multimeter.addEventListener("click", function(){ 
    var stat = document.getElementById("is_started").innerHTML;
	if(multi_is_off && stat != "no"){
		multimeter.isActive=true;
		btn_multimeter.src="/Pictures/POWER_ON.png"; 
                display_multimeter.style.display="block";
	        display_multimeter_small.style.display="block";	
		multi_led_1.style.display="block";
		multi_led_2.style.display="block";
		multi_led_3.style.display="block";
		multi_led_4.style.display="block";
		multi_led_5.style.display="block";
		multi_led_6.style.display="block";
		multi_led_7.style.display="block";
		multi_led_8.style.display="block";
		multi_led_9.style.display="block";
		multi_led_10.style.display="block";
		multi_led_11.style.display="block";
		multi_led_12.style.display="block";
		multi_led_13.style.display="block";
		multi_led_14.style.display="block";
		multi_led_15.style.display="block";
	    multi_is_off=false;
	    update_multimeter();}
	else {
		if(stat == "no"){
			alert("Tekan tombol 'Mulai' di bawah untuk menggunakan lab virtual");
		}
		multimeter.isActive=false;
		btn_multimeter.src="/Pictures/POWER_OFF.png";
	    display_multimeter.style.display="none";
	    display_multimeter_small.style.display="none";	
		multi_led_1.style.display="none";
		multi_led_2.style.display="none";
		multi_led_3.style.display="none";
		multi_led_4.style.display="none";
		multi_led_5.style.display="none";
		multi_led_6.style.display="none";
		multi_led_7.style.display="none";
		multi_led_8.style.display="none";
		multi_led_9.style.display="none";
		multi_led_10.style.display="none";
		multi_led_11.style.display="none";
		multi_led_12.style.display="none";
		multi_led_13.style.display="none";
		multi_led_14.style.display="none";
		multi_led_15.style.display="none";
	    multi_is_off=true} });

knob_multimeter.addEventListener("click", function(event){ 
    var is_ctrl = event.ctrlKey;
    if(is_ctrl)multi_is_rotating_right = false
    else multi_is_rotating_right = true;
    if(multi_is_rotating_right){
    	if(current_degree_multi == 30 || current_degree_multi == -90){
    		current_degree_multi += 30;
    	}
    	else {
			if(current_degree_multi!=105) current_degree_multi += 15;
    	}
	  	knob_multimeter.style.transform="rotate("+current_degree_multi+"deg)";	
	  	if(current_degree_multi >= 102){
	  		multi_is_rotating_right = false;
		}
		checkKnobMulti()
    }
    else {
    	if(current_degree_multi == 60 || current_degree_multi == -60){
    		current_degree_multi -= 30;
    	}
    	else {
			if(current_degree_multi != -135)current_degree_multi -= 15;
    	}


	  	knob_multimeter.style.transform="rotate("+current_degree_multi+"deg)";  
		checkKnobMulti()
    }
    });
checkKnobMulti()
function checkKnobMulti(){
	switch(current_degree_multi){
		case -135 :
		    multimeter.mode = 1;
		    display_multimeter.innerText=0;
		    display_multimeter_small.innerText="A"
		    multi_led_1.style.backgroundColor="#00ff00";
		    multi_led_2.style.backgroundColor="#ff0000";
		    break;
		case -120 :
		    multimeter.mode = 2;
		    display_multimeter.innerText=0;
		    display_multimeter_small.innerText="mA"
		    multi_led_1.style.backgroundColor="#ff0000";
		    multi_led_2.style.backgroundColor="#00ff00";
		    multi_led_3.style.backgroundColor="#ff0000";
		    break;
		case -105 :
		    multimeter.mode = 3;
		    display_multimeter.innerText=0;
		    multi_led_2.style.backgroundColor="#ff0000";
		    multi_led_3.style.backgroundColor="#00ff00";
		    multi_led_4.style.backgroundColor="#ff0000";
		    break;
		case -90 :
		    multimeter.mode = 4;
		    display_multimeter.innerText=0;
		    display_multimeter_small.innerText="mA"
		    multi_led_3.style.backgroundColor="#ff0000";
		    multi_led_4.style.backgroundColor="#00ff00";
		    multi_led_5.style.backgroundColor="#ff0000";
		    break;
		case -60 :
		    multimeter.mode = 5;
		    display_multimeter.innerText=0;
		    display_multimeter_small.innerHTML="&#x2126;"
		    multi_led_4.style.backgroundColor="#ff0000";
		    multi_led_5.style.backgroundColor="#00ff00";
		    multi_led_6.style.backgroundColor="#ff0000";
		    break;
		case -45 :
		    multimeter.mode = 6;
		    display_multimeter.innerText=0;
		    multi_led_5.style.backgroundColor="#ff0000";
		    multi_led_6.style.backgroundColor="#00ff00";
		    multi_led_7.style.backgroundColor="#ff0000";
		    break;
		case -30 :
		    multimeter.mode = 7;
		    display_multimeter.innerText=0;
		    multi_led_6.style.backgroundColor="#ff0000";
		    multi_led_7.style.backgroundColor="#00ff00";
		    multi_led_8.style.backgroundColor="#ff0000";
		    break;
		case -15 :
		    multimeter.mode = 8;
		    display_multimeter.innerText=0;
		    multi_led_7.style.backgroundColor="#ff0000";
		    multi_led_8.style.backgroundColor="#00ff00";
		    multi_led_9.style.backgroundColor="#ff0000";
		    break;
		case 0 :
		    multimeter.mode = 9;
		    display_multimeter.innerText=0;
		    multi_led_8.style.backgroundColor="#ff0000";
		    multi_led_9.style.backgroundColor="#00ff00";
		    multi_led_10.style.backgroundColor="#ff0000";
		    break;
		case 15 :
		    multimeter.mode = 10;
		    display_multimeter.innerText=0;
		    multi_led_9.style.backgroundColor="#ff0000";
		    multi_led_10.style.backgroundColor="#00ff00";
		    multi_led_11.style.backgroundColor="#ff0000";
		    break;
		case 30 :
		    multimeter.mode = 11;
		    display_multimeter.innerText=0;
		    display_multimeter_small.innerHTML="&#x2126;"
		    multi_led_10.style.backgroundColor="#ff0000";
		    multi_led_11.style.backgroundColor="#00ff00";
		    multi_led_12.style.backgroundColor="#ff0000";
		    break;
		case 60 :
		    multimeter.mode = 12;
		    display_multimeter.innerText=0;
		    display_multimeter_small.innerText="V"
		    multi_led_11.style.backgroundColor="#ff0000";
		    multi_led_12.style.backgroundColor="#00ff00";
		    multi_led_13.style.backgroundColor="#ff0000";
		    break;
		case 75 :
		    multimeter.mode = 13;
		    display_multimeter.innerText=0;
		    multi_led_12.style.backgroundColor="#ff0000";
		    multi_led_13.style.backgroundColor="#00ff00";
		    multi_led_14.style.backgroundColor="#ff0000";
		    break;
		case 90 :
		    multimeter.mode = 14;
		    display_multimeter.innerText=0;
		    multi_led_13.style.backgroundColor="#ff0000";
		    multi_led_14.style.backgroundColor="#00ff00";
		    multi_led_15.style.backgroundColor="#ff0000";
		    break;
		case 105 :
		    multimeter.mode = 15;
		    display_multimeter.innerText=0;
		    multi_led_14.style.backgroundColor="#ff0000";
		    multi_led_15.style.backgroundColor="#00ff00";
		    break;
	}
    
	update_multimeter();
}
