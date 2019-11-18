import * as restify from 'restify';
import * as corsMiddleware from 'restify-cors-middleware';

var ical = require('ical')

const server = restify.createServer({
    name: 'fazulzap-api',
    version: '1.0.0'
})

const corsOptions: corsMiddleware.Options = {
    preflightMaxAge: 10,
    origins: ['*'],
    allowHeaders: ['authorization'],
    exposeHeaders: ['x-custom-header']
}

const cors: corsMiddleware.CorsMiddleware = corsMiddleware(corsOptions);

server.pre(cors.preflight)
server.use(cors.actual)

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/calendar', async (request, response, next) => {
    console.log(request.body)
    response.contentType = 'application/json';

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let jsonCalendar = [];
    await ical.fromURL('https://www.moodle.udesc.br/calendar/export_execute.php?userid=75768&authtoken=00c2714ee500cd59816b788a90a386c195d56c15&preset_what=all&preset_time=monthnow', {}, function (err, data) {
       
    for (let k in data) {
            if (data.hasOwnProperty(k)) {
                var ev = data[k];
                if (data[k].type == 'VEVENT') {
                    jsonCalendar.push({
                        "titulo": ev.summary,
                        "data_inicio": ev.start,
                        "mes": months[ev.start.getMonth()],
                        "data_fim": ev.end
                    })
                    //console.log(`${ev.summary} on the ${ev.start.getDate()} of ${months[ev.start.getMonth()]} at ${ev.start.toLocaleTimeString('pt-BR')}`);
                }
            }
        }
    response.json(jsonCalendar);
    });

    return next()
})

server.post('/calendarEnvio', async (request, response, next) => {
    console.log(request.body["urlCalendar"])
    response.contentType = 'application/json';

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let jsonCalendar = [];
    await ical.fromURL(request.body["urlCalendar"], {}, function (err, data) {
       
    for (let k in data) {
            if (data.hasOwnProperty(k)) {
                var ev = data[k];
                if (data[k].type == 'VEVENT') {
                    jsonCalendar.push({
                        "titulo": ev.summary,
                        "data_inicio": ev.start,
                        "mes": months[ev.start.getMonth()],
                        "data_fim": ev.end
                    })
                    //console.log(`${ev.summary} on the ${ev.start.getDate()} of ${months[ev.start.getMonth()]} at ${ev.start.toLocaleTimeString('pt-BR')}`);
                }
            }
        }
    response.json(jsonCalendar);
    });

    return next()
})


server.listen(3000, () => {
    console.log("API is running on http://localhost:3000")
})
