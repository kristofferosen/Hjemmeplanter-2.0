var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Mote = require('./mote');

var Groupschema  = new Schema({
	motes: [Mote],
    areaNr: String
});

module.exports = mongoose.model('Group', Groupschema);
