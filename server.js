var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');
var fs = require('fs');

// Configure MySQL connection
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	//password: 'dlwnsgk94',
  password: '1648',
	database: 'dic'
});

//Establish MySQL connection
connection.connect(function(err) {
  if (err)
    throw err;
  else {
     console.log('Connected to MySQL');
     // Start the app when connection is ready
     app.listen(3000);
     console.log('Server listening on port 3000');
  }
});

function isEmptyEl(array, i) {
   return !(array[i]);
}

app.get('/', function(req, res) {
  values = [];

  // String 형식으로 받음.
  var jsondata = fs.readFileSync("./test.json", 'utf8');
  var modified = JSON.parse(jsondata.trim());

  for (var i = 0; i <= Object.keys(modified.diseases).length-1; i++) {
    if (modified.diseases[i].Supervision === undefined ) {
      modified.diseases[i].Supervision = "해당내용 없습니다.";
      console.log(modified.diseases[i].Supervision);
      values.push([modified.diseases[i].name, modified.diseases[i].GeneralDiscussion,modified.diseases[i].Symptoms,modified.diseases[i].Causes,modified.diseases[i].Diagnosis,modified.diseases[i].Treatment,modified.diseases[i].BibliographySite,modified.diseases[i].Etc,modified.diseases[i].Hospital, modified.diseases[i].Supervision]);
    } else {
    console.log(modified.diseases[i].Supervision);
    values.push([modified.diseases[i].name, modified.diseases[i].GeneralDiscussion,modified.diseases[i].Symptoms,modified.diseases[i].Causes,modified.diseases[i].Diagnosis,modified.diseases[i].Treatment,modified.diseases[i].BibliographySite,modified.diseases[i].Etc,modified.diseases[i].Hospital, modified.diseases[i].Supervision]);
    }
  }

  // MySQL insert query
  connection.query('INSERT INTO diseases (name, sum, symptom, cause, diagnosis, treat, site, etc, institution, supervisor) VALUES ?', [values], function(err,result) {
    if(err) {
      console.log(err.toString());
    } else {
      console.log("Success");
    }
    });
});
