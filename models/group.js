var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Mote = require('./mote');

var DataPoint2Schema   = new Schema({
    group: String,
    mote: String,
    soilMoisture : String,
    soilTemperature : String,
    time : Date
});

var MoteSchema   = new Schema({
	datapoints: [DataPoint2Schema],
    moteNr: String
});

var Groupschema  = new Schema({
	motes: [MoteSchema],
	groupNr: String
});

module.exports = mongoose.model('Group', Groupschema);
