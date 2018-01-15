/**
 * Index de database
 *
 * Created by danihbelan on 15/01/2018.
 */

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



