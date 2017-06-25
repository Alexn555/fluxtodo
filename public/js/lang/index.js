/**
 * Created by alexn555 on 6/24/2017.
 *  Language handler
 *   get language values using global language params
 */
import { LangEn, LangRu } from './languages/';

const switchDebug = false;
let currentLang = 'en';
let Lang;

function getLanguage(lang){
    switch(lang){
        case 'en':
            return LangEn;
        case 'ru':
            return LangRu;
        default:
            return LangEn;
    }
}

function checkIfFieldUndefined(component, field, res){
    if(res === undefined){
        console.error(` Lang component < ${component} > field ${field} is missing `);
    }
}

class LanguageHandler {
    constructor(currrentLang){
        currentLang = currrentLang || 'en';
        Lang = getLanguage(currrentLang);
    }

    switchLanguage(newLang){
        if(currentLang !== newLang){
            currentLang = newLang;
            Lang = getLanguage(currentLang);
        }
    }

    getVal(component, field){
        const res = Lang[component][field];
        if(switchDebug){ checkIfFieldUndefined(component, field, res); }
        //console.log(' value for ' + component + ' val ' + Lang[component][field]);
        return res;
    }
}


export default new LanguageHandler(currentLang);