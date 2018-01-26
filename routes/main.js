var express = require('express');
var route = express.Router();


/**
 * Constructor de modulo
 *
 * @param app   Aplicacion NodeJS
 * @param settings  Configuracion
 * @param root  Path al que atendera este archivo
 */
module.exports = function(app, settings, root){
  app.use(root,route);
};


route.get('/', function(req, res, next) {
  res.sendFile(req.app.get("admin_path")+"auth.html");
  console.log(req.path);
});

route.get('/admin', function(req, res, next) {
  res.sendFile(req.app.get("admin_path")+"index.html");
  console.log(req.path);
});

route.get('/authSignIn', function(req, res, next) {
  res.sendFile(req.app.get("admin_path")+"index.html");
  console.log(req.path);
});

