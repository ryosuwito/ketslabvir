function Power(){
    this.redPosition=new Array(2);
    this.blackPosition=new Array(2);
    this.redPosition[0]=-1;
    this.redPosition[1]=5;
    this.blackPosition[0]=-2;
    this.blackPosition[1]=5;
    this.mode=9;
    this.tegangan=0;
    this.isActive=false;
}

Power.prototype = {
	constructor: Power,
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
        //console.log("resistornya "+resistornya);
        for (var i = resistornya.length - 2; i >= 0; i--) {
            hasilnya += parseFloat(resistornya[i]);
        }
        //console.log("hasilnya "+hasilnya);
        var arus = 0;
        if(multimeter.mode!=1){
            arus = this.tegangan/hasilnya*1000;
        }else{
            arus = this.tegangan/hasilnya;
        }
        var h = arus.toFixed(5);
        return h;
    },
}

var power = new Power();

var hasilPower = 0;
var powerConnectedResistor = [];

function update_power(){
    switch(power.mode){
        case 3:
            power.tegangan = 3;
            power_mode();
            break;
        case 6:
            power.tegangan = 6;
            power_mode();
            break;
        case 9:
            power.tegangan = 9;
            power_mode();
            break;
        case 12:
            power.tegangan = 12;
            power_mode();
            break;
        case 24:
            power.tegangan = 24;
            power_mode();
            break;
    }
}
function power_mode(){
    var powerStartColumnScan = parseInt(power.getRedPosition()[0]);
    var powerEndColumnScan = parseInt(power.getBlackPosition()[0]);
    var powerScannedResistor = new Array();
    var powerHeads = 0;
    var powerTails = 0;
    var powerConnected = false;
    hasilPower = 0;
    var powerColWithTail = [];
    var powerColWithHead = [];
    var cc = breadBoard.getKolom(powerStartColumnScan);
    var cb = breadBoard.getKolom(powerEndColumnScan);
    
    var in_probed = new Array();
    var is_probed = 'no';

    if(powerStartColumnScan == -1 || powerEndColumnScan == -1){
        return;
    }
    var is_in_range = powerStartColumnScan>powerEndColumnScan && ((powerStartColumnScan-powerEndColumnScan)%3 == 0);
    if(is_in_range){
        is_probed = 'no'; 
        for (var x = powerStartColumnScan; x >= powerEndColumnScan; x-=3) {   
            var currentColumn = breadBoard.getKolom(x);
            for(i = currentColumn.length - 1; i >= 0; i--){
                if(currentColumn[i].length>1){
                    for(j = currentColumn.length - 1; j >= 0; j--){
                        if(currentColumn[i][j] == "inner_multimeter"){
                            var tag = currentColumn[i][currentColumn.length - 1];
                            in_probed.push(tag);
                            //console.log(tag);
                            is_probed = 'yes';
                            //console.log("Yes probed");
                        }
                    }
                }
            }
            var resOnCol = new Array();
            powerHeads = 0;
            for (var i = currentColumn.length - 1; i >= 0; i--) {
                if(currentColumn[i]!=="null"){
                    if(currentColumn[i][4]=='head' && (x!=power.getBlackPosition)){
                        for (var y = powerColWithTail.length - 1; y >= 0; y--) {
                            if(x==powerColWithTail[y]){
                                powerConnected=true;
                            }
                        }
                        if(x==powerStartColumnScan || powerConnected == true){
                            powerHeads += 1;
                            if(multimeter > 11 && currentColumn[i][0] == "inner_multimeter"){
                                resOnCol.push(1000000);
                            }
                            else{
                                resOnCol.push(currentColumn[i][1]);                             
                            }
                            
                            powerColWithTail.push(x-3);
                        }

                    }
                }
            }
            if(powerHeads<2){
                powerScannedResistor.push(resOnCol);
                
                //console.log(powerScannedResistor);
                //console.log("that");
            }
            else{
                var resTemp = 0;
                for (var i = resOnCol.length - 1; i >= 0; i--) {
                    resTemp+=(1/resOnCol[i]);
                } 
                var resParallel = 1/resTemp;
                powerScannedResistor.push(resParallel);
            }
        }
        hasilPower = power.result(powerScannedResistor);
    }
    else if(powerStartColumnScan<powerEndColumnScan && ((powerEndColumnScan-powerStartColumnScan)%3 == 0)){
        is_probed = 'no'; 
        for (var x = powerStartColumnScan; x <= powerEndColumnScan; x+=3) { 
            var currentColumn = breadBoard.getKolom(x);
            for(i = currentColumn.length - 1; i >= 0; i--){
                if(currentColumn[i].length>1){
                    for(j = currentColumn.length - 1; j >= 0; j--){
                        if(currentColumn[i][j] == "inner_multimeter"){
                            var tag = currentColumn[i][currentColumn.length - 1];
                            in_probed.push(tag);
                            //console.log(tag);
                            is_probed = 'yes';
                            //console.log("Yes probed");
                        }
                    }
                }
            }
            var resOnCol = new Array();
            powerTails = 0;
            for (var i = currentColumn.length - 1; i >= 0; i--) {
                if(currentColumn[i]!=="null"){
                    if(currentColumn[i][4]=='tail' && (x!=power.getRedPosition)){
                        for (var y = powerColWithHead.length - 1; y >= 0; y--) {
                            if(x==powerColWithHead[y]){
                                powerConnected=true;
                            }
                        }
                        if(x==powerStartColumnScan || powerConnected == true){
                            powerTails += 1;
                            //console.log(currentColumn[i][1]);
                            if(multimeter > 11 && currentColumn[i][0] == "inner_multimeter"){
                                resOnCol.push(1000000);
                            }
                            else{
                                resOnCol.push(currentColumn[i][1]);                             
                            }
                            powerColWithHead.push(x+3);
                            
                        }

                    }
                }
            }
            if(powerTails<2 && resOnCol != null){
                powerScannedResistor.push(resOnCol);
                //console.log(powerScannedResistor);
                //console.log("this");
                //console.log(resOnCol);
            }
            else{
                var resTemp = 0;
                for (var i = resOnCol.length - 1; i >= 0; i--) {
                    if(resOnCol[i]>0.1){
                        resTemp+=(1/resOnCol[i]);
                    }
                } 
                var resParallel = 1/resTemp;
                powerScannedResistor.push(resParallel);
                //console.log("these");
                //console.log(resOnCol);
            }
        }
        hasilPower = power.result(powerScannedResistor);
    }
    var dispM = document.getElementById('displayMultimeter');
    if(hasilPower == 'NaN'){
        hasilPower = 0;
        dispM.innerText = hasilPower;
    }

    if(in_probed.length>1){
        var mb = multimeter.getBlackPosition()[0];
        var mr = multimeter.getRedPosition()[0];
        var pb = power.getBlackPosition()[0];
        var pr = power.getRedPosition()[0]
        //console.log("multiBlack = "+mb);
        //console.log("multiRed = "+mr);
        //console.log("powerBlack = "+pb);
        //console.log("powerRed = "+pr);
        if(mr > mb){
            if(pr > pb){  
                multimeter.sign = 'positive';
                multimeter.arus = hasilPower;
            }else{
                multimeter.sign = 'negative';
                multimeter.arus = hasilPower;
            }
        }else{
            if(pr > pb){
                multimeter.sign = 'negative';
                multimeter.arus = hasilPower;
            }else{
                multimeter.sign = 'positive';
                multimeter.arus = hasilPower;
            }
        }
    }
    //console.log(in_probed.length);
    console.log(hasilPower);
}