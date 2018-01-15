/**
 * Fichero encargado de usar el patron Facade con las rutas HTTP que llegan al servidor.
 *
 * En caso de que existan dos rutas iguales, este se resolvera segun el orden del module.exports. Por este motivo
 * la inserción de ficheros en este modulod debe ser de menos restrictivo a mas restrictivo
 *
 * Created by danihbelan on 26/12/2017.
 */

/**
 * Función encargada de cargar los archivos que contienen rutas
 *
 * @param app
 * @param settings
 */
module.exports = function(app, settings){
  require('./manage/user')(app, settings, '/m/u/');
  require('./manage/general')(app, settings, '/m/g/');
  require('./views/templates')(app, settings, '/temp');
  //require('./views/directives')(app, settings, '/directives');
  require('./views/main')(app, settings, '/');
};