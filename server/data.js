/**
 * Created by alexn555 on 7/5/2017.
 *  Data - get all needed data from server
 */



function start(app, db, dbObj, FRONTEND_PATH) {

    app.get('/data/folders', function (req, res) {
        let userData = req.body;
        const data = [
            { id: 0, name: 'A new folder' },
            { id: 1, name: 'A new folder2'}
        ];
        res.json(outResult(1, 0, data));
    });

    app.get('/data/tasks', function (req, res) {
        let userData = req.body;
        const data = [
            {
                id: 0, fid: -1, createDate: 1498146585, dueDate: 1528146585,
                name: 'A new task', assignee: 'Alex', priority: 'HIGH', status: 'OPEN'
            },
            {
                id: 1, fid: -1, createDate: 1498198145, dueDate: 1528146585,
                name: 'A second task', assignee: '', priority: 'LOW', status: 'CLOSED'
            },
            {
                id: 2, fid: -1, createDate: 1498198145, dueDate: 1528146585,
                name: 'A second task 5', assignee: '', priority: 'LOW', status: 'OPEN'
            }
        ];

        res.json(outResult(1, 0, data));
    });

    app.get('/data/comments', function (req, res) {
        let userData = req.body;
        const data = [
            //{id: 0, taskId: 0, user: 'Alex', msg: 'В пятницу toro Rosso неплохо выглядели в Баку на фоне соперников и избежали серьезных инцидентов, несмотря на сложные условия на трассе. Руководитель команды Франц Тост говорил о задачах в третьей тренировке и осторожности гонщиков... Франц Тост: «По сравнению с пятницей мы не так много изменили в машине – это небольшие корректировки настроек подвески, аэродинамики… Что касается наших задач на третью тренировку, прежде всего, мы хотим понять, правильно ли выбрано направление работы с настройками. Сейчас температура трассы гораздо выше, чем ожидается в квалификации. Тем не менее, мы хотим выяснить, как работают настройки, резина, и какие позиции занимают наши машины. Именно поэтому мы дали гонщикам возможность проехать много кругов, чтобы они вошли в ритм и собрали максимум информации.'}
        ];

        res.json(outResult(1, 0, data));
    });

}


function outResult(successCode, errCode, data){
    return { success: successCode, code: errCode, data: data};
}


exports.start = start;
