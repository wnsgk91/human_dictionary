// express 사용 선언
var express = require('express');
var path = require('path');
var app = express();

// ejs 사용
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, '/public')));


// mysql 연결
var mysql = require('mysql');
var con = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: 'dlwnsgk94',
 database : 'dic'
 });

con.connect();

var sql = "SELECT name from diseases";

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

})

app.get('/home', function(req,res){

    res.render('home/home');

})




app.get('/search',function(req, res){

    var sql = 'SELECT name FROM diseases';

    con.query(sql, function(err, name, fields){

    	    res.render('search/search', {name:name});

    	})

});




app.get('/favorite', function(req,res){

    res.render('favorite/favorite');

});

app.get('/document', function(req,res){

    res.render('document/document');

});