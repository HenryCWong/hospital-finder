var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hschema = new Schema({
    hospitalName:  String,
    city: String,
    staffedBeds: Number,
    totalDischarges: Number,
    patientDays: Number,
    grossPateientRevenue: Number,
    state: String,
    lat: Number,
    long: Number,
    address: String,
    phoneNumber: String,
    website: String,
    hoursInText: String,
    mondayHours: String,
    tuesdayHours: String,
    wednesdayHours: String,
    thursdayHours: String,
    fridayHours: String,
    saturdayHours: String,
    sundayHours: String,
});
module.exports = mongoose.model('hospitals', hschema);