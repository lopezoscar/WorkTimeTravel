function test(){

    var hours = [];

    var add = function(inicioTSV,ultimoArrivo,finTSV){
        hours.add({
            inicioTSV:inicioTSV,
            ultimoArrivo:ultimoArrivo,
            finTSV:finTSV
        });
    }


    var defaultHours = 13;//Horas totales por día
    var nightsHours  = 7;

    var nigthHourFrom = 23;
    var nightHourTo = 6;

    console.log('INICIO TSV | ULT ARRIVO | FIN TSV');
    var hour = 0;
    var totalOfTenMinutes = 6*24;
    var tenMin;
    for(var min = 0; min < totalOfTenMinutes; min++){
        tenMin = min*10;
        console.log(tenMin,tenMin+13-0.5,tenMin+13);
        if(tenMin == 60){
            hour++;
            tenMin = 0;
        }
    }
}
function test2(){



    var inicioTSV = moment({hour:05,min:0});
    var ultimoArrivo = moment({hour:05,min:0});
    var finTSV = moment({hour:05,min:0});

    console.log('INICIO TSV | ULT ARRIVO | FIN TSV');
    var totalOfTenMinutes = 6*24; //Hay 6 * 24 veces 10 minutos en un día
    var tenMin = 0;

    var intervalMinutes = 10;

    var minutesToAdd = moment.duration(intervalMinutes, 'minutes');
    var ultimoArrivoToAdd = moment.duration({'hours':12,'minutes':30});
    
    var finTSVToAdd = moment.duration(13,'hours');
    

    var nightHourFrom = 23;
    var nightHourTo = 6;

    var limitHours = 13;


    for(var min = 0; min < totalOfTenMinutes; min++){
        
        //1 - Agreogo Ultimo Arrivo y FinTSV
        ultimoArrivo.add(ultimoArrivoToAdd);
        finTSV.add(finTSVToAdd);

        //Si está en el rango nocturno
        if(inicioTSV.hours() >= nightHourFrom){
            var diff = inicioTSV.hours() - nightHourFrom;
            //Si cambio de hora y está en el rango.  Resto media hora de trabajo
            var exceededMinutes = moment.duration(30*diff,'minutes');
            ultimoArrivo.subtract(exceededMinutes);
            finTSV.subtract(exceededMinutes);
        }
        if(inicioTSV.hours() < nightHourTo){
            var diff = nightHourTo - inicioTSV.hours();            
            //Si cambio de hora y está en el rango.  Resto media hora de trabajo
            var exceededMinutes = moment.duration(30*diff,'minutes');
            ultimoArrivo.subtract(exceededMinutes);
            finTSV.subtract(exceededMinutes);
        }

        var inicio = inicioTSV.hours()+":"+inicioTSV.minute() +"          ";
        var arrivo =  ultimoArrivo.hours()+":"+ultimoArrivo.minute() +"          ";
        var fin = finTSV.hours()+":"+finTSV.minute();
        //2 - Muestro lo que agrego
        console.log(inicio,arrivo,fin);

        //3 - Agrego los 10 minutos al inicioTSV
        inicioTSV.add(minutesToAdd);

        //4 - Resteo las variables para que se vuelvan agregar las horas correspondientes
        ultimoArrivo = moment({hour:inicioTSV.hours(),min:inicioTSV.minutes()});
        finTSV = moment({hour:inicioTSV.hours(),min:inicioTSV.minutes()});

        

    }
}

function test3(inicioTSVDate){
    //Replace values with params
    var nightHourFrom = 23;
    var nightHourTo = 6;
    var limitHours = 13;

    var inicioTSV = moment({hour:inicioTSVDate.getHours(),min:inicioTSVDate.getMinutes()});
    var ultimoArrivo = moment({hour:inicioTSVDate.getHours(),min:inicioTSVDate.getMinutes()});
    var finTSV = moment({hour:inicioTSVDate.getHours(),min:inicioTSVDate.getMinutes()});

    var ultimoArrivoToAdd = moment.duration({'hours':12,'minutes':30});
    var finTSVToAdd = moment.duration(limitHours,'hours');


    var x = moment();
    x.hour(nightHourFrom);
    x.minutes(0);
    x.seconds(0);

    var z = moment();
    z.hour(nightHourTo);
    z.minutes(0);
    z.seconds(0);
    z.add(1,'d');
    //Rango Horas Nocturnas
    var range = x.twix(z);

    //console.log('count',range.count('hours'));
    //console.log('countInner',range.countInner('hours'));
    //console.log('length',range.length('hours'));

    var lengthNightHours = range.length('hours');

    finTSV.add(finTSVToAdd);

    var rangeTSV = inicioTSV.twix(finTSV);

    finTSV.subtract(finTSVToAdd);


    //Todas las horas después de las 6 de la mañana
    //Rango 6 - 24

    //Desde las 07 - 10 es Horario Normal
    //Hasta las 17:00 está ok
    if(inicioTSV.hours() > nightHourTo){
        var diff = nightHourFrom - inicioTSV.hours();//Estandar hours
        console.log('diff',diff);
        if(diff > 0 && diff < limitHours){
            var remain =  limitHours - diff;
            console.log('remain',remain);//Horas a evaluar dentro del rango nocturno
            if(remain > 0 && remain <= lengthNightHours){

                var nightHoursRemain = remain*0.5;
                if(nightHoursRemain > 0){
                    //horario nocturno mas las que trabajo estandar
                    var hoursToAdd = moment.duration({hours:nightHoursRemain+diff});
                    finTSV.add(hoursToAdd);
                    console.log('adding remain',nightHoursRemain);
                }else{
                    console.log('nightHoursRemain < 0',nightHoursRemain);
                }
            }else{
                var diff2 = remain - lengthNightHours;
                var hoursToAdd = moment.duration({hours:lengthNightHours*0.5+diff2+diff});
                finTSV.add(hoursToAdd);
                console.log('restantes',remain);
                console.log('lengthNightHours',lengthNightHours);
            }
        }else{
            ultimoArrivo.add(ultimoArrivoToAdd);
            finTSV.add(finTSVToAdd);
            console.log('diff fuera de límite. Horario Normal',diff);
        }
        //Todas las horas menores iguales a las 6 de la mañana
        //Rango 0 - 6
    }else if(inicioTSV.hours() <= nightHourTo){
        var nigthHours = nightHourTo - inicioTSV.hours();
        if(nigthHours > 0){
            console.log('nightHours',nigthHours);
            var hours = limitHours - nigthHours*0.5;
            var hoursToAdd = moment.duration({hours:hours});
            finTSV.add(hoursToAdd);
        }else{
            console.log('Comienza a las 06:00. Horario Normal');
            ultimoArrivo.add(ultimoArrivoToAdd);
            finTSV.add(finTSVToAdd);
        }
    }

    //else{
    //Se lo agrego y después si tengo que quitarle le hago substract
    //ultimoArrivo.add(ultimoArrivoToAdd);
    //finTSV.add(finTSVToAdd);
    //}


    /*
     if(inicioTSV.hours() >= nightHourFrom){
     //Si cambio de hora y está en el rango.  Resto media hora de trabajo
     var exceededMinutes = moment.duration(30,'minutes');
     ultimoArrivo.subtract(exceededMinutes);
     finTSV.subtract(exceededMinutes);
     }
     else if(inicioTSV.hours() < nightHourTo){
     var diff = nightHourTo - inicioTSV.hours();
     //Si cambio de hora y está en el rango.  Resto media hora de trabajo
     var exceededMinutes = moment.duration(30*diff,'minutes');
     ultimoArrivo.subtract(exceededMinutes);
     finTSV.subtract(exceededMinutes);
     }
     */

    return {
        inicioTSV: inicioTSV
        ,ultimoArrivo: ultimoArrivo
        ,finTSV: finTSV
    };
}


test2();




