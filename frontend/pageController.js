var App = angular.module('App', ['ngRoute', 'ngMessages', 'ngSanitize', 'ngCookies','angular-jwt','ngResource','chart.js']);

App.config(function ($routeProvider) {

    $routeProvider
    //admin
        .when('/', {templateUrl: 'pages/dashboard.html', controller: 'dashController'});

});

App.controller('dashController', function ($scope, $http) {

    $scope.init = function(){

        var req = {
            method: 'GET',
            url: 'http://192.81.221.165:80/api/datapoint'
        };
        $http(req).then(function(out){

            console.log(out.data);

            $scope.node8969837moist = [];
            $scope.node8969837temp = [];
	    $scope.node8969837labels = [];	    

            $scope.node1800741moist = [];
            $scope.node1800741temp = [];
	    $scope.node1800741labels = [];

            $scope.node1796642moist = [];
            $scope.node1796642temp = [];
	    $scope.node1796642labels = [];

            $scope.node14790735moist = [];
            $scope.node14790735temp = [];
	    $scope.node14790735labels = [];

            $scope.node8969661moist = [];
            $scope.node8969661temp = [];
	    $scope.node8969661labels = [];

            for(i = 0; i < out.data.length; i++){

                if(out.data[i].chipcode == 8969837.000000){

                   $scope.node8969837moist.push(out.data[i].soilMoisture);
                   $scope.node8969837temp.push(out.data[i].soilTemperature);
		   $scope.node8969837labels.push(out.data[i].time);

                }

                if(out.data[i].chipcode == 1800741.000000){

                   $scope.node1800741moist.push(out.data[i].soilMoisture);
                   $scope.node1800741temp.push(out.data[i].soilTemperature);
		   $scope.node1800741labels.push(out.data[i].time)

                }

                if(out.data[i].chipcode == 1796642.000000){

                   $scope.node1796642moist.push(out.data[i].soilMoisture);
                   $scope.node1796642temp.push(out.data[i].soilTemperature);
		   $scope.node1796642labels.push(out.data[i].time)

                }

                if(out.data[i].chipcode == 14790735.000000){

                   $scope.node14790735moist.push(out.data[i].soilMoisture);
                   $scope.node14790735temp.push(out.data[i].soilTemperature);
		   $scope.node14790735labels.push(out.data[i].time)
                }

                if(out.data[i].chipcode == 8969661.000000){

                   $scope.node8969661moist.push(out.data[i].soilMoisture);
                   $scope.node8969661temp.push(out.data[i].soilTemperature);
		   $scope.node8969661labels.push(out.data[i].time);

                   
                }

            }

            $scope.options = {

                datasetFill  : false,
                scaleShowGridLines: false,
                pointDot: false
            }

            $scope.plants = $scope.a;

            $scope.labels = $scope.b;

            $scope.data = [
                $scope.a,$scope.x,$scope.y
            ];


            $scope.node14790735data = [
                $scope.node14790735moist,$scope.node14790735temp
            ];
            $scope.node1800741data = [
                $scope.node1800741moist,$scope.node1800741temp
            ];
            $scope.node8969837data = [
                $scope.node8969837moist,$scope.node8969837temp
            ];
            $scope.node1796642data = [
                $scope.node1796642moist,$scope.node1796642temp
            ];
            $scope.node8969661data = [
                $scope.node8969661moist,$scope.node8969661temp
            ];


            $scope.onClick = function (points, evt) {
                console.log(points, evt);
            };

        });




    };
});


App.run(function ($rootScope) {

    $rootScope.$on('$viewContentLoaded',function(){
        jQuery('html, body').animate({ scrollTop: 0 }, 0);
    });

});
