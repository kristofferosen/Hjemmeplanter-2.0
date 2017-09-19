/**
 * Created by erlend on 24.07.2016.
 */


/**
 * Created by erlend on 14.05.2016.
 */


var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var WaterSchema   = new Schema({
    water : Boolean
});

module.exports = mongoose.model('Water', WaterSchema);