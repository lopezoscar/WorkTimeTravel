window.Calculator = {

    calcWork:function(params,inicioTSVDate) {
        var input = moment(inicioTSVDate).format("HH:mm");

        var curDate = moment().format("YYYYMMDD");
        var inputDate = moment(curDate+" "+input,"YYYYMMDD HH:mm");

        var inputDateUsed = moment(curDate+" "+input,"YYYYMMDD HH:mm");

        console.log(inputDate);
        console.log(inputDateUsed);

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
            inicioTSV: inputDate.format("DD/MM/YYYY HH:mm:ss"),
            ultimoArrivo: ultimoArrivo.format("DD/MM/YYYY HH:mm:ss"),
            finTSV: finTSVDate.format("DD/MM/YYYY HH:mm:ss")
        }

    }

    ,test:function(hours){
        var result = this.calc({},hours);
    }
};










