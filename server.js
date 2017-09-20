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

        var datapoint2 = new Datapoint2();
        datapoint2.area = req.body.group;
        datapoint2.mote = req.body.mote;
        datapoint2.soilMoisture = req.body.soilMoisture;
        datapoint2.soilTemperature = req.body.soilTemperature;
        datapoint2.time = Date.now();


        datapoint2.save(function(err) {
            if (err)
                res.send(err);

            
        });

        Group.findOne({'groupNr': datapoint2.group},function(err,group){

            if(err)
                console.log(err)
            console.log(group)





            // if group does not exist
            if(group.length == 0){
                console.log("make new group");
                var newGroup = Group();
                newGroup.groupNr = datapoint2.group;
                newGroup.motes = [];

                var newMote = Mote();
                newMote.moteNr = datapoint2.mote;
                newMote.datapoints = [];
                newMote.datapoints.push(datapoint2);

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

                var found = false

                //if mote does not exist 
                for(mote in group.motes){
                    if(mote.moteNr == datapoint2.mote){
                        mote.datapoints.push(datapoint2)
                        found = true
                    }
                }



                //if mote does exist
                if(!found){
                    var newMote = Mote();
                    newMote.moteNr = datapoint2.mote;
                    newMote.datapoints = [];
                    newMote.datapoints.push(datapoint2);

                    newMote.save(function(){

                        if(err)
                            console.log(err);
                        else{
                            
                            group.motes.push(newMote);
                            res.json({ message: 'Mottatt!' });
                        }
                    });
                }
                else{
                    res.json({ message: 'Mottatt!' });
                }
            }
        });

        
        
        //area['mote' + arg.motename].messages.push(newmessage);
        //db.save();
        /*
        datapoint2.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Mottatt!' });
        });
*/

    }).get(function(req, res) {
        Group.find(function(err,groups){
            if(err)
            res.send(err)
        res.json(groups) 
        });
    })
});

router.get('/', function(req, res) {
    console.log("try get");
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
