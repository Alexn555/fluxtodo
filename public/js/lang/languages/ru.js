/**
 * Created by alexn555 on 6/24/2017.
 */


const form_base = {
    create: 'Создать',
    name: 'Имя',
    user: 'Юзер',
    edit: 'Редактировать',
    remove: 'Удалить',
    submit: 'Готово'
};

export const LangRu = {
    menu: {
        home: 'Главная',
        comments: 'Комментарии',
        tasks: 'Задачи',
        create_task: 'Н.Задача',
        create_folder: 'Н.Папка'
    },
    common: {
        application: 'Application',
        home_title: 'Главная',
        home_heading: 'Инструкция',
        home_desc: 'Flux React решение',
        page_not_found: 'Страница не найдена',
        to_home_page: 'на главную',
        footer: ' © App '
    },
    form: {
        success: 'удача',
        error: 'ошибка'
    },
    tasks: {
        title: 'Задачи',
        form_name: 'Имя',
        form_createDate: 'Дата создания',
        form_dueDate: 'Дата окончания',
        form_assignee: 'Ответственный',
        form_folder: 'Папка',
        form_priority: 'Приортет',
        form_create: form_base.create,
        form_edit: form_base.edit,
        form_remove: form_base.remove,
        form_openTask: 'Открыть',
        form_closeTask: 'Закрыть'
    },
    folders: {
        form_name: form_base.name,
        form_edit: form_base.edit,
        form_create: form_base.create,
        form_remove: form_base.remove
    },
    comments: {
        form_title: 'Комментарии',
        form_viewAll: 'Просмотр всех',
        user: 'пользователь',
        list_title: 'Комментарии задачи',
        form_user: form_base.user,
        form_message: 'Сообщение',
        form_submit: form_base.submit
    }
};
