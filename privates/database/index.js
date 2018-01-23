/**
 * Index de database
 *
 * Created by danihbelan on 15/01/2018.
 */

exports.general = require("./subsistems/general.js");

var connect = require("./connections.js");
var myDB;
connect.connect(function(db){
	exports.db = db;
	myDB = db;
});

exports.escape = function(text){
	return exports.db.escape(text);
};

exports.query = function(sql, values, cb){
	return exports.db.query(sql, values, cb);
};

exports.getMySQL = function(){
	return myDB;
};

exports.utils = require("./util");