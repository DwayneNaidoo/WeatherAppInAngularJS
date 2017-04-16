var app = angular.module('Weather', [])

  .directive('loading', function () {
      return {
        restrict: 'E',
        replace:true,
        template: '<div class="loading"><img src="..."/>LOADING...</div>',
        link: function (scope, element, attr) {
              scope.$watch('loading', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      }
  })

app.controller('Header', function($scope){
 
 var scope =$scope;
 scope.weatherInfo ={
header:"Weather Application In AngularJS"

 };  
});


  


app.controller('location', function($scope){
  var mysrclat= 0; var mysrclong = 0;
    
  
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

             $scope.mysrclat = "Latitude :" + position.coords.latitude; 
                $scope.mysrclong = "Longitude :" + position.coords.longitude; 
                
                 });
        
    }
  
});

app.controller('WeatherControl', function($scope,$http) {
  
  var WeatherCon = this;
  
  var URL = 'http://api.openweathermap.org/data/2.5/forecast/daily';
   navigator.geolocation.getCurrentPosition(function (position) {

             mysrclat = position.coords.latitude; 
                mysrclong =  position.coords.longitude; 
 
  var request = {
    method: 'GET',
    url: URL,
    params: {
       lon: mysrclong,
       lat: mysrclat,
      mode: 'json',
      units: 'metric',
      cnt: '2',
      appid: '53f9d8e4213222cf517d86dc406d67fc'
    }
  };


  $http(request)
    .then(function(response) {
      WeatherCon.cityName = response.data.city.name;
      WeatherCon.countryName = response.data.city.country;
      WeatherCon.day = response.data.list[0].temp.morn;
       WeatherCon.night = response.data.list[0].temp.night;
      WeatherCon.tempMin = response.data.list[0].temp.min;
      WeatherCon.tempMax = response.data.list[0].temp.max;
      WeatherCon.weatherdes = response.data.list[0].weather[0].description;

      WeatherCon.day2 = response.data.list[1].temp.morn;
       WeatherCon.night2 = response.data.list[1].temp.night;
      WeatherCon.tempMin2 = response.data.list[1].temp.min;
      WeatherCon.tempMax2 = response.data.list[1].temp.max;
      WeatherCon.weatherdes2 = response.data.list[1].weather[0].description;
}).
    catch(function(response) {
      WeatherCon.cityName = response.data.city.name;
    });
  
    });

 });
 
 