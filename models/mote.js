var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


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

module.exports = mongoose.model('Mote', MoteSchema);
