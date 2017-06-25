import AppDispatcher from '../dispatcher';
import { EventEmitter } from 'events';
import ActionTypes from '../constants/action-types';
import _ from 'underscore';
import { saveItems, getItemsFromStorage } from '../util';
import { getFolders } from '../data';

let USE_COOKIES = true;
let SAVE_TO_STORAGE = false;

// Define initial data points
let folders = getFolders();
let CountIndex = folders.length;


const savePeriod = 0.1;

function checkEmpty(){
    if(folders === undefined || folders === null){
        folders = [];
    }
}

function saveTasks(period){
    if (!SAVE_TO_STORAGE){ return false; }
    checkEmpty();
    saveItems(period, USE_COOKIES, 'folders',
        folders, null,
        { folders: folders, expires: new Date().getTime()});
}


(function(){
    if(SAVE_TO_STORAGE){
        folders = getItemsFromStorage(USE_COOKIES, 'folders');
    }
})();



const FolderStore = _.extend({}, EventEmitter.prototype, {

    //Select item
    selectFolder: function (itemIndex) {
        let folder = {};
        if(typeof folders[itemIndex] !== 'undefined'){
            folder = folders[itemIndex];
        }
        return folder;
    },

    getFolders: function(){
        saveTasks(savePeriod);
        return folders;
    },

    create: function(data){
        data['id'] = CountIndex;
        data['taskIds'] = [];
        folders.push(data);
        CountIndex += 1;
    },

    edit: function(data){
        let { folderId, name } = data;
        for(let i = 0, l = folders.length; i < l; i++){
            for(let folder of folders){
               if(folder.id === folderId){
                  folder.name = name;
               }
            }
        }
    },

    remove: function(folderId){
        for(let i = 0, l = folders.length; i < l; i++){
            if(folders[i].id === folderId){
                folders.splice(i, 1);
            }
        }
    },


    // Emit Change event
    emitChange: function () {
        this.emit('change');
    },

    // Add change listener
    addChangeListener: function (callback) {
        this.on('change', callback);
    },

    // Remove change listener
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    }

});


// Register callback with AppDispatcher
AppDispatcher.register(function (payload) {
    let action = payload.action;
    switch (action.actionType) {
        case ActionTypes.FOLDER_EDIT:
            FolderStore.edit(action.data);
            break;
        case ActionTypes.FOLDER_REMOVE:
            FolderStore.remove(action.data);
            break;
        case ActionTypes.FOLDER_CREATE:
            FolderStore.create(action.data);
            break;
        default:
            return true;
    }
    // If action was responded to, emit change event
    FolderStore.emitChange();
    return true;
});


export default FolderStore;