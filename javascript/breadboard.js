function Breadboard(){
	this.kolom = new Array(30);
	for (var i = this.kolom.length - 1; i >= 0; i--) {
		this.kolom[i] = new Array(5);
		for (var j = this.kolom[i].length - 1; j >= 0; j--) {
			this.kolom[i][j] = "null";
		}
	}
}

Breadboard.prototype = {
	constructor: Breadboard,
    getNode:function(nomorKolom, nomorBaris){
        return this.kolom[nomorKolom-1][nomorBaris-1];
    },
    getKolom:function(nomorKolom){
        return this.kolom[nomorKolom-1];
    },
    attachResistor:function(nomorKolom, nomorBaris, resistornya, headOrTail){
        this.kolom[nomorKolom-1][nomorBaris-1] = resistornya;
        this.kolom[nomorKolom-1][nomorBaris-1][4] = headOrTail;
    },
    dettachResistor:function(nomorKolom, nomorBaris){
        this.kolom[nomorKolom-1][nomorBaris-1] = 'null';
    }
}

var breadBoard = new Breadboard();