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

    

        Group.find(function(err,group){
            if(err)
                console.log(err)

            console.log(group)
            
        });

        var datapoint2 = new Datapoint2();
        datapoint2.area = req.body.area;
        datapoint2.mote = req.body.mote;
        datapoint2.soilMoisture = req.body.soilMoisture;
	    datapoint2.soilTemperature = req.body.soilTemperature;
        datapoint2.time = Date.now();
        
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
        Datapoint2.find(function(err, data){
            res.json(data)
    })
});

router.get('/', function(req, res) {
    console.log("try get");
    Datapoint2.find(function(err,datapoints){
    	if(err)
	    res.send(err)
	res.json(datapoints) 
    });
});

app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/greenhouse3');
