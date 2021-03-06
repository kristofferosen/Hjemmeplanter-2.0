var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DataPointSchema   = new Schema({
    area: String,
    mote: String,
    soilMoisture : String,
    soilTemperature : String,
    time : Date
});

module.exports = mongoose.model('DataPoint', DataPointSchema);