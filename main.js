// express 사용 선언
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

// ejs 사용
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var staticResource = path.join(__dirname, '/public');
app.use(express.static(staticResource));
app.use(bodyParser.urlencoded({ extended: false }));

// mysql 연결
var mysql = require('mysql');
var con = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: 'dlwnsgk94',//joon
 //password: '1648', //ellene
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

    var sql = 'SELECT * FROM diseases ORDER BY RAND() LIMIT 1';

    con.query(sql, function (err, name) {
        res.render('home/home', {name: name});
    });

});

app.post('/home', function(req,res){

    var keyword = req.body.keyword;

    var sql = "SELECT * FROM diseases WHERE name LIKE '%"+keyword+"%'"; // 수정필요

    con.query(sql, [keyword], function(err, names, fields){
        res.redirect('/search/'+keyword);
    })

});

app.post('/search',function(req, res){

    var keyword = req.body.keyword;

    var sql = "SELECT * FROM diseases WHERE name LIKE '%"+keyword+"%'"; // 수정필요

    con.query(sql, [keyword], function(err, names, fields){
        res.redirect('/search/'+keyword);
    })

});

app.get(['/search','/search/:keyword'], function(req, res){

    var sql = 'SELECT * FROM diseases'; // joon

    con.query(sql, function(err, names, fields){
        

            var keyword = req.params.keyword;
            
            if(keyword){

            var sql = "SELECT * FROM diseases WHERE name LIKE '%"+keyword+"%'";// 수정필요

            con.query(sql, [keyword], function(err, names, fields){
                res.render('search/search', {name: names});
                console.log(names);
            })
            }else{
       
          res.render('search/search', {name: names});

        }
    })

})


app.get('/document/:name', function(req, res){

    var name = req.params.name;
    var sql = 'SELECT * FROM diseases WHERE name = ?';

    con.query(sql, [name], function(err, name, fields){
        res.render('document/document', {names:name});
    })
})


app.get('/favorite', function(req,res){

    res.render('favorite/favorite');

});