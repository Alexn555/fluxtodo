
const keyMirror = require('keymirror');

// Define action constants
let ActionTypes = keyMirror({
  INIT_APP: null,
  
  COMMENT_ADD: null,
  COMMENT_REMOVE: null,
  COMMENT_SELECT: null,

  TASK_ADD: null,
  TASK_REMOVE: null,
  TASK_EDIT: null,
  //move to folder, remove from folder
  TASK_MOVE: null,

  FOLDER_CREATE: null,
  FOLDER_EDIT: null,
  FOLDER_REMOVE: null

});

export default ActionTypes;