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

app.post("/", function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    
    const data = {
        members: [
            { 
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: name,
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/04ae0072e8";
    const options = {
        method: "POST",
        auth: "ali:692b919f0fe1b100db0433bc9034717b-us21"
    }
    const request = https.request(url, options, function(response){
        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        } else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    }); 
    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT|| 3000 , function(){
    console.log("Server is running on port 3000");
});

// 692b919f0fe1b100db0433bc9034717b-us21
// list id   04ae0072e8
