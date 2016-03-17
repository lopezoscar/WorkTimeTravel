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
    .factory('HoursService',['$localForage','$filter',function($localForage,$filter){

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
          }
    }
}
}]);
