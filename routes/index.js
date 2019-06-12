var express = require('express');
var router = express.Router();
var request = require('request');


var villes = [
  // {
  //   city:'Marseille',
  //   info:'ensoleillé',
  //   img:'../images/picto-1.png',
  //   min:'15°c',
  //   max:'25°c'
  // },
  // {
  //   city:'Bordeaux',
  //   info:'pluvieux',
  //   img:'../images/picto-1.png',
  //   min:'8°c',
  //   max:'22°c'
  // },
  // {
  //   city:'Lyon',
  //   info:'couvert',
  //   img:'../images/picto-1.png',
  //   min:'8°c',
  //   max:'22°c'
  // },
  // {
  //   city:'Nantes',
  //   info:'nuageux',
  //   img:'../images/picto-1.png',
  //   min:'8°c',
  //   max:'22°c'
  // },

];

/* GET home page. */
router.get('/', function(req, res, next) {

res.render('index', { title: 'WeatherApp',villes});

});

router.post('/add-city', function(req, res, next) {
  request("http://api.openweathermap.org/data/2.5/weather?q=" + req.body.city + "&lang=fr&units=metric&APPID=ca5a58e1587a83ab7ca867b9634b94dc", function(error, response, body) {

    var jsonBody = JSON.parse(body);

    var dynCity = {
      city : jsonBody.name,
      info : jsonBody.weather[0].description,
      img:'http://openweathermap.org/img/w/'+ jsonBody.weather[0].icon +'.png',
      min:jsonBody.main.temp_min+'°c',
      max:jsonBody.main.temp_max+'°c',
    }

    villes.push(dynCity);

    console.log('nom de ville'+dynCity.city+'temp minim : '+dynCity.min);

   
    res.render('index', { title: 'WeatherApp',villes });
  });

  //villes.push(req.body);

});

router.post('/delete-city', function(req, res, next) {

  //wconsole.log(req.body);

  villes.splice(req.body.position,1);

  res.render('index', { title: 'WeatherApp',villes });
});

module.exports = router;
