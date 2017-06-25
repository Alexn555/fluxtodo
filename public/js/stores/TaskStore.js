import AppDispatcher from '../dispatcher';
import { EventEmitter } from 'events';
import ActionTypes from '../constants/action-types';
import _ from 'underscore';
import { saveItems, getItemsFromStorage } from '../util';
import { getTasks } from '../data';
import { Priorities, Statuses } from '../components/tasks/util';

let USE_COOKIES = true;
let SAVE_TO_STORAGE = false;

// Define initial data points
let tasks = getTasks(Priorities, Statuses);
let CountIndex = tasks.length;

const savePeriod = 0.1; //about 15 mins

function checkEmpty(){
    if(tasks === undefined || tasks === null){
        tasks = [];
    }
}

function saveTasks(period){
    if (!SAVE_TO_STORAGE){ return false; }
    checkEmpty();
    saveItems(period, USE_COOKIES, 'tasks',
        tasks, null,
        { tasks: tasks, expires: new Date().getTime()});
}


(function(){
    if(SAVE_TO_STORAGE){
        tasks = getItemsFromStorage(USE_COOKIES, 'tasks');
    }
})();



const TaskStore = _.extend({}, EventEmitter.prototype, {

    //Select item
    selectItem: function (itemIndex) {
        let task = {};
        if(typeof tasks[itemIndex] !== 'undefined'){
            task = tasks[itemIndex];
        }
        return task;
    },

    getItems: function(){
        saveTasks(savePeriod);
        return tasks;
    },

    //Send message to database
    add: function(data){
        data['id'] = CountIndex;
        tasks.push(data);
        CountIndex += 1;
    },

    edit: function(itemIndex, data){
        for(let i = 0, l = tasks.length; i < l; i++){
            if(tasks[i].id === itemIndex){
                data['createDate'] = tasks[i].createDate;
                data['dueDate'] = data['dueDate'] ? data['dueDate'] : tasks[i].dueDate;
                data['id'] = itemIndex;
                tasks[i] = data;
                return;
            }
        }
    },


    removeItem: function(itemIndex){
        for(let i = 0, l = tasks.length; i < l; i++){
            if(tasks[i].id === itemIndex){
                tasks.splice(i, 1);
                //tasks[i].name = '';
                return;
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
        case ActionTypes.TASK_REMOVE:
            TaskStore.removeItem(action.data);
            break;
        case ActionTypes.TASK_ADD:
            TaskStore.add(action.data);
            break;
        case ActionTypes.TASK_EDIT:
            TaskStore.edit(action.id, action.data);
            break;
        default:
            return true;
    }
    // If action was responded to, emit change event
    TaskStore.emitChange();
    return true;
});


export default TaskStore;