/**
 * Created by alexn555 on 6/22/2017.
 * Storage helper
 */

import Cookies from 'js-cookie';


function byteCount(s) {
    return encodeURI(s).split(/%..|./).length - 1;
}

export function areMsgTooBigForCookies(items, itemKey){
    if (itemKey === null) { return false; }
    let maxLen = 4096;
    let i, l = items.length;

    for(i = 0; i < l; i++){
        if(byteCount(items[i][itemKey]) > maxLen){
            return true;
        }
    }
    return false;
}


export function saveItems(period, useCookies, itemSaveName, items, itemKey, saveObj){
    if(useCookies){
        if(areMsgTooBigForCookies(items, itemKey)){
            return alert(' Item too big and will not be saved. Use localstorage');
        }
        Cookies.set(itemSaveName, items, { expires: period });
    }else{
        console.log(` set ${itemSaveName} localstorage `);
        localStorage.setItem(itemSaveName, JSON.stringify(saveObj));
    }
}

export function getItemsFromStorage(useCookies, itemType){
    let items = [];
    if(useCookies){
        let ItemsFromCookie = Cookies.get(itemType);
        if(ItemsFromCookie !== undefined){
            ItemsFromCookie = JSON.parse(ItemsFromCookie);
            items = ItemsFromCookie;
        }
    }else{
        let ItemsFromStore = localStorage.getItem(itemType);
        if(ItemsFromStore !== null){
            ItemsFromStore = JSON.parse(ItemsFromStore);
            items = ItemsFromStore[itemType];
        }
    }
    console.log(' get items `' + itemType + '` count: ' + items.length + ' from ' + ((useCookies) ? 'Cookies' : 'local storage'));
    return items;
}
