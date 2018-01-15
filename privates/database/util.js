/**
 * Fichero con funciones utiles de la database
 *
 * Created by danihbelan on 15/01/2018.
 */
var crypto = require('crypto');

/**
 *Función que devuleve un JSON con el mensaje correspondiente a un error
 *
 * @param {number} numero  Numero de error
 * @param {object} [result]   Objeto JSON
 * @param {string} [des]      Descripcion
 * @returns {{error: *, description: *, result: *}}
 */
exports.responseJSON = function(numero, result, des){
    var salida = {
        error: numero,
        description: description(numero, des),
        result: result
    };

    if(!result){
        delete salida.result;
    }

    return salida;
};

/**
 * Dado un error genera la descripcion
 *
 * @param error Error
 * @param descripcion   Descripcion en caso de que el error sea desconocido
 * @returns {string}    Descripcion
 */
function description(error, descripcion){
	switch (error){

		//==== Generico =====
		case -1: return "Error desconocido";
		case 0 : return "Ok";
		case 1 : return "Petición mal formulada";



		//==== Usuario =====
		case 1100: return "No es un usuario";


	}

	if(descripcion){
		return descripcion;
	}else{
		return error+". Error no contemplado"
	}
}

/**
 * Pasa una cadena de texto a un Hash SHA 256 Hex
 *
 * @param text
 * @returns {*}
 */
exports.getSHA256 = function(text){
	return crypto.createHash('sha256').update(text+"").digest('hex');
};


