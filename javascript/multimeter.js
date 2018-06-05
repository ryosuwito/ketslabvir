function Multimeter(){
    this.redPosition=new Array(2);
    this.blackPosition=new Array(2);
    this.redPosition[0]=26;
    this.redPosition[1]=5;
    this.blackPosition[0]=29;
    this.blackPosition[1]=5;
    this.mode=9;
    this.isActive=false;
    this.arus=0;
    this.sign='positive';
}

Multimeter.prototype = {
	constructor: Multimeter,
    getRedPosition:function(){
        return this.redPosition;
    },
    getBlackPosition:function(){
        return this.blackPosition;
    },
    setRedPosition:function(newPosCol, newPosRow){
        this.redPosition[0] = newPosCol;
        this.redPosition[1] = newPosRow;
    },
    setBlackPosition:function(newPosCol, newPosRow){
        this.blackPosition[0] = newPosCol;
        this.blackPosition[1] = newPosRow;
    },
    result:function(resistornya){
        var hasilnya = 0;
        for (var i = resistornya.length - 2; i >= 0; i--) {
            hasilnya += parseFloat(resistornya[i]);
        }
        var h = hasilnya.toFixed(2);
        return h;
    },
}

var multimeter = new Multimeter();
var barisMultimeter = [multimeter.getBlackPosition()[1],multimeter.getRedPosition()[1]];
var innerMultimeter = new Resistor('inner_multimeter', 0.05, multimeter.getBlackPosition()[0], multimeter.getRedPosition()[0],barisMultimeter);
var oldInnerMultimeter = clone(innerMultimeter);
var oldBarisMultimeter = barisMultimeter;
var hasilMultimeter =0;
var attachedResistor = [];

function update_multimeter(){
    switch(multimeter.mode){
        case 1:
            multi_mode_amp(10000);
            break;
        case 2:
            multi_mode_amp(200);
            break;
        case 3:
            multi_mode_amp(20);
            break;
        case 4:
            multi_mode_amp(2);
            break;
        case 5:
            multi_mode_ohm(200);
            break;
        case 6:
            multi_mode_ohm(2000);
            break;
        case 7:
            multi_mode_ohm(20000);
            break;
        case 8:
            multi_mode_ohm(200000);
            break;
        case 9:
            multi_mode_ohm(2000000);
            break;
        case 10:
            multi_mode_ohm(20000000);
            break;
        case 11:
            multi_mode_ohm(200000000);
            break;
        case 12:
            multi_mode_volt(2);
            break;
        case 13:
            multi_mode_volt(20);
            break;
        case 14:
            multi_mode_volt(200);
            break;
        case 15:
            multi_mode_volt(1000);
            break;
    }
}
function multi_mode_ohm(max){
    var startColumnScan = parseInt(multimeter.getRedPosition()[0]);
    var endColumnScan = parseInt(multimeter.getBlackPosition()[0]);
    var scannedResistor = new Array();
    var heads = 0;
    var tails = 0;
    var connected = false;
    hasilMultimeter = 0;
    var colWithTail = [];
    var colWithHead = [];
    if(startColumnScan>endColumnScan && ((startColumnScan-endColumnScan)%3 == 0)){
        for (var x = startColumnScan; x >= endColumnScan; x-=3) {   
            var currentColumn = breadBoard.getKolom(x);
            var resOnCol = new Array();
            heads = 0;
            for (var i = currentColumn.length - 1; i >= 0; i--) {
                if(currentColumn[i]!=="null"){
                    if(currentColumn[i][4]=='head' && (x!=multimeter.getBlackPosition)){
                        for (var y = colWithTail.length - 1; y >= 0; y--) {
                            if(x==colWithTail[y]){
                                connected=true;
                            }
                        }
                        if(x==startColumnScan || connected == true){
                            if(currentColumn[i][1]!=innerMultimeter.getNilai()){
                              heads += 1;
                              resOnCol.push(currentColumn[i][1])
                              colWithTail.push(x-3);
                            }
                        }

                    }
                }
            }
            if(heads<2){
                scannedResistor.push(resOnCol);
            }
            else{
                var resTemp = 0;
                for (var i = resOnCol.length - 1; i >= 0; i--) {
                    resTemp+=(1/resOnCol[i]);
                } 
                var resParallel = 1/resTemp;
                scannedResistor.push(resParallel)
            }
        }
        hasilMultimeter = multimeter.result(scannedResistor);
        if(max == 1){
            return hasilMultimeter;
        }
        console.log(hasilMultimeter+"/"+max);
        if(hasilMultimeter>max){
            hasilMultimeter = 1;
        }else{
            if(max/hasilMultimeter>=10){
                hasilMultimeter = Number(hasilMultimeter/(max/2)).toFixed(5);
            }
        } 
        var has = hasilMultimeter.toString().replace(/[.,]00$/, "");
        hasilMultimeter = has.replace('.',',');
    }
    else if(startColumnScan<endColumnScan && ((endColumnScan-startColumnScan)%3 == 0)){
        for (var x = startColumnScan; x <= endColumnScan; x+=3) {   
            var currentColumn = breadBoard.getKolom(x);
            var resOnCol =[];
            tails = 0;
            for (var i = currentColumn.length - 1; i >= 0; i--) {
                if(currentColumn[i]!=="null"){
                    if(currentColumn[i][4]=='tail' && (x!=multimeter.getRedPosition)){
                        for (var y = colWithHead.length - 1; y >= 0; y--) {
                            if(x==colWithHead[y]){
                                connected=true;
                            }
                        }
                        if(x==startColumnScan || connected == true){
                            if(currentColumn[i][1]!=innerMultimeter.getNilai()){
                              tails += 1;
                              resOnCol.push(currentColumn[i][1])
                              colWithHead.push(x+3);
                            }
                        }

                    }
                }
            }
            if(tails<2){
                scannedResistor.push(resOnCol);
            }
            else{
                var resTemp = 0;
                for (var i = resOnCol.length - 1; i >= 0; i--) {
                    resTemp+=(1/resOnCol[i]);
                } 
                var resParallel = 1/resTemp;
                scannedResistor.push(resParallel)
            }
        }
        hasilMultimeter = multimeter.result(scannedResistor);
        if(max == 1){
            return hasilMultimeter;
        }
        console.log(hasilMultimeter+"/"+max);
        if(hasilMultimeter>max){
            hasilMultimeter = 1;
        }else{
            if(max/hasilMultimeter>=10){
                hasilMultimeter = Number(hasilMultimeter/(max/2)).toFixed(5);
            }
        }
        if(hasilMultimeter>1){
            var has = hasilMultimeter.toString().replace(/[.,]00$/, "");
            hasilMultimeter = has.replace('.',',');
        }
    }
    var dispM = document.getElementById('displayMultimeter');
    if(hasilMultimeter == 'NaN'){
        hasilMultimeter = 0;
    }
    dispM.innerText = hasilMultimeter;
}
function multi_mode_amp(max){
    var hasilArus = multimeter.arus;
    //console.log(hasilArus+"/"+max);
    if(hasilArus>max){
        hasilArus = 1;
    }else{
        if(max/hasilArus>=10){
            if(multimeter.mode!=1){
                hasilArus = Number(hasilArus).toFixed(5);
            }else{
                hasilArus = Number(hasilArus).toFixed(5);
            }
        }
    } 
    var has = 0;
    if(hasilArus != 1){
        has = hasilArus.toString().replace(/[.,]00$/, "");
    }
    else{
        has = hasilArus;
    }
    //console.log(has.replace('.',','));
    //console.log(multimeter.sign);
    var s = '';
    if(multimeter.sign == 'negative') s = '-';
    var dispM = document.getElementById('displayMultimeter');
    if(has == 'NaN'){
        has = 0;
    }
    dispM.innerText = s + has;
}
function multi_mode_volt(max){
    var hasilArus = multimeter.arus;
    console.log(hasilArus+"/"+max);
    var hasilHambatan = multi_mode_ohm(1);
    var tempTegangan = hasilArus * hasilHambatan;
    console.log(tempTegangan+'tempTegangan');
    var hasilTegangan =  tempTegangan/1000;

    if(hasilTegangan>max){
        hasilTegangan = 1;
    }else{
        if(max/hasilTegangan>=10){
            if(multimeter.mode!=15){
                hasilTegangan = hasilTegangan;//(max/2);
            }else{
                hasilTegangan = hasilTegangan;//max;
            }
        }
    }
    var has = 0; 
    if(hasilTegangan != 1){
        has = hasilTegangan.toFixed(5).toString().replace(/[.,]00$/, "");
    }
    else{
        has = hasilTegangan;
    }
    //console.log(has.replace('.',','));
    //console.log(multimeter.sign);
    console.log(has+'has');
    var s = '';
    if(multimeter.sign == 'negative') s = '-';
    var dispM = document.getElementById('displayMultimeter');
    if(has == 'NaN'){
        has = 0;
    }
    dispM.innerText = s + has;
}