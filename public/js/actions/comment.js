import AppDispatcher from '../dispatcher';
import ActionConstans from '../constants/action-types';

// Define action methods
const CommentActions = {

  // Set currently selected contact variation
  selectComments: function (taskId) {
    AppDispatcher.handleAction({
      actionType: ActionConstans.COMMENT_SELECT,
      data: taskId
    });
  },
  
  removeComment: function(index){
	AppDispatcher.handleAction({
      actionType: ActionConstans.COMMENT_REMOVE,
      data: index
    });  
  },
  

  // Add item 
  addComment: function (data) {
    AppDispatcher.handleAction({
      actionType: ActionConstans.COMMENT_ADD,
      data: data
    });
  }


};

//module.exports = CommentActions;
export default CommentActions;
