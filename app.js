const express = require("express");
const https = require("https");
const request = require("request");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});


