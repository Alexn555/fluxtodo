/**
 * Created by alexn555 on 6/22/2017.
 *
 * Data (Models)
 */

import $ from 'jquery';
const GET_FROM_SERVER = false;

export function getTasks(Priorities, Statuses) {
    let dataRes = [];
    if (GET_FROM_SERVER) {
            $.ajax({
                url: '/data/tasks',
                global: false,
                type: 'GET',
                data: {},
                async: false,
                success: (res) => {
                    console.log(' gotten tasks ' + JSON.stringify(res.data));
                    dataRes = res.data;
                }
            });
    } else {
        dataRes = [
            /*{
                id: 0, fid: -1, createDate: 1498146585, dueDate: 1528146585,
                name: 'A new task', assignee: 'Alex', priority: Priorities.HIGH, status: Statuses.OPEN
            },
            {
                id: 1, fid: -1, createDate: 1498198145, dueDate: 1528146585,
                name: 'A second task', assignee: '', priority: Priorities.LOW, status: Statuses.CLOSED
            },
            {
                id: 2, fid: -1, createDate: 1498198145, dueDate: 1528146585,
                name: 'A second task 5', assignee: '', priority: Priorities.LOW, status: Statuses.OPEN
            }*/
        ];
    }

    return dataRes;
}

export function getFolders(){
    //decided not use taskIds, tasks already know to which folders they belong to
    let dataRes = [];
    if (GET_FROM_SERVER) {
        $.ajax({
            url: '/data/folders',
            global: false,
            type: 'GET',
            data: {},
            async: false,
            success: (res) => {
                console.log(' gotten folders ' + JSON.stringify(res.data));
                dataRes = res.data;
            }
        });
    } else {
        dataRes = [
            //{ id: 0, name: 'A new folder' },
            //{ id: 1, name: 'A new folder2'}
            // { id: number,  name: string,  taskIds = [ array of task Ids ] }
        ];
   }

    return dataRes;
}

export function getComments(){
    let dataRes = [];
    if (GET_FROM_SERVER) {
        $.ajax({
            url: '/data/comments',
            global: false,
            type: 'GET',
            data: {},
            async: false,
            success: (res) => {
                console.log(' gotten comments ' + JSON.stringify(res.data));
                dataRes = res.data;
            }
        });
    } else {
        dataRes = [
         //{id: 0, taskId: 0, user: 'Alex', msg: 'В пятницу toro Rosso неплохо выглядели в Баку на фоне соперников и избежали серьезных инцидентов, несмотря на сложные условия на трассе. Руководитель команды Франц Тост говорил о задачах в третьей тренировке и осторожности гонщиков... Франц Тост: «По сравнению с пятницей мы не так много изменили в машине – это небольшие корректировки настроек подвески, аэродинамики… Что касается наших задач на третью тренировку, прежде всего, мы хотим понять, правильно ли выбрано направление работы с настройками. Сейчас температура трассы гораздо выше, чем ожидается в квалификации. Тем не менее, мы хотим выяснить, как работают настройки, резина, и какие позиции занимают наши машины. Именно поэтому мы дали гонщикам возможность проехать много кругов, чтобы они вошли в ритм и собрали максимум информации.'}
         // { id: number,  taskId: number, user: string, msg: string }
        ];
    }

    return dataRes;
}