/**
 * Archivo con las constantes necesarias para el servicio web
 *
 * Created by danihbelan on 26/12/2017.
 */

// Puerto de web
//exports.serverPort = '8084';
//exports.serverPortHTTPs = '4443';
exports.hideHTTPsPort = true; // Por si el 443 esta redirigido a nuestro puerto https
exports.keySSL = './privates/SSL/selfsigned.key';
exports.certSSL = './privates/SSL/selfsigned.cert';

//Indicamos si queremos conectar por ssh
exports.sshNeed = false;

// //Variables del SSH (Ignorado si sshConnection = false)
// exports.ssh = {
//         port : 2203,
//         host : 'time.ugr.es', // mysql server host
//         username : 'user',
//         password : 'medicinaCajal',
// };
//
exports.db = {
        host: 'localhost',
        user : 'root',
        password : 'toor',
        database : 'softPLC', // Uno que tengamos libre en nuestra maquina
        connectionLimit : 10,
        timeout: 24000,
		multipleStatements: true
};

exports.dbSession = {
        host: "localhost",
        port: 6379
};

exports.sessionDB = true;



//
// exports.localhost = "127.0.0.1";
// exports.urlRecovery = "https://localhost:443/recovery/";
// exports.urlHome = "https://localhost:8084/";




