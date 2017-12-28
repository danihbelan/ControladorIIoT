/**
 * Created by danihbelan on 26/12/2017.
 */

//-------------------------------
//      Typos de JSON
//--------------------------------

/**
 *
 * @typedef {Object} Indicator
 * @property {number} idIndicator
 * @property {number} idCompetence - Competencia a la que pertecene
 * @property {string} name - Titulo del indicador
 * @property {string} description - Descripcion del indicador
 */

/**
 *
 * @typedef {Object} Rol
 * @property {!number} idRol
 * @property {?string} name - Competencia a la que pertecene
 */

/**
 *
 * @typedef {Object} User
 * @property {number} idUser
 * @property {string} name
 * @property {string} last_name_1
 * @property {string} last_name_2
 * @property {string} dni
 * @property {number} current_rol
 * @property {string} mail
 * @property {string} password
 * @property {?string} reduced
 * @property {string} profile_avatar
 * @property {string} phone
 */


var default_HTTP = {timeout : 10000};

//Milisegundos que espera la web para mostrar el dialog de carga. Evita pestañeos
var timeoutShowLoading = 400;


var colorWhite = [
	"f44336", //red
	"e91e63", // pink
	"9c27b0", // purple
	"673ab7", // deep purple
	"3f51b5", // indigo
	"2196f3", // blue
	"009688", // teal
	"ff5722", // deep orange
	"795548", // brown
	"607d8d" //blue grey
];
var colorBlack = [
	"03a9f4", //light blue
	"90caf9", //cyan
	"4caf50", //green
	//"8bc34a", //green light
	//"cddc39", //lime
	"ffeb3b", //yellow
	"ffc107", //amber
	"ff9800" //orange
];

String.prototype.hashCode = function(){
	var hash = 0, i, chr, len;
	if (this.length === 0)
		return hash;

	for(i=0, len=this.length; i<len; i++){
		chr = this.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0;
	}

	return hash;
}

/**
 * Obtiene un color y background en funcion a un numero
 * @param number
 * @returns {*}
 */
function getColor(number) {
	number = number<0 ? -number : number;
	var position = number % (colorWhite.length + colorBlack.length);
	if (position < colorWhite.length) {
		return {
			color: "#ffffff",
			background: "#" + colorWhite[position]
		}
	} else {
		return {
			color: "#212121",
			background: "#" + colorBlack[position % colorBlack.length]
		}
	}
}

//-------------------------------
//      Funciones complejas
//(Necesitan recursos de AngularJS)
//--------------------------------
/**
 * Crea un dialog realizando una llamada GET para obtener el modal.
 *
 * Para ello en el campo de input se debera poner un atributo templateURL donde se obtendra el modal
 *
 * @param $q        Objeto de AngularJS para promises
 * @param $http     Objeto de AngularJS para poder realizar llamadas asincronas
 * @param $mdDialog Objeto de ngMaterial necesario para crear el dialog
 * @param input Opciones posibles recogidas en https://material.angularjs.org/latest/api/service/$mdDialog
 *              Valor necesario templateURL
 *              {
 *                  error:  0 correcto
 *                          -1 se ha cancelado la ventana
 *                          -2 cualquier otro error
 *                  description: informacion sobre lo ocurrido
 *                  result: Informacion devuelta por el modal
 *              }
 *
 */
function show_dialog($q, $http, $mdDialog, input){
	var deferred = $q.defer();

	$http({
		method: 'GET',
		url: input.templateURL
	}).then(function successCallback(response) {
		delete input.templateURL;

		input.template = response.data;
		$mdDialog.show(input)
			.then(function(answer) {
					// Si ha salido correctamente
					deferred.resolve(answer);
				}, function() {
					deferred.reject(null, "Canceled")
				}
			);

	}, function errorCallback(response) {
		deferred.reject(-1, response)
	});

	return deferred.promise;
}

//-------------------------------
//     Funciones generales
//--------------------------------


/**
 * Dialogs templates
 */
function dialog_error_desconocido(errStatus, callback){
	switch (errStatus){
		case 404:
			dialog_error("404", "Petición no admitida",callback);
			break;

		case 403:
			dialog_error("Sesion caducada", "Refresque la página",callback);
			break;

		default:
			dialog_error("Error", "Intentelo de nuevo. Si el error sigue, contacte con administración",callback)
	}
}
function dialog_error_bd(callback){dialog_error("Error", "Se ha producido un error en la base de datos. Contacte con administración",callback)}
function dialog_success_modificacion(callback){dialog_success("Correcto", "Registros actualizados correctamente",callback)}

//Variable que determina los parametros de las conexiones
var default_HTTP = {timeout : 10000};
var userLogued;

/**
 * Dialog de success
 * @param title
 * @param text
 */
function dialog_success(title, text, callback){
	swal({title:title,
		text:text || "",
		type:"success",
		animation : false
	}, function(isConfirm){
		if(callback){
			callback(isConfirm);
		}

	});
}

/**
 * Cierra cualquier dialog que se encuentre activo
 */
function dialog_close(){
	swal.close();
}

function dialog_confirm_delete(title, text, success, fail) {
	swal({
			title: title,
			text: text,
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Si, eliminar",
			cancelButtonText: "No",
			closeOnConfirm: true,
			closeOnCancel: true
		},
		function (isConfirm) {
			if (isConfirm) {
				if(!success){
					dialog_close();
				}else{
					success();
				}
			} else {
				if(!fail){
					dialog_close();
				}else{
					fail();
				}
			}
		});
}


/**
 * Dialog de error
 *
 * @param title
 * @param text
 * @param callback
 */
function dialog_error(title, text, callback){
	swal({title:title,
		text:text || "",
		type:"error",
		animation : false
	}, function(isConfirm){
		if(callback)
			callback(isConfirm);
	});
}

/**
 * Dialog de error
 *
 * @param number
 * @param text
 */
function dialog_errorNumber(number, text, callback){
	dialog_error("Error "+number, text, callback);
}

/**
 * Dialog de error
 *
 * @param response
 * @param callback
 */
function dialog_errorResponse(response, callback){
	dialog_error("Error "+response.error, response.description, callback);
}

/**
 * Crea un dialog de cargando
 *
 * @param texto texto del dialog
 */
function loading(texto){
	swal({title:texto,
		animation:false,
		imageUrl:"/artwork/loading.svg",
		showConfirmButton:false,
		allowOutsideClick:false}
	);
}

/**
 * Devuelve un array de objetos que coinciden con la query.
 *
 * La funcion ordenara los objetos del container en cuya property aparezca el text en orden de aparicion de este
 * text.
 * No modifica el array origen.
 *
 * @param container Array que contiene el total de los objetos JSON
 * @param property  Atributo de los objetos JSON por el que se quiere ordenar
 * @param query     Texto que debe aparecer en el orden. Si este es '', se ordenara alfabeticamente
 */
function sortQueryAutocomplete(container, property, query){
	var array = [], index;
	var ascent = true;
	var item;
	var propiedad = clone(property);
	var isNumber;

	if(propiedad[0] === "-") {
		propiedad = propiedad.substr(1);
		ascent = false;
	}

	if(container.length == 0){
		return container;
	}

	isNumber = !isNaN(container[0][propiedad]);

	query = stripAccents(query.toLowerCase());
	for (var i = 0; i < container.length; i++) {
		item = clone(container[i]);

		if (!isNumber) {
			item.cleaned = stripAccents(item[propiedad].replace(/ /g,"").toLowerCase());
			index = item.cleaned.indexOf(query);
		} else {
			index = container[i][propiedad];
		}

		if (index != -1) {
			item.index = index;
			array.push(item);
		}
	}

	array.sort(dynamicSort(ascent ? "index" : "-index"));



	return array;
}

//-------------------------------
//     Funciones basicas
//--------------------------------

/**
 * Ordena el conjunto total de los datos
 *
 * @param container Array con los datos a ordenar
 * @param property  Atributo (property) JSON por el que ordenar.
 *                      property = ascendente
 *                      -property = descendente
 *
 * @returns {Array|*}
 */
function orderAlphabetic(container, property) {
	/*
	 TODO Ordenar en varios niveles.
	 Property puede valer subject.name; lo que significa que hay que ordenar el array dentro por un objeto dentro
	 de un objeto del array.
	 */
	var array = clone(container);
	var item, isNumber;
	var ascent = true;
	var propiedad = clone(property);
	var properSort = property;

	if(container.length == 0) {
		return container;
	}

	if(propiedad[0] === "-") {
		propiedad = propiedad.substr(1);
		ascent = false;
	}

	isNumber = !isNaN(container[0][propiedad]);
	if(!isNumber){
		properSort = ascent ? "cleaned" : "-cleaned";

		for (var i = 0; i < array.length; i++) {
			array[i].cleaned = stripAccents(array[i][propiedad].replace(/ /g,"").toLowerCase());
		}
	}

	array.sort(dynamicSort(properSort));
	return array;
}

/**
 * Busca un objeto JSON dentro de un array por una propiedad
 *
 * @param {Array} array - Array contenedor
 * @param {string} property - Propiedad a buscar en el JSON
 * @param {string|number}query - Valor que tiene que dar la propiedadr
 * @returns {?object}
 */
function findByProperty(array, property, query){
	for(var i =0; i<array.length; i++){
		if(array[i][property] == query){
			return array[i];
		}
	}
	return null;
}

/**
 * Busca un objeto JSON dentro de un array por una propiedad y lo remplaza
 *
 * @param {Array} array - Array contenedor
 * @param {string} property - Propiedad a buscar en el JSON
 * @param {string|number} query - Valor que tiene que dar la propiedad
 * @param {?object} reemplace - Valor a reemplazar
 * @returns {boolean}	Si se ha reemplazado o no
 */
function findAndReplaceByProperty(array, property, query, reemplace){
	for(var i =0; i<array.length; i++){
		if(array[i][property] == query){
			if(reemplace){
				array[i] = reemplace;
				return true;
			}
		}
	}
	return false;
}

function zoomImage($q, $http, $mdDialog, picture){
	//TODO la variable $q aqui no es necesaria
	show_dialog($q, $http, $mdDialog, {
		templateURL: '/dialog/general/modal/zoomImage',
		parent: angular.element(document.body),
		controller : 'generalModalZoomImage',
		clickOutsideToClose:true,
		locals: {
			urlImage : "/photo/user/"+picture+".jpg"
		}
	});
}

/**
 * Busca un objeto JSON dentro de un array por una propiedad y lo elimina
 *
 * @param {Array} array - Array contenedor
 * @param {string} property - Propiedad a buscar en el JSON
 * @param {string|number} query - Valor que tiene que dar la propiedad
 * @returns {boolean}
 */
function findAndDeleteByProperty(array, property, query){
	for(var i =0; i<array.length; i++){
		if(array[i][property] == query){
			array.splice(i, 1);
			return true;
		}
	}
	return false;
}

/**
 * Devuelve una cadena de texto con los acentos bajados y espacios quitados
 *
 * @param {string} text - texto a limpiar
 * @returns {string}
 */
function clearText(text){
	return stripAccents(text.replace(/ /g,"").toLowerCase());
}

/**
 * Baja las tildes en una palabra
 *
 * @param strAccents    Acentos a bajar
 * @returns
 */
function stripAccents(strAccents) {
	var strAccents = strAccents.split('');
	var strAccentsOut = [];
	var strAccentsLen = strAccents.length;
	var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
	var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
	for (var y = 0; y < strAccentsLen; y++) {
		if (accents.indexOf(strAccents[y]) != -1) {
			strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
		} else
			strAccentsOut[y] = strAccents[y];
	}
	strAccentsOut = strAccentsOut.join('');
	return strAccentsOut;
}

/**
 * Clona cualquier objeto JSON
 * @param json  Objeto origen
 * @return Objeto clonado
 */
function clone(json) {
	return JSON.parse(JSON.stringify(json));
}

/**
 * Ordena un array de objetos json por un atributo
 *
 * @param property  Atributo de los objetos por el que ordenar
 * @returns Array ordenador
 */
function dynamicSort(property) {
	var sortOrder = 1;
	if(property[0] === "-") {
		sortOrder = -1;
		property = property.substr(1);
	}

	return function (a,b) {
		var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		return result * sortOrder;
	}
}

/**
 * Devuelve un objeto JSON
 * @param numero    nº del error
 * @param des       Descripcion del error
 * @param result    Resultados
 * @returns {{error: *, description: *, result: *}}
 */
function errorJSON(numero, des, result){
	var salida = {
		error: numero,
		description: des,
		result: result
	};

	if(!result){
		delete salida.result;
	}

	return salida;
}

function CtrlTableData($filter, array, options) {
	var output = {
		// Items que se muestran actualmente
		arrayFiltered: array,
		// Items que se muestran actualmente
		arrayDisplay: array,
		// Conjunto total de items
		arrayTotal: array,
		// Opciones para cambiar el limite
		limitOptions: [10, 20, 50],
		// Limite actual de las rows maximas que se muestras
		limit: 10,
		// Pagina que se esta mostrando
		page: 1,
		// Orden por el que se ordenan las rows
		order: "",
		// Array con los menus de cada fila
		actionMenu: [],
		// Sensible la busqueda a los acentos
		accentsSensitive: false,
		// Sensible la busqueda a mayuscula y minuscula
		caseSensitive: false,
		canSelectRow: true,
		// Deja el item seleccionado en la primera fila
		selectionInFirst : false,
		//Selecciona la primera fila si no hay ninguna seleccion
		autoselect : true
	};

	// Hace un filtro en las filas en funcion al campo de busqueda y parametros de limites
	output.filterDisplay = function (text) {
		var newArray = $filter('filter')(output.arrayTotal, text || output.searchText ||  "", comparadorFilter);
		output.arrayFiltered = $filter('orderBy')(newArray, output.order)||[];
		output.arrayDisplay = $filter('limitTo')(output.arrayFiltered, output.limit, (output.page - 1) * output.limit)|| [];

		//Si tenemos algun item seleccionado lo dejamos arriba
		if(output.rowSelected && output.selectionInFirst){
			var pos = -1;
			for(var i=0; i<output.arrayDisplay.length; i++){
				if(output.arrayDisplay[i].id == output.rowSelected.id){
					pos = i;
					break;
				}
			}
			if(pos >= 0){
				output.arrayDisplay.splice(pos,1)
			}

			output.arrayDisplay.unshift(output.rowSelected);

		}else if(output.arrayDisplay.length && output.autoselect){
			if(!output.rowSelected){
				output.clickRow(output.arrayDisplay[0])
			}
		}
	};

	output.onOrder = function (order) {
		output.order = order;
		output.arrayFiltered = $filter('orderBy')(output.arrayTotal, output.order);
		output.arrayDisplay = $filter('limitTo')(output.arrayFiltered, output.limit, (output.page - 1) * output.limit);
	};

	// Sustituimos las variables del argumento por las del controlador
	for (var i = 1; i < arguments.length; i++) {
		for (var key in arguments[i]) {
			if (arguments[i].hasOwnProperty(key) && output.hasOwnProperty(key)) {
				output[key] = arguments[i][key];
			}
		}
	}

	// Se activa cuando se selecciona una row
	output.clickRow = function (item) {
		if(!output.listenRowSelected) return;

		if(output.rowSelected){
			output.rowSelected.isSelected = false;
		}

		output.rowSelected = item;
		output.rowSelected.isSelected = true;
		output.listenRowSelected(item);

	};

	// Inicializamos el controlador
	output.filterDisplay();

	return output;

	function comparadorFilter(actual, expected) {
		if(!expected){
			return true;
		}

		actual = (actual+"").trim();
		expected = (expected+"").trim();

		// Si ya lo contiene no hacemos ninguna otra comprobacion
		if(actual.indexOf(expected) != -1){
			return true
		}

		// Si aun no lo contiene aplicamos el metodo de caso sensitivo
		if (!output.caseSensitive) {
			actual = actual.toLowerCase();
			expected = expected.toLowerCase();
		}

		if(actual.indexOf(expected) != -1){
			return true
		}

		// Sino lo contiene aplicamos el metodo de reduccion de acentos
		if (!output.accentsSensitive) {
			actual = removeAccent(actual);
			expected = removeAccent(expected);
		}

		return actual.indexOf(expected) != -1;
	}
}


function removeAccent(source) {
	var accent = [
			/[\300-\306]/g, /[\340-\346]/g, // A, a
			/[\310-\313]/g, /[\350-\353]/g, // E, e
			/[\314-\317]/g, /[\354-\357]/g, // I, i
			/[\322-\330]/g, /[\362-\370]/g, // O, o
			/[\331-\334]/g, /[\371-\374]/g, // U, u
			/[\321]/g, /[\361]/g, // N, n
			/[\307]/g, /[\347]/g, // C, c
		],
		noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];

	for (var i = 0; i < accent.length; i++){
		source = source.replace(accent[i], noaccent[i]);
	}

	return source;
}

/**
 * Dado un array de objetos y el atributo a comparar se devuelve los que son ocurrentes con el texto
 * que busca
 *
 * @param {string}text		Texto a buscar
 * @param {object[]}array	Array de objetos donde buscar
 * @param {string}property	Porpiedad de los objetos del array donde buscar
 * @returns {object[]}		Array con las ocurrencias
 */
function findOcurrences(text, array, property){
	var result = [];
	var search = removeAccent(text.toLowerCase());
	var name;
	for(var i=0; i<array.length; i++){
		name = removeAccent(array[i][property].toLowerCase());
		if(name.indexOf(search) != -1){
			result.push(array[i])
		}
	}

	return result;
};

function countProperties(obj){
	var  i=0 ;
	for(var key in obj){
		if(obj.hasOwnProperty(key)){
			i++
		}
	}

	return i;
}

function iterProperties(obj, iteratee){
	for(var key in obj){
		if(obj.hasOwnProperty(key)){
			iteratee(obj[key], key)
		}
	}
}

/**
 * Crear Date desde un string
 * @param text
 * @returns {*}
 */
Date.fromString = function(text){
	if(!text){
		return null;
	}

	// Split timestamp into [ Y, M, D, h, m, s ]
	text = text.replace(/[A-Za-z]/g, " ")
	var t = text.split(/[- ://]/);
	t[3] = t[3]  || '0';
	t[4] = t[4]  || '0';
	t[5] = t[5]  || '0';

// Apply each element to the Date function
	return new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
};

function dateToDatetimeFormat(date){
	return moment(date).format("YYYY-MM-DD HH:mm:ss")
}


function loadingDelay(timeout, promised, text){
	//console.log(text+" " +promised.$$state.status)
	// evitamos el pestañeo
	timeout(function(){
		//console.log(text+" " +promised.$$state.status)
		if(promised.$$state.status <= 0){
			loading(text);
		}
	}, timeoutShowLoading)
}

function clean(text){
	return removeAccent(text.replace(/\s+/g, "").toLowerCase());
}

function saveLocation(scope, view) {
	if (scope.user.views) {
		if (scope.user.views.length== 0 || scope.user.views[scope.user.views.length-1]!=view){
			scope.user.views.push(view);
		}
	}
}

function lastPage(scope, location, window){
	try{
		scope.user.views.pop();//quitamos la actual
		var last = scope.user.views.pop() || "";
		if(last == ""){
			window.location.href ="/index";
		}else{
			location.path(last);
		}
		return last;
	}catch (e){
		window.location.href ="/index";
	}
}
