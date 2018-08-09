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
 password: 'dlwnsgk94',
 database : 'dic'
 });

con.connect();

app.listen(3000, function() {
    console.log('Connected');
});

app.get('/', function(req,res){

    res.render('header');

});

app.get('/home', function(req,res){

    var sql = 'SELECT * FROM diseases ORDER BY RAND() LIMIT 1'; //ellene

    con.query(sql, function (err, name) {
        res.render('home/home', {name: name});
    });

});

app.get('/search',function(req, res){
    var sql = 'SELECT * FROM diseases';
    con.query(sql, function(err, names, fields){
        res.render('search/search', {name:names});
    })
});

app.get(['/document/:name','/document/:name/:contents'], function(req, res){

    var name = req.params.name;
    var sql = 'SELECT * FROM diseases WHERE name = ?';

    con.query(sql, [name], function(err, name, fields){
        
        var contents = req.params.contents;
        //var sql = 'SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = diseases';
        var sql = 'SELECT * FROM types';

        con.query(sql, [name, contents], function(err, contents, fields){
            res.render('document/document', {names:name, contents:contents});
            console.log(name);
            console.log(contents);
        })

    })

})

app.get('/favorite', function(req,res){

    res.render('favorite/favorite');

});