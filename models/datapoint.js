var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DataPointSchema   = new Schema({
    chipcode: String,
    soilMoisture : String,
    soilTemperature : String,
    time : Date
});

module.exports = mongoose.model('DataPoint', DataPointSchema);