var skala = 1;
var normal = 1;
function clone(a) {
   return new Resistor(a.getNama(), a.getNilai(), a.getKepala(), a.getBuntut(), a.getBaris());
}

function Resistor(namanya, nilainya, kepalanya, buntutnya, barisnya){
	this.nama = namanya;
	this.nilai = nilainya;
	this.kepala = kepalanya;
	this.buntut = buntutnya;
	this.baris = barisnya;
}

Resistor.prototype = {
	constructor: Resistor,
	getNama:function(){
		return this.nama;
	},
	getNilai:function(){
		return this.nilai;
	},
	getKepala:function(){
		return this.kepala;
	},
	getBuntut:function(){
		return this.buntut;
	},
	getBaris:function(){
		return this.baris;
	},
	join:function(){
		var res = new Array(5);
		res[0] = this.nama;
        res[1] = this.nilai;
        res[2] = this.kepala;
        res[3] = this.buntut;
        res[4] = this.baris;
		return res;
	},
    updateLokasi:function(kepalaBaru, buntutBaru, barisBaru){
    	this.kepala = kepalaBaru;
    	this.buntut = buntutBaru;
    	this.baris = barisBaru;
    }
}