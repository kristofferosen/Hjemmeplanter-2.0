var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Mote = require('./mote');

var Groupschema  = new Schema({
	motes: [Mote],
    areaNr: String,
    average: [Number]
});

module.exports = mongoose.model('Group', Groupschema);
