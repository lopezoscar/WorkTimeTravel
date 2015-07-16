angular.module('starter.services', [])

    .filter('moment', function() {
      return function(dateString, format) {
        return moment(dateString).format(format);
      };
    })

    .factory('HoursService',['$localForage','$cordovaSQLite',function($localForage,$cordovaSQLite){

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
          var query = "SELECT id, inicioTSV,ultimoArrivo,finTSv from flights ORDER BY desc";
          $cordovaSQLite.execute(db, query, []).then(function(res) {
            if(res.rows.length > 0) {
              for(var i = 0; i < res.rows.length; i++){
                var item = {
                  vuelo: res.rows.item(i).id,
                  inicioTSV: res.rows.item(i).inicioTSV,
                  ultimoArrivo: res.rows.item(i).ultimoArrivo,
                  finTSV: res.rows.item(i).finTSV
                }
                hours.push(item);
              }

              //console.log("SELECTED -> " + res.rows.item(0).id + " " + res.rows.item(0).finTSv);
            } else {
              console.log("No results found");
              callback(hours);
            }
          }, function (err) {
            console.error(err);
            callback(hours);
          });
          //var hours = [];
          //$localForage.iterate(function(value, key) {
          //  hours.push({vuelo:key,hours:value});
          //}).then(function(){
          //  callback(hours);
          //});
        }
        ,remove:function(anHour){
          $localForage.removeItem(anHour.vuelo);
        }

        ,addHours:function(hoursData){
          var data = {
            inicioTSV: hoursData.inicioTSV
            , ultimoArrivo: hoursData.ultimoArrivo
            , finTSV: hoursData.finTSV
          };
          if (hoursData.vuelo) {
            var query = "INSERT INTO flights (inicioTSV,ultimoArrivo,finTSV) VALUES (?,?,?)";
            $cordovaSQLite.execute(db, query, [data.inicioTSV,data.ultimoArrivo,data.finTSV]).then(function(res) {
              console.log("INSERT ID -> " + res.insertId);
            }, function (err) {
              console.error(err);
            });
          }


    }



}
}])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
