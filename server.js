var express    = require('express');      
var app        = express();                
var bodyParser = require('body-parser');
var cors = require('cors');
var port = process.env.PORT || 81; 
var moment = require('moment');
var Datapoint = require('./models/datapoint');
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

router.route('/datapoint')
    .post(function(req, res) {

        
        var datapoint = new Datapoint();

        datapoint.chipcode = req.body.chipcode;
        datapoint.soilMoisture = req.body.soilMoisture;
	    datapoint.soilTemperature = req.body.soilTemperature;
        datapoint.time = Date.now();
        iterator = iterator +1
        //console.log(datapoint)
        console.log(iterator);
        /*
        datapoint.save(function(err) {

            if (err)
                res.send(err);

            res.json({ message: 'datatapoint created!' });

        });*/
        res.json({ message: 'Mottatt!' });

    }).get(function(req, res) {


    Datapoint.find(function(err, data){
        res.json(data)
    })
});

router.get('/', function(req, res) {
    console.log("try get");
    Datapoint.find(function(err,datapoints){
    	if(err)
	    res.send(err)
	res.json(datapoints) 
    });
    //res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);
//var mongoose   = require('mongoose');
//mongoose.connect('mongodb://localhost/greenhouse2');
