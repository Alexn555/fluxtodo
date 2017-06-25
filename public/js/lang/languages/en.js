/**
 * Created by alexn555 on 6/24/2017.
 */


const form_base = {
    create: 'Create',
    name: 'Name',
    user: 'User',
    edit: 'Edit',
    remove: 'Remove',
    submit: 'Submit'
};

export const LangEn = {
    menu: {
        home: 'Home',
        comments: 'Comments',
        tasks: 'Tasks',
        create_task: 'Create Task',
        create_folder: 'Create Folder'
    },
    common: {
        application: 'Application',
        home_title: 'Home',
        home_heading: 'An application manual',
        home_desc: 'A Flux React solution',
        page_not_found: 'Page not found',
        to_home_page: 'to home',
        footer: ' © App '
    },
    form: {
        success: 'success',
        error: 'error'
    },
    tasks: {
        title: 'Tasks',
        form_name: 'Name',
        form_createDate: 'Create Date',
        form_dueDate: 'Due Date',
        form_assignee: 'Assignee',
        form_folder: 'Folder',
        form_priority: 'Priority',
        form_create: form_base.create,
        form_edit: form_base.edit,
        form_remove: form_base.remove,
        form_openTask: 'Open task',
        form_closeTask: 'Close task'
    },
    folders: {
         form_name: form_base.name,
         form_edit: form_base.edit,
         form_create: form_base.create,
         form_remove: form_base.remove
    },
    comments: {
        form_title: 'Comments',
        form_viewAll: 'View All',
        user: 'user',
        list_title: 'Comments of',
        form_user: form_base.user,
        form_message: 'Message',
        form_submit: form_base.submit
    }
};



