/**
 * acordate que en la franja horaria que va de 23 a 06 ya sea por un minuto que
 * entre este periodo de 13 entre el inicio tsv y el fin de tsv, se debe quitar (penalizar)
 * media hora por cada hora (o fraccion) que entre en el "periodo nocturno"
 *
 * @param params
 * @param inicioTSVDate
 * @returns {{inicioTSV: *, ultimoArrivo: *, finTSV: *}}
 */
var moment = require("moment");
function calcWork(inicioTSVDate) {
    //console.log('inicioTSV', inicioTSVDate);
    var input = moment(inicioTSVDate,"YYYY-MM-DDThh:mm").format("HH:mm");
    //console.log(input);

    var inputDate = moment("20160208 "+input,"YYYYMMDD HH:mm");
    var inputDateUsed = moment("20160208 "+input,"YYYYMMDD HH:mm");

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

    console.log("inicio TSV   ", inputDate.format("DD/MM/YYYY HH:mm"));
    console.log("ultimo arrivo", ultimoArrivo.format("DD/MM/YYYY HH:mm"));
    console.log("fin TSV      ", finTSVDate.format("DD/MM/YYYY HH:mm"));

    return {
        inicioTSV: inicioTSVDate,
        ultimoArrivo: ultimoArrivo,
        finTSV: finTSVDate
    }

}


//calcWork(moment("2016-02-08T04:00:00"));

var hour = 0;
for (var i = 0; i < 24;i++){

    var min = 0;
    for(var j = 0; j < 6; j++){
        if(min == 0){
            min = "00";
        }
        var date = "2016-02-08T"+hour+":"+min;
        console.log(date);
        calcWork(date);
        min = Number(min) + 10;

        console.log("\n");
    }
    hour++;


}