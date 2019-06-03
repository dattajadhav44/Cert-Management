const express = require('express');
var txn = require("./app/transaction.js")
var deploy = require("./app/deployContract.js")

const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies

app.get('/', function(req, res){
    res.send("------------------------------------Welcome to Kalyan jewellers----------------------------------")
})

app.post('/deploy',async function (req, res) {
    console.log("---------------------------------Deploy POContract API Started--------------------------------",req.body)
    const result = await deploy.deployContract(req.body.arguments);
        console.log("Result:",result)     
        res.send(result)
    console.log("---------------------------------Deploy POContract API END------------------------------------",result)
})

app.post('/contractFunction', function (req, res) {
    console.log("---------------------------------Contract Function  API Started-------------------------------",req.body)
        const result = txn.contractFunction(req.body.arguments).then(function(result,error){
           console.log("Result:", result)
           res.send(result)       
        });
    console.log("---------------------------------Contract Function  API END-----------------------------------",result)
});


app.listen(4949, () => console.log('The Certificate management app is listening on port 4949!'))