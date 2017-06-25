import AppDispatcher from '../dispatcher';
import ActionConstans from '../constants/action-types';

// Define action methods
const TaskActions = {
  remove: function(index){
	AppDispatcher.handleAction({
      actionType: ActionConstans.TASK_REMOVE,
      data: index
    });  
  },

  // Add item 
  add: function (data) {
    AppDispatcher.handleAction({
      actionType: ActionConstans.TASK_ADD,
      data: data
    });
  },

  move: function(data){
      AppDispatcher.handleAction({
          actionType: ActionConstans.TASK_MOVE,
          data: data
      });
  },

  edit: function(id, data){
    AppDispatcher.handleAction({
        actionType: ActionConstans.TASK_EDIT,
        id: id,
        data: data
    });
  },

};

//module.exports = CommentActions;
export default TaskActions;
