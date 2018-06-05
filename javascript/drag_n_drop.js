var copy_no = 0;
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var isNew = false;
    var data = ev.dataTransfer.getData("text");
    var idnya = document.getElementById(data).id;
    if( idnya.indexOf('copy') < 0 && idnya.indexOf('probe') < 0){
    	copy_no ++;
	    var nodeCopy = document.getElementById(data).cloneNode(true);
	    nodeCopy.id = document.getElementById(data).id + "_copy"+copy_no; /* We cannot use the same ID */
		isNew = true;
    }
    else {
    	var nodeCopy = document.getElementById(data);
    }
	ev.target.appendChild(nodeCopy);
    document.getElementById(nodeCopy.id).style.position="relative";
    if(idnya.indexOf('probe')<0){
	    document.getElementById(nodeCopy.id).style.left="5px";
	    document.getElementById(nodeCopy.id).style.top="-18px";
	    var classes=document.getElementById(nodeCopy.id).parentNode.className;
	    var classnya = classes.split(" ");
	    var barisnya = classnya[2].replace('row', '');
	    var kepalanya=parseInt(classnya[1].replace('col', ''));
	    var kepalanyaLama = 0;
	    var barisnyaLama = 0;
	    var buntutnya=kepalanya - 3;
		var classResistor=document.getElementById(nodeCopy.id).className;
		var classnyaResistor=classResistor.split(" ");
		var nilainya = parseInt(classnyaResistor[1])+(Math.floor((Math.random() * 101) -50)/10*parseInt(classnyaResistor[1])/100);

		
	    if(classnya[1]==='col3' || classnya[1]==='col2' || classnya[1]==='col1'){
			for(var w = attachedResistor.length - 1; w >= 0; w--) {
				if(nodeCopy.id==attachedResistor[w].getNama()){
				    var r = attachedResistor[w];
				    dettachingResistor(r.getKepala(),r.getBaris());
				    attachedResistor.splice(w,1);
				}
			}
			ev.target.removeChild(nodeCopy);		
		    update_breadboard();
	    }
	    else{	
	    	if(isNew == true){
				var r = new Resistor(nodeCopy.id, nilainya, kepalanya, buntutnya, barisnya);
				attachedResistor.push(r);
                attachingResistor(barisnya,r);
			}else{
				for (var w = attachedResistor.length - 1; w >= 0; w--) {
					if(nodeCopy.id==attachedResistor[w].getNama()){
					    var r = attachedResistor[w];
					    kepalanyaLama = r.getKepala();
					    barisnyaLama = r.getBaris();
					}
				}
				r.updateLokasi(kepalanya,buntutnya,barisnya);
				dettachingResistor(kepalanyaLama,barisnyaLama);
				attachingResistor(barisnya,r);
			}
    
		    update_breadboard();
	    }
	}
	else{
	    document.getElementById(nodeCopy.id).style.left="0px";
	    document.getElementById(nodeCopy.id).style.top="-18px";
        var classes=document.getElementById(nodeCopy.id).parentNode.className;
	    var classnya = classes.split(" ");
	    var barisnya = classnya[2].replace('row', '');
		var rect = document.getElementById(nodeCopy.id);
		var rectParent = rect.offsetParent;
		ctx1.clearRect(0, 0, c.width, c.height);
		ctx1.lineWidth=2.7;
		if(idnya.indexOf('Red') < 0){
		    if (idnya.indexOf('Power')<0) {
		    	powerBlackEndX=rectParent.offsetLeft-4;
		    	powerBlackEndY=rectParent.offsetTop-rect.offsetHeight-10;
		    	power.setBlackPosition(parseInt(classnya[1].replace('col', '')), baris_to_index(barisnya));
				if(power.isActive==true){
					update_power();
				}
		    }
		    else {
		    	multiBlackStartX=rectParent.offsetLeft+12;
		    	multiBlackStartY=rectParent.offsetTop-rect.offsetHeight-6;
		    	multimeter.setBlackPosition(parseInt(classnya[1].replace('col', '')), baris_to_index(barisnya));
				update_innerMultimeter();
		    }
	    }
	    else{
		    if (idnya.indexOf('Power')<0) {				    	
		    	powerRedEndX=rectParent.offsetLeft-4;
		    	powerRedEndY=rectParent.offsetTop-rect.offsetHeight-10;		    	
		    	power.setRedPosition(parseInt(classnya[1].replace('col', '')), baris_to_index(barisnya));
				if(power.isActive==true){
					update_power();
				}
		    }
		    else {   	
		    	multiRedStartX=rectParent.offsetLeft+12;
		    	multiRedStartY=rectParent.offsetTop-rect.offsetHeight-6;		    	
		    	multimeter.setRedPosition(parseInt(classnya[1].replace('col', '')), baris_to_index(barisnya));
				update_innerMultimeter();
		    }
	    }
        update_breadboard();
		update_kabel();
	}

	if(multimeter.isActive==true){
		update_multimeter();
	}
	if(power.isActive==true){
		update_power();
	}
}

function drop2(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var idnya = document.getElementById(data).id;
    if( idnya.indexOf('copy') < 0){
    }
    else{
    	var node = document.getElementById(data);
		for(var w = attachedResistor.length - 1; w >= 0; w--) {
			if(idnya==attachedResistor[w].getNama()){
			    var r = attachedResistor[w];
			    dettachingResistor(r.getKepala(),r.getBaris());
			    attachedResistor.splice(w,1);
			}
		}
		node.parentNode.removeChild(node);
		update_breadboard();
		if(multimeter.isActive==true){
			update_multimeter();
		}
		if(power.isActive==true){
			update_power();
		}
	}
}

function update_innerMultimeter(){
	if(multimeter.getBlackPosition()[0] > multimeter.getRedPosition()[0]){
		barisMultimeter = [multimeter.getBlackPosition()[1],multimeter.getRedPosition()[1]]; 
		innerMultimeter.updateLokasi(multimeter.getBlackPosition()[0], multimeter.getRedPosition()[0], barisMultimeter);
	}else{
		barisMultimeter = [multimeter.getRedPosition()[1],multimeter.getBlackPosition()[1]]; 
		innerMultimeter.updateLokasi(multimeter.getRedPosition()[0], multimeter.getBlackPosition()[0], barisMultimeter);
	}	
	if(multimeter.isActive==true){
		update_multimeter();
	}
	dettach_multimeter();
	attach_multimeter();
	oldInnerMultimeter = clone(innerMultimeter);
	oldBarisMultimeter = barisMultimeter;
}


function dettach_multimeter(){
    breadBoard.dettachResistor(oldInnerMultimeter.getKepala(), oldInnerMultimeter.getBaris()[0]);
    breadBoard.dettachResistor(oldInnerMultimeter.getBuntut(), oldInnerMultimeter.getBaris()[1]);
}

function attach_multimeter(){

    breadBoard.attachResistor(innerMultimeter.getKepala(), innerMultimeter.getBaris()[0], innerMultimeter.join(), 'head');
    breadBoard.attachResistor(innerMultimeter.getBuntut(), innerMultimeter.getBaris()[1], innerMultimeter.join(), 'tail');

}
function update_breadboard(){
	var child=0;
	var escaped=false;
	for (var i = breadBoard.kolom.length - 1; i >= 0; i--) {
		var obj = document.getElementsByClassName('col'+(i+1).toString());
		for (var j = breadBoard.kolom[i].length - 1; j >= 0; j--) {
			obj[j].style.backgroundColor='transparent';
		}
	}
	for (var i = breadBoard.kolom.length - 1; i >= 0; i--) {
		var obj = document.getElementsByClassName('col'+(i+1).toString());
		for (var j = breadBoard.kolom[i].length - 1; j >= 0; j--) {
			if(breadBoard.kolom[i][j]!='null'){
				obj[j].style.backgroundColor="rgba(220,40,55,0.75)";
				child+=1;
			}else{
				if(child>0){
					if(escaped==false){
						j = breadBoard.kolom[i].length;
						escaped = true;
					}
					if(escaped==true && j == breadBoard.kolom[i].length){
						continue;
					}
				    obj[j].style.backgroundColor="rgba(20,255,40,0.5)";
					if(i==multimeter.getRedPosition()[0]-1 && j==multimeter.getRedPosition()[1]-1){
						obj[j].style.backgroundColor="rgba(220,40,55,0.75)";
					}
					if(i==multimeter.getBlackPosition()[0]-1 && j==multimeter.getBlackPosition()[1]-1){
						obj[j].style.backgroundColor="rgba(220,40,55,0.75)";
					}
				}else{
					if(i==multimeter.getRedPosition()[0]-1){
						obj[j].style.backgroundColor="rgba(20,255,40,0.5)";
						if(j==multimeter.getRedPosition()[1]-1){
							obj[j].style.backgroundColor="rgba(220,40,55,0.75)";
						}
					}
					if(i==multimeter.getBlackPosition()[0]-1){
						obj[j].style.backgroundColor="rgba(20,255,40,0.5)";
						if(j==multimeter.getBlackPosition()[1]-1){
							obj[j].style.backgroundColor="rgba(220,40,55,0.75)";
						}
					}
				}
			}
		}
		child = 0;
		escaped = false;
	}
}
function attachingResistor(baris, restObject){
    breadBoard.attachResistor(restObject.getKepala(), baris_to_index(baris), restObject.join(), 'head');
    breadBoard.attachResistor(restObject.getBuntut(), baris_to_index(baris), restObject.join(), 'tail');
    
	if(multimeter.isActive==true){
		update_multimeter();
	}
	if(power.isActive==true){
		update_power();
	}

}
function dettachingResistor(colLama, rowLama){
    breadBoard.dettachResistor(colLama, baris_to_index(rowLama));
    breadBoard.dettachResistor(colLama-3, baris_to_index(rowLama));   
	if(multimeter.isActive==true){
		update_multimeter();
	}
	if(power.isActive==true){
		update_power();
	}
}

function baris_to_index(stringBaris){
    switch(stringBaris){
    	case 'A':
    	    return 1;
    	case 'B':
    	    return 2;
    	case 'C':
    	    return 3;
    	case 'D':
    	    return 4;
    	case 'E':
    	    return 5;

    }
}