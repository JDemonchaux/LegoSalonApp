var mongo = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
var assert = require('assert');
var format = require('date-format');
var math = require('mathjs');
var Server = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;

//Connection au serveur hebergeant mongo sur le port par defaut
var server = new Server('127.0.0.1', 27017, {auto_reconnect: true});
process.env.TZ = 'Europe/Amsterdam'
//Connection a la BDD de production
db = new Db('wslego', server);

//Connection à la collection "collection" 
db.open(function(err, db) {
	if(!err) {
		console.log("Connecté a wslego");
		db.collection('log_visite', {strict:true}, function(err, collection) {
			if (err) {
				console.log("La collection log_visite n'existe pas!");
			}
		});
	}
});

exports.getTime = function(req, res) {
	var date = format.asString('dd/MM/yy hh:mm', new Date());

	res.send(date);
	res.end();
}

exports.addVisiteur = function(req, res) {
	var d = new Date(/*"July 02, 2015 11:13:00"*/);
	year = d.getFullYear();
	month = d.getMonth();
	day = d.getUTCDate();

	dateNow = new Date(year,month,day);
	var document = {
		date:dateNow,
		sens:"IN",
		nombre:req.params.nombre
	}

	db.collection('log_visite').insert(document, {w: 1}, function(err, records){
		console.log(req.params.nombre + " IN");
	});

	res.send(req.params.nombre + " pelo(s) en entree");
	res.end();
}

exports.removeVisiteur = function(req, res) {
	var d = new Date(/*"July 02, 2015 11:13:00"*/);
	year = d.getFullYear();
	month = d.getMonth();
	day = d.getUTCDate();

	dateNow = new Date(year,month,day);
	var document = {
		date:dateNow,
		sens:"OUT",
		nombre:req.params.nombre
	}

	db.collection('log_visite').insert(document, {w: 1}, function(err, records){
		console.log(req.params.nombre + " OUT");
	});

	res.send(req.params.nombre + " pelo(s) en sortie");
	res.end();
}

exports.countVisiteur = function(req, res) {
	var d = new Date(/*"July 02, 2015 11:13:00"*/);
	year = d.getFullYear();
	month = d.getMonth();
	day = d.getUTCDate();

	dateNow = new Date(year,month,day);
	var cursor;
	var total = {nombre:0};

	db.collection('log_visite').find({ date:new Date(dateNow.toISOString())}).toArray(function(err, docs) {
		console.log(docs);
		for (var i = docs.length - 1; i >= 0; i--) {
			
			if (docs[i] != null) {
				if (docs[i]['sens'] == "IN") {
					total.nombre += Number(docs[i]['nombre']);
					console.log(total);
				} else if (docs[i]['sens'] == "OUT") {
					total.nombre -= Number(docs[i]['nombre']);
					console.log(total);
				}
			}
		}
		res.send(total);
		res.end();		
	});

	
	
};