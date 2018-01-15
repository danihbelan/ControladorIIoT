/**
 * Fichero encargado de establecer la conexion con la base de datos
 *
 * Created by danihbelan on 15/01/2018.
 */
var mysql = require("mysql2"),
	config = require("./../../constantes");

var db = null;


exports.getDB = function(){
	return db;
};

exports.connect = function(callback){
	if(!config.sshNeed){
		db = mysql.createConnection(config.db);

		db.query("SELECT 1+1", function(err){
			if(err){
				console.error(err);
				console.log("Error connection Database")
			}else{
				console.log("Database connected");
			}
		});

		callback(db);
	}else{
	//Revisar configuracion en caso de querer conectar por SSH

		/*var ssh = new sshClient();

		ssh.connect(config.ssh);

		ssh.on("ready", function(){
			ssh.forwardOut(
				config.localhost,
				config.db.timeout,
				config.localhost,
				config.db.port,

				function (err, stream) {
					if(err) handleSSHError(err);

					config.db.stream =stream;

					db = mysql.createConnection(config.db);

					db.query("SELECT 1+1", function(err){
						if(err){
							console.error(err);
							console.log("Error connection Database")
						}else{
							console.log("Database connected");
						}
					});
					callback(db);
				})
		})*/
	}
}

function handleSSHError(error){
	console.log(err);
}