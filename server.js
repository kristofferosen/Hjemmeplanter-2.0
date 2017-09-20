var express    = require('express');      
var app        = express();                
var bodyParser = require('body-parser');
var cors = require('cors');
var port = process.env.PORT || 81; 
var moment = require('moment');
var Datapoint2 = require('./models/datapoint2');
var Mote = require('./models/mote');
var Group = require('./models/group');
var router = express.Router();          

var iterator = 0
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/frontend'));
app.use(express.static(__dirname + 'node_modules'));


router.use(function(req, res, next) {
    console.log('Something is happening.');
    next(); 
});

router.route('/datapoint2')
    .post(function(req, res) {

        // Create datapoint
        var datapoint2 = new Datapoint2();
        datapoint2.group = req.body.group;
        datapoint2.mote = req.body.mote;
        datapoint2.soilMoisture = req.body.soilMoisture;
        datapoint2.soilTemperature = req.body.soilTemperature;
        datapoint2.time = Date.now();

        // Save datapoint
        datapoint2.save(function(err) {
            if (err)
                res.send(err);          
        });

        // Assign datapoint to correct mote in correct group
        Group.findOne({'groupNr': datapoint2.group},function(err,group){

            if(err)
                console.log(err)


            // if group does not exist
            if(group == null){

                // Make new Group
                var newGroup = Group();
                newGroup.groupNr = datapoint2.group;
                newGroup.motes = [];

                // Make new Mote
                var newMote = Mote();
                newMote.moteNr = datapoint2.mote;
                newMote.datapoints = [];
                newMote.datapoints.push(datapoint2);

                // Save mote and group
                newMote.save(function(){
                    if(err)
                        console.log(err);
                    else{
                        newGroup.motes.push(newMote);
                        newGroup.save(function(err) {
                            if (err)
                                console.log(err);

                            res.json({ message: 'Mottatt!' });
                        });
                    }
                });
            }


            // If group exists
            else{

                // Find Mote if it exists 
                var found = false
                group.motes.forEach(function(mote){
                   if(mote.moteNr == datapoint2.mote){
                        mote.datapoints.push(datapoint2);
                        found = true;
            			mote.save();
            			group.save();
                    }
                });

                // If mote does exist
                if(!found){
                    // Create new mote
                    var newMote = Mote();
                    newMote.moteNr = datapoint2.mote;
                    newMote.datapoints = [];
                    newMote.datapoints.push(datapoint2);

                    // Save mote, datapoint and group
                    newMote.save(function(){
                        if(err)
                            console.log(err);
                        else{
                            group.motes.push(newMote);
			                group.save();
                            res.json({ message: 'Mottatt!' });
                        }
                    });
                }
                else{
                    res.json({ message: 'Mottatt!' });
                }
            }
        });
    }).get(function(req, res) {
        Group.find(function(err,groups){
            if(err)
                res.send(err)
            res.json(groups) 
        });
});

router.get('/', function(req, res) {
    Group.find(function(err,groups){
    	if(err)
	    res.send(err)
	res.json(groups) 
    });
});

app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/greenhouse3');
