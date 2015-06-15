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

    var nigthHourFrom = 6;
    var nigthHourTo = 23;

    for(var min = 0; min < totalOfTenMinutes; min++){

        //1 - Agreogo Ultimo Arrivo y FinTSV
        ultimoArrivo.add(ultimoArrivoToAdd);
        finTSV.add(finTSVToAdd);

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
test2();



