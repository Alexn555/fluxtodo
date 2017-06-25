import AppDispatcher from '../dispatcher';
import ActionConstans from '../constants/action-types';

// Define action methods
const FolderActions = {
  edit: function(data){ //folderId, name
    AppDispatcher.handleAction({
        actionType: ActionConstans.FOLDER_EDIT,
        data: data
    });
  },

  remove: function(data){ //folderId
    AppDispatcher.handleAction({
        actionType: ActionConstans.FOLDER_REMOVE,
        data: data
    });
  },

  create: function(data){ //name, taskId
    AppDispatcher.handleAction({
        actionType: ActionConstans.FOLDER_CREATE,
        data: data
    });
  },

};

//module.exports = CommentActions;
export default FolderActions;
