/**
 * Created by alexn555 on 6/23/2017.
 *
 * Datetime helper
 */

function twoDigits(value) {
    if(value < 10) {
        return '0' + value;
    }
    return value;
}

function convertToISO(date){
    let day = date.substr(0, 2),
        month = date.substr(3, 2),
        year = date.substr(6, 4),
        time = date.substr(11, date.length);
    return year+'-'+month+'-'+day+'T'+time;
}


export function formatDate(unix_timestamp){
    let date = new Date(unix_timestamp * 1000);
    let formattedDate =
        twoDigits(date.getUTCDate()) + '.' + twoDigits(date.getUTCMonth()+1) + '.' + date.getUTCFullYear() +
        ' ' + twoDigits(date.getHours()) + ':' + twoDigits(date.getMinutes()) + ':' + twoDigits(date.getSeconds());

    return formattedDate;
}

export function timestampToISO(timestamp){
   return new Date(timestamp*1000).toISOString();
}

export function isoToTimestamp(date){
    //return +new Date(date) / 1000;
    return Date.parse(date) / 1000;
}


//for non iso strings
export function nonISOtoTimeStamp(strDate){
    //convert to iso string
    let isoString = convertToISO(strDate);
    //parse
    return Date.parse(isoString) / 1000;
}

export function dateToTimestamp(date){
    let unix_timestamp = Math.round(date / 1000);
    return unix_timestamp;
}