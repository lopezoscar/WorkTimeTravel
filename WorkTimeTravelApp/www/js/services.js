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
          console.log('Calculando Inicio TSV',inicioTSV);
          var params = {};//TODO Get params from Firebase
          var results = Calculator.calcWork(params,inicioTSV);
          console.log('Results Hours',results);
          return results;
        }
        ,getHours:function(callback){
          var hours = [];
          //var query = "SELECT id, inicioTSV,ultimoArrivo,finTSv from flights ORDER BY desc";
          //$cordovaSQLite.execute(db, query, []).then(function(res) {
          //  if(res.rows.length > 0) {
          //    for(var i = 0; i < res.rows.length; i++){
          //      var item = {
          //        vuelo: res.rows.item(i).id,
          //        inicioTSV: res.rows.item(i).inicioTSV,
          //        ultimoArrivo: res.rows.item(i).ultimoArrivo,
          //        finTSV: res.rows.item(i).finTSV
          //      }
          //      hours.push(item);
          //    }
          //
          //    //console.log("SELECTED -> " + res.rows.item(0).id + " " + res.rows.item(0).finTSv);
          //  } else {
          //    console.log("No results found");
          //    callback(hours);
          //  }
          //}, function (err) {
          //  console.error(err);
          //  callback(hours);
          //});
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

            //var query = "INSERT INTO flights (inicioTSV,ultimoArrivo,finTSV) VALUES (?,?,?)";
            //$cordovaSQLite.execute(db, query, [data.inicioTSV,data.ultimoArrivo,data.finTSV]).then(function(res) {
            //  console.log("INSERT ID -> " + res.insertId);
            //}, function (err) {
            //  console.error(err);
            //});
          }
    }
}
}]);
