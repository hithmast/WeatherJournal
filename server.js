// APIKEY = bfcfb9ccdaa6b44e1a992a26c9e25629
// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 8000;

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
// CORS for Cross Origin Policy
const cors = require('cors');
// Start up an instance of app
const app = express();


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const server = app.listen(port, ()=>{
    console.log('Server Running');
    console.log(`http://localhost:${port}`);
});





app.get('/projectData',sendData);
// ----- Functions -----
//GET Route
function sendData (req,res){ 
    res.send(projectData);
    projectData =[];
}
app.post('/projectData',Dateinput);

// POST Route
function Dateinput(req,res) {
    console.log(req.body);
    let _Celsius = (req.body.temp) / 33.8 ;
    projectData = {
        date:req.body.date,
        temp:req.body.temp + '_Fehrenheit_' + Math.trunc(_Celsius) +'_Celsius',
        content:req.body.content
    }
    //console.log(projectData);
    res.status(200).send({
        success:true,
        message: 'Data Transfred Sussesfully ',
        data:projectData
    });
}