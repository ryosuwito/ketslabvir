var power_is_off = true;
var power_is_rotating_right = true;
var current_degree_power = -96;
var btn_power_supply = document.getElementById("btnPowerSupply");
var knob_power_supply = document.getElementById("knobPowerSupply");

var power_led_1 = document.getElementById("powerLed1");
var power_led_2 = document.getElementById("powerLed2");
var power_led_3 = document.getElementById("powerLed3");
var power_led_4 = document.getElementById("powerLed4");
var power_led_5 = document.getElementById("powerLed5");

btn_power_supply.addEventListener("click", function(){ 
    var stat = document.getElementById("is_started").innerHTML;
	if(power_is_off && stat != "no"){
		power.isActive=true;
		breadBoard.attachResistor(innerMultimeter.getKepala(),innerMultimeter.getBaris()[0],innerMultimeter.join(),'head');
		breadBoard.attachResistor(innerMultimeter.getBuntut(),innerMultimeter.getBaris()[1],innerMultimeter.join(),'tail');
		btn_power_supply.src="/Pictures/POWER_ON.png";	
		power_led_1.style.display="block";
		power_led_2.style.display="block";
		power_led_3.style.display="block";
		power_led_4.style.display="block";
		power_led_5.style.display="block"; 
	    power_is_off=false;
	    update_power();}
	else {
		if(stat == "no"){
			alert("Tekan tombol 'Mulai' di bawah untuk menggunakan lab virtual");
		}
		power.isActive=false;
		breadBoard.dettachResistor(innerMultimeter.getKepala(), innerMultimeter.getBaris()[0]);
        breadBoard.dettachResistor(innerMultimeter.getBuntut(), innerMultimeter.getBaris()[1]);
		btn_power_supply.src="/Pictures/POWER_OFF.png";	
		power_led_1.style.display="none";
		power_led_2.style.display="none";
		power_led_3.style.display="none";
		power_led_4.style.display="none";
		power_led_5.style.display="none";
	    power_is_off=true} });

knob_power_supply.addEventListener("click", function(event){ 
	var is_ctrl = event.ctrlKey;
	if(is_ctrl)power_is_rotating_right = false
	else power_is_rotating_right = true;
    if(power_is_rotating_right){
		if(current_degree_power != 32) current_degree_power += 32;
	  	knob_power_supply.style.transform="rotate("+current_degree_power+"deg)";		  	
		checkKnob();
    }
    else {
		if(current_degree_power != -96) current_degree_power -= 32;
	  	knob_power_supply.style.transform="rotate("+current_degree_power+"deg)";  	
		checkKnob();
    }
    });
checkKnob();

function checkKnob(){
	switch(current_degree_power){
		case -96 :
		    power.mode=3;
		    power_led_1.style.backgroundColor="#00ff00";
		    power_led_2.style.backgroundColor="#ff0000";
		    break;
		case -64 :
		    power.mode=6;
		    power_led_1.style.backgroundColor="#ff0000";
		    power_led_2.style.backgroundColor="#00ff00";
		    power_led_3.style.backgroundColor="#ff0000";
		    break;
		case -32 :
		    power.mode=9;
		    power_led_2.style.backgroundColor="#ff0000";
		    power_led_3.style.backgroundColor="#00ff00";
		    power_led_4.style.backgroundColor="#ff0000";
		    break;
		case 0 :
		    power.mode=12;
		    power_led_3.style.backgroundColor="#ff0000";
		    power_led_4.style.backgroundColor="#00ff00";
		    power_led_5.style.backgroundColor="#ff0000";
		    break;
		case 32 :
		    power.mode=24;
		    power_led_4.style.backgroundColor="#ff0000";
		    power_led_5.style.backgroundColor="#00ff00";
		    break;

	}
	update_power();
	if(multimeter.isActive){
		update_multimeter();
	}
}
