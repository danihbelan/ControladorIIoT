var express = require('express');
var route = express.Router();
var serviceToken = require('../../privates/utils/serviceToken');
var query = require('../../privates/database/subsistems/general')
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

route.get('/authSignIn', function(req, res, next) {
  res.sendFile(req.app.get("admin_path")+"index.html");
  console.log(req.path);
});

route.get('/admin', function(req, res, next) {
  res.sendFile(req.app.get("admin_path")+"index.html");
  console.log(req.path);
});


route.post('/loginForm', function(req, res, next) {
    var mail = req.body.mail;
    var password = req.body.password;

    var datosLogin = {
        mail : mail,
        password : password
    }

    query.login(datosLogin,function(err,resultados){

        if(err){
            console.log(err);
        }
        else {
            var token = {token:serviceToken.createToken(resultados[0])}
            res.status(200).json(token)
        }
    })
});
