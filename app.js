const express = require("express");
const bodyParser = require("body-parser");
const requesr = require("request");
const favicon = require("serve-favicon");
const path = require("path");
const https = require("https");

// api 0c6b5a86693f57b0b7556fd0e5ed7147-us12
// list id b98bad86ca

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.post("/", function(req, res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  // console.log(firstName, lastName, email);
  const data = {
    members: [
      {
        email_address : email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = 'https://us12.api.mailchimp.com/3.0/lists/b98bad86ca';

  const options = {
    method : "POST",
    auth : "hritik1:0c6b5a86693f57b0b7556fd0e5ed7147-us12"
  }

  const request = https.request(url, options, function(response){

    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }


    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});


app.get("/" , function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.POR || 3000 , function(){
  console.log("Server running on port 3000");
})
