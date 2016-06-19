angular.module('starter.services', [])

    .filter('moment', function () {
        return function (dateString, format) {
            return moment(dateString).format(format);
        };
    })
    .filter('toNow', function () {
        return function (time) {
            return moment(time).toNow(); // in 4 years
        }
    })
    .filter('fromNow', function () {
        return function (time) {
            return moment(time).fromNow(); // in 4 years
        }
    })
    .factory('HoursService', ['$localForage', '$filter', '$cordovaLocalNotification', function ($localForage, $filter, $cordovaLocalNotification) {

        return {
            calc: function (inicioTSV) {
                //console.log('Calculando Inicio TSV',inicioTSV);
                var params = {};//TODO Get params from Firebase
                var results = Calculator.calcWork(params, inicioTSV);
                console.log('Results Hours', results);
                return results;
            }
            , getHours: function (callback) {
                var hours = [];
                $localForage.iterate(function (value, key) {
                    if (key != "flights_count") {
                        hours.push({vuelo: key, hours: value});
                    }
                }).then(function () {
                    callback(hours);
                });

            }
            , remove: function (anHour) {
                $localForage.removeItem(anHour.vuelo);
                $localForage.getItem("flights_count").then(function(length){
                    length === null ?  length = 0 : length--;
                    $localForage.setItem("flights_count", length);//Promise
                });
            }

            , addHours: function (hoursData) {
                var data = {
                    inicioTSV: hoursData.inicioTSV
                    , ultimoArrivo: hoursData.ultimoArrivo
                    , finTSV: hoursData.finTSV
                    , ts: moment()
                };
                if (hoursData.vuelo) {
                    $localForage.setItem(hoursData.vuelo, data);
                    $localForage.getItem("flights_count").then(function(length){
                        length === null ?  length = 1 : length++;
                        $localForage.setItem("flights_count", length).then(function(){
                            try {
                                var now = new Date().getTime();

                                var duration = moment.duration(data.finTSV.diff(data.inicioTSV));
                                var seconds = duration.asSeconds();
                                var delayedTime = new Date(now + seconds * 1000);

                                var _10SecondsFromNow = new Date(now + 10 * 1000);

                                $cordovaLocalNotification.schedule({
                                    id: length,
                                    title: "Flights",
                                    text: "flight-" + hoursData.vuelo,
                                    at: _10SecondsFromNow,
                                    data: data
                                });
                                console.log("LENGTH ", length);
                            } catch (err) {
                                console.log("No se puede agregar la alarma");
                            }
                        });
                    });





                }
            }
        }
    }]);
