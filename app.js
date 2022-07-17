const express= require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { options } = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}))

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req,res){
    var fname = req.body.fname;
    var lname= req.body.lname;
    var email = req.body.email;

    var data ={ members: [
    {
    email_address: email,
    status: "subscribed",
    merge_fields: {
        FNAME: fname,
        LNAME: lname
    }
    }
    ]}

    var jsonData = JSON.stringify(data);

    console.log(fname +  " " + lname + " " + email);
 
    var options={
        url: "https://us12.api.mailchimp.com/3.0/lists/90fa8cbd60",
        method: "POST",
        headers: {
            "Authorization": "chimps 9a803c2572bd539d2ce64a8336924ec8-us12"
        },
        body: jsonData
    }

    request(options, function(error, response, body){
        if(error) {
        res.send("Error Occured, Please try again!")
        }
        else {
        if(response.statusCode===200){
            res.send("Success");
        }
        else{
            res.send(response.statusCode + "error is occured")
        }
        }
    })
})

app.listen(3000, function() {
    console.log("Server is running on port 3000");
})


//9a803c2572bd539d2ce64a8336924ec8-us12
//90fa8cbd60