var path = require('path');
var express=require("express"); 
var bodyParser=require("body-parser"); 
var hosmodel = require('./js/hospital_model.js');
const URI = process.env.ATLAS_MONGODB;
const PORT = process.env.PORT || 5000

const mongoose = require('mongoose'); 
mongoose.connect(URI);
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 

}) 
  
var app=express() 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname));

  
app.post('/insert_hospital', function(req,res){ 
    // var hschema = new mongoose.Schema({
    //      hospitalName:  String,
    //      city: String,
    //      staffedBeds: Number,
    //      totalDischarges: Number,
    //      patientDays: Number,
    //      grossPateientRevenue: Number,
    //      state: String,
    //      lat: Number,
    //      long: Number,
    //      address: String,
    //      phoneNumber: String,
    //      website: String,
    //      hoursInText: String,
    //      mondayHours: String,
    //      tuesdayHours: String,
    //      wednesdayHours: String,
    //      thursdayHours: String,
    //      fridayHours: String,
    //      saturdayHours: String,
    //      sundayHours: String,
    // });

    // var hosmodel = mongoose.model('hospitals', hschema);
    var hospital = new hosmodel({
        hospitalName : req.body.hospitalName,
        city : req.body.city,
        staffedBeds : req.body.staffedBeds,
        totalDischarges : req.body.totalDischarges,
        patientDays : req.body.patientDays,
        grossPateientRevenue : req.body.grossPateientRevenue,
        state : req.body.state,
        lat : req.body.lat,
        long : req.body.long,
        address : req.body.address,
        phoneNumber : req.body.phoneNumber,
        website : req.body.websit,
        hoursInText : req.body.hoursInText,
        mondayHours : req.body.mondayHours,
        tuesdayHours : req.body.tuesdayHours,
        wednesdayHours : req.body.wednesdayHours,
        thursdayHours : req.body.thursdayHours,
        fridayHours : req.body.fridayHours,
        saturdayHours : req.body.saturdayHours,
        sundayHours : req.body.sundayHours,
    });

    hospital.save(function(err, hos){ 
        if (err) throw err; 
        console.log("Record inserted Successfully");             
    }); 
            
    return res.redirect('index.html');
}) 

app.listen(PORT, function(){
    console.log("server listening at port" + PORT); 
})
