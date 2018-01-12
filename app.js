'use strict'
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression')
var cors = require('cors')

var parseurl = require('parseurl');
var i18n = require("i18n");
var app = express();
var csrf = require("./inits/csrf");

require('./inits/session')(app)
var routes;

//ponemos el path base
global.appRoot = path.resolve(__dirname);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Configuramos el i18n
i18n.configure({
  locales:['en', 'es'],
  defaultLocale: 'es',
  directory: __dirname + '/privates/locales'
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/images/favicon16.ico'));


if (process.env.NODE_ENV !== 'test') {
  app.use(logger('[:date[web]] :method :status - :url :response-time ms - :res[content-length]',
    {
      skip: function (req, res) {
        return res.statusCode < 400 && res.statusCode != 200;
      }
    })
  );
}

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init);

// Toda peticion pasara por aqui
app.use(function (req, res, next) {
  if(req.path.indexOf(".php")>=0){
    res.statusCode = 302;
    res.setHeader("Location", '/index');
    res.end()
    return;
  }

  if (!req.session.views) {
    req.session.views = {};
    req.session.user = {};
    req.session.internal = {};
  }

  // get the url pathname
  var pathname = parseurl(req).pathname;
  // guardamos la ultima url que llamo
  req.session.lastURL = pathname;
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;

  next()
});

//Indicamos que con la cabecera x-no-compression no comprimimos
app.use(compression(
  {
    filter: function(req,res){
      if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false
      }

      // fallback to standard filter function
      return compression.filter(req, res)
    }
  }
))

// Hacemos nuestra base de datos accesible por los siguientes enrutamientos
// Ahora, cualquier peticion HTTP tiene acceso al objeto db
routes = require('./routes')(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
