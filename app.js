var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

// Vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Parseo de los resultados
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Estaticos
app.use(express.static(path.join(__dirname ,'node_modules/angular' )));
app.use(express.static(path.join(__dirname ,'node_modules/ibmiotf/dist' )));

app.use('/', routes);

// Catch
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



//Error Handler -- Errores traidos desde Watson IoT
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000, function(){
    console.log("Listos en el puerto 3000");
});
module.exports = app;


