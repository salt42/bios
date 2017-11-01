/**
 * Created by salt on 28.10.2017.
 */
"use strict";
var config = require('./config');
var log = require('./log')("express");
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-hbs');

var app = express();

// view engine setup
app.engine('hbs', hbs.express4({
    // partialsDir: __dirname + '../views/partials', //{String/Array} [Required] Path to partials templates, one or several directories

    // // OPTIONAL settings
    // blockHelperName: "{String} Override 'block' helper name.",
    // contentHelperName: "{String} Override 'contentFor' helper name.",
    defaultLayout: path.join(__dirname, '../views/layout.hbs'),//{String} Absolute path to default layout template
    // extname: "{String} Extension for templates & partials, defaults to `.hbs`",
    // handlebars: "{Module} Use external handlebars instead of express-hbs dependency",
    // i18n: "{Object} i18n object",
    // layoutsDir: "{String} Path to layout templates",
    // templateOptions: "{Object} options to pass to template()",
    // beautify: "{Boolean} whether to pretty print HTML, see github.com/einars/js-beautify .jsbeautifyrc,
    //
    // // override the default compile
    // onCompile: function(exhbs, source, filename) {
    //     var options;
    //     if (filename && filename.indexOf('partials') > -1) {
    //         options = {preventIndent: true};
    //     }
    //     return exhbs.handlebars.compile(source, options);
    // }
}));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');
hbs.express4({
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));


// ****************** routes *************************

var indexRoutes = require('./routes/index');
var petRoutes = require('./routes/pet');
// var usersRoute = require('./routes/users');
// var dataRoute = require('./routes/data');

app.use('/', indexRoutes);
app.use(function(req, res, next) {
    //@todo check if user is logged in
    next();
});
app.use('/pet', petRoutes);

// app.use('/users', usersRoute);
// app.use('/data', dataRoute);

// ***************************************************


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

app.listen(config.httpPort, function () {
    log('HTTP'.magenta + ' listening on port ' + config.httpPort.toString().magenta);
});
