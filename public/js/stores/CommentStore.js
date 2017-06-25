import AppDispatcher from '../dispatcher';
import { EventEmitter } from 'events';
import ActionTypes from '../constants/action-types';
import _ from 'underscore';
import { saveItems, getItemsFromStorage } from '../util';
import { getComments } from '../data';

let USE_COOKIES = true;
let SAVE_TO_STORAGE = false;

// Define initial data points
let messages = getComments();
let CountIndex = messages.length;

function checkEmptyMessage(){
	if(messages === undefined || messages === null){
		messages = [];
	}
}

function saveMessages(period){
    if (!SAVE_TO_STORAGE) { return false; }
	checkEmptyMessage();
    saveItems(period, USE_COOKIES, 'messages',
         messages, 'msg',
        { messages: messages, expires: new Date().getTime()});
}


(function(){
    if(SAVE_TO_STORAGE) {
        messages = getItemsFromStorage(USE_COOKIES, 'messages');
    }
})();

	
const CommentStore = _.extend({}, EventEmitter.prototype, {
	
  //Select item
  selectItem: function (itemIndex) {
    let message = {};
	if(typeof messages[itemIndex] !== 'undefined'){
		message = messages[itemIndex];
	}
    return message; 
  },
  
  //Send message to database
  add: function(data){
      data['id'] = CountIndex;
      messages.push(data);
      CountIndex += 1;
  },
  
  getMessages: function(){
      saveMessages(0.1);
      return messages;
  },
  
  removeItem: function(itemIndex){
	for(let i = 0, l = messages.length; i < l; i++){
		if(messages[i].id === itemIndex){
			messages.splice(i, 1);
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
	case ActionTypes.COMMENT_REMOVE:
	  CommentStore.removeItem(action.data);
	  break;
    case ActionTypes.COMMENT_ADD:
      CommentStore.add(action.data);
      break;
    default:
      return true;
  }
  // If action was responded to, emit change event
  CommentStore.emitChange();
  return true;
});


export default CommentStore;