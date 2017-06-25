/**
 * Created by alexn555 on 6/23/2017.
 */

export function getItemsOfObject(obj){
    let items = [];
    let counter = 0;
    Object.keys(obj).forEach(function(key) {
        items.push({ key: obj[key], index: counter });
        counter += 1;
    });
    return items;
}
