window.Calculator = {

    calcWork:function(params,inicioTSVDate){
        console.log('inicioTSV',inicioTSVDate);

        var inicioTSV = moment({hour:inicioTSVDate.getHours(),min:inicioTSVDate.getMinutes()});
        var ultimoArrivo = moment({hour:inicioTSVDate.getHours(),min:inicioTSVDate.getMinutes()});
        var finTSV = moment({hour:inicioTSVDate.getHours(),min:inicioTSVDate.getMinutes()});

        var ultimoArrivoToAdd = moment.duration({'hours':12,'minutes':30});
        var finTSVToAdd = moment.duration(13,'hours');

        var nightHourFrom = 23;
        var nightHourTo = 6;
        var limitHours = 13;

        //Se lo agrego y después si tengo que quitarle le hago substract
        ultimoArrivo.add(ultimoArrivoToAdd);
        finTSV.add(finTSVToAdd);

        if(inicioTSV.hours() >= nightHourFrom){
            var diff = inicioTSV.hours() - nightHourFrom;
            //Si cambio de hora y está en el rango.  Resto media hora de trabajo
            var exceededMinutes = moment.duration(30*diff,'minutes');
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

        return {
             inicioTSV: inicioTSV
            ,ultimoArrivo: ultimoArrivo
            ,finTSV: finTSV
        };

    }


};










