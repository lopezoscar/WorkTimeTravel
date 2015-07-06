window.Calculator = {

    calcWork:function(params,inicioTSVDate) {
        console.log('inicioTSV', inicioTSVDate);

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
        var range = x.twix(z);

        //console.log('count',range.count('hours'));
        //console.log('countInner',range.countInner('hours'));
        //console.log('length',range.length('hours'));

        var lengthNightHours = range.length('hours');

        var rangeTSV = inicioTSV.twix(finTSV);

        var overlaps = range.overlaps(rangeTSV);
        console.log('overlaps',overlaps);

        if(inicioTSV.hours() > nightHourTo){
            var diff = nightHourFrom - inicioTSV.hours();//Estandar hours
            console.log('diff',diff);
            if(diff > 0 && diff < limitHours){
                var remain =  limitHours - diff;
                console.log('remain',remain);//Horas a evaluar dentro del rango nocturno
                if(remain > 0){
                    var nightHoursRemain = remain - lengthNightHours*0.5;
                    console.log('nightHoursRemain',nightHoursRemain);
                    if(nightHoursRemain > 0){
                        //horario nocturno mas las que trabajo estandar
                        var hoursToAdd = moment.duration({hours:nightHoursRemain+diff});
                        finTSV.add(hoursToAdd);
                        console.log('adding remain',nightHoursRemain);
                    }
                }
            }
        }else{
            //Se lo agrego y después si tengo que quitarle le hago substract
            ultimoArrivo.add(ultimoArrivoToAdd);
            finTSV.add(finTSVToAdd);
        }


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

    ,test:function(hours){
        var a = new Date();
        a.setHours(hours);
        var result = this.calcWork({},a);
        console.log('result',result);
    }
};










