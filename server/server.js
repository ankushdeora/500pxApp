var express = require('express');
var bodyParser =require('body-parser');
var cors = require('cors');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());
//Initialize app
let initApp = require('./api/app');
initApp(app);

let port = 3000;
app.listen(port);
console.log('API server started on: ' + port);