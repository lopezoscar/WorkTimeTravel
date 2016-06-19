angular.module('starter.services', [])

    .filter('moment', function() {
      return function(dateString, format) {
        return moment(dateString).format(format);
      };
    })
    .filter('toNow',function(){
      return function(time){
        return moment(time).toNow(); // in 4 years
      }
    })
    .filter('fromNow',function(){
      return function(time){
        return moment(time).fromNow(); // in 4 years
      }
    })
    .factory('HoursService',['$localForage','$filter','$cordovaLocalNotification',function($localForage,$filter,$cordovaLocalNotification){

      return {
        calc: function(inicioTSV){
          //console.log('Calculando Inicio TSV',inicioTSV);
          var params = {};//TODO Get params from Firebase
          var results = Calculator.calcWork(params,inicioTSV);
          console.log('Results Hours',results);
          return results;
        }
        ,getHours:function(callback){
          var hours = [];
          $localForage.iterate(function(value, key) {
            hours.push({vuelo:key,hours:value});
          }).then(function(){
            callback(hours);
          });

        }
        ,remove:function(anHour){
          $localForage.removeItem(anHour.vuelo);
        }

        ,addHours:function(hoursData){
          var data = {
            inicioTSV: hoursData.inicioTSV
            , ultimoArrivo: hoursData.ultimoArrivo
            , finTSV: hoursData.finTSV
            ,ts: moment()
          };
          if (hoursData.vuelo) {
            $localForage.setItem(hoursData.vuelo, data);


            try{
                var now = new Date().getTime();

                var duration = moment.duration(data.finTSV.diff(data.inicioTSV));
                var seconds = duration.asSeconds();
                var delayedTime = new Date(now + seconds * 1000);

                var _10SecondsFromNow = new Date(now + 10 * 1000);

                $cordovaLocalNotification.schedule({
                  id: 19,
                  title: "Flights",
                  text: "flight-"+hoursData.vuelo,
                  at: _10SecondsFromNow,
                  data: data
                });
            }catch(err){
              console.log("No se puede agregar la alarma");
            }
          }
    }
}
}]);
