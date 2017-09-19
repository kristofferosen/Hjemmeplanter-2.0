var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DataPoint2Schema   = new Schema({
    area: String,
    mote: String,
    soilMoisture : String,
    soilTemperature : String,
    time : Date
});

module.exports = mongoose.model('DataPoint2', DataPoint2Schema);