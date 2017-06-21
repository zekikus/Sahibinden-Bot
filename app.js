/**
 * Created by Zeki on 19.06.2017.
 */
var express = require('express');
var app = express();
var cors = require('cors');
var router = require("./route");
var bodyParser = require('body-parser');


app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api',router);


app.listen(3000,function () {
   console.log("Server started on 3000");
});