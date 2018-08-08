// express 사용 선언
var express = require('express');
var path = require('path');
var app = express();

//jade 사용
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname,'./public')));

//정리 이쁘게
app.locals.pretty = true;

  app.listen(3000, function() {
    console.log('Connected');
  });


  app.get('/', function(req,res){

    res.render('index.html');

  })

  app.get('/home', function(req,res){

    res.render('home/home.html');
    
  })

  app.get('/search',function(req, res){

    res.render('search/search.html');

  });

  app.get('/favorite', function(req,res){

    res.render('favorite/favorite.html');

  });

  app.get('/document', function(req,res){

    res.render('document/document.html');

  });


  // 변수
  var history_list = [];

  // 검색버튼 눌렀을 때 호출되는 함수
  function search_history(){

    alert(history_list);
    var a = history_list.length+1;

    localStorage.setItem('search'+a,document.getElementById('search').value);
    
    history_list.push(localStorage.getItem('search'+a));

    alert(history_list);

  }

    var arr = new Array();
    var i =0;

      function searching(){

        alert(arr);

        arr.push(i);
        i++;

    }