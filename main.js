// express 사용 선언
var express = require('express');
var path = require('path');
var app = express();

// ejs 사용
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var staticResource = path.join(__dirname, '/public');
console.log(staticResource);
app.use(express.static(staticResource));


// mysql 연결
var mysql = require('mysql');
var con = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: '1648',//ellene
 database : 'dic'
 });

con.connect();

var sql = "SELECT name from disease";//ellene

con.query(sql, function(err, rows, fields){
	if(err){
		console.log(err);
	}else{
		for(var i = 0 ; i < rows.length ; i++){
			console.log(rows[i].name);
		}
	}
})


app.listen(3000, function() {
    console.log('Connected');
});

app.get('/', function(req,res){

    res.render('header');

});

app.get('/home', function(req,res){

    res.render('home/home');

});

app.get('/search',function(req, res) {

    var sql = 'SELECT * FROM diseases';

});

app.get('/search',function(req, res){

    var sql = 'SELECT name FROM disease';//ellene

    con.query(sql, function(err, name, fields) {

        res.render('search/search', {name: name});
    });

    con.query(sql, function(err, names, fields){
        res.render('search/search', {name:names});
        console.log(names);
    });

});

app.get('/favorite', function(req,res){

    res.render('favorite/favorite');

});

app.get('/document/:name', function(req,res){

    var name = req.params.name;
    var sql = 'SELECT * FROM diseases WHERE name = ?';

    con.query(sql, function(err, names, fields){
         res.render('document/document',{names:name});
         console.log(names);
         console.log(name.symptom);
    })

});