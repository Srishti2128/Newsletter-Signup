// jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  console.log(firstName,lastName,email);

  const data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/aa0af52c18";

  const options = {
    method:"POST",
    auth:"Srishti2002:0e37176bae1471ac3a8f232ecd67b4c7-us14"
  };

  const request = https.request(url, options,function(response){
      if(response.statusCode===200){
        res.sendFile(__dirname + "/success.html");
      }
      else{
        res.sendFile(__dirname + "/failure.html");
      }

      response.on("data",function(data){
        console.log(JSON.parse(data));
      });

  });

request.write(jsonData);
request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
});



app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});

// api key-
//

// audience idea
 //aa0af52c18
