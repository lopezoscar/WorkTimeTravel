window.Calculator = {

    calcWork:function(params,inicioTSVDate) {
        //console.log('inicioTSV', inicioTSVDate);
        var input = moment(inicioTSVDate,"YYYY-MM-DDThh:mm").format("HH:mm");
        //console.log(input);

        var curDate = moment().format("YYYYMMDD");
        console.log(curDate);
        var inputDate = moment(curDate+" "+input,"YYYYMMDD HH:mm");
        var inputDateUsed = moment(curDate+" "+input,"YYYYMMDD HH:mm");

        var restar = 0;

        var length = 13;
        if(inputDateUsed.format("mm") > 0 ){
            length++;
        }

        for(var i=0;i<length;i++){
            if(Number(inputDateUsed.format("HH")) >= 23 || Number(inputDateUsed.format("HH")) < 6){
                restar++;
            }
            inputDateUsed = moment(inputDateUsed).add(1,"hours");
        }

        var finTSVDate = moment(inputDate).add(13,"hours");
        if(restar){
            finTSVDate = moment(finTSVDate).subtract(30*restar,"minutes");
        }

        var ultimoArrivo = moment(finTSVDate).subtract(30,"minutes");

        console.log("inicio TSV   ", inputDate.format("DD/MM/YYYY H:mm:ss"));
        console.log("ultimo arrivo", ultimoArrivo.format("DD/MM/YYYY H:mm:ss"));
        console.log("fin TSV      ", finTSVDate.format("DD/MM/YYYY H:mm:ss"));

        return {
            inicioTSV: inputDate,
            ultimoArrivo: ultimoArrivo,
            finTSV: finTSVDate
        }

    }

    ,test:function(hours){
        var result = this.calc({},hours);
    }
};










