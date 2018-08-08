// express 사용 선언
var express = require('express');
var path = require('path');
var app = express();

// ejs 사용
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
// app.use(express.static(path.join(__dirname,"public")));
//app.use(express.static('public'));
var staticResource = path.join(__dirname, '/public');
console.log(staticResource);
app.use(express.static(staticResource));
/*app.use(express.static(__dirname));*/
// app.use(express.static(__dirname + '/public/'));
//app.use('/static', express.static(__dirname + '/public'));


// mysql 연결
//var mysql = require('mysql');
//var con = mysql.createConnection({
// host: 'localhost',
// user: 'root',
// password: 'dlwnsgk94',
// database : 'dic'
// });

//con.connect();




app.listen(3000, function() {
    console.log('Connected');
});


app.get('/', function(req,res){

    res.render('header');

})

app.get('/home', function(req,res){

    res.render('home/home');

})

app.get('/search',function(req, res){

    var sql = 'SELECT * FROM info';

    res.render('search/search');

});

app.get('/favorite', function(req,res){

    res.render('favorite/favorite');

});

app.get('/document', function(req,res){

    res.render('document/document');

});