var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Datapoint2 = require('./models/datapoint');

var MoteSchema   = new Schema({
	datapoints: [Datapoint2]
    moteNr: String,
});

module.exports = mongoose.model('Mote', MoteSchema);