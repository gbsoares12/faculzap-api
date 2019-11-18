"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var restify = require("restify");
var corsMiddleware = require("restify-cors-middleware");
var ical = require('ical');
var server = restify.createServer({
    name: 'fazulzap-api',
    version: '1.0.0'
});
var corsOptions = {
    preflightMaxAge: 10,
    origins: ['*'],
    allowHeaders: ['authorization'],
    exposeHeaders: ['x-custom-header']
};
var cors = corsMiddleware(corsOptions);
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.get('/calendar', function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
    var months, jsonCalendar;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(request.body);
                response.contentType = 'application/json';
                months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                jsonCalendar = [];
                return [4 /*yield*/, ical.fromURL('https://www.moodle.udesc.br/calendar/export_execute.php?userid=75768&authtoken=00c2714ee500cd59816b788a90a386c195d56c15&preset_what=all&preset_time=monthnow', {}, function (err, data) {
                        for (var k in data) {
                            if (data.hasOwnProperty(k)) {
                                var ev = data[k];
                                if (data[k].type == 'VEVENT') {
                                    jsonCalendar.push({
                                        "titulo": ev.summary,
                                        "data_inicio": ev.start,
                                        "mes": months[ev.start.getMonth()],
                                        "data_fim": ev.end
                                    });
                                    //console.log(`${ev.summary} on the ${ev.start.getDate()} of ${months[ev.start.getMonth()]} at ${ev.start.toLocaleTimeString('pt-BR')}`);
                                }
                            }
                        }
                        response.json(jsonCalendar);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, next()];
        }
    });
}); });
server.post('/calendarEnvio', function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
    var months, jsonCalendar;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(request.body["urlCalendar"]);
                response.contentType = 'application/json';
                months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                jsonCalendar = [];
                return [4 /*yield*/, ical.fromURL(request.body["urlCalendar"], {}, function (err, data) {
                        for (var k in data) {
                            if (data.hasOwnProperty(k)) {
                                var ev = data[k];
                                if (data[k].type == 'VEVENT') {
                                    jsonCalendar.push({
                                        "titulo": ev.summary,
                                        "data_inicio": ev.start,
                                        "mes": months[ev.start.getMonth()],
                                        "data_fim": ev.end
                                    });
                                    //console.log(`${ev.summary} on the ${ev.start.getDate()} of ${months[ev.start.getMonth()]} at ${ev.start.toLocaleTimeString('pt-BR')}`);
                                }
                            }
                        }
                        response.json(jsonCalendar);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, next()];
        }
    });
}); });
server.listen(3000, function () {
    console.log("API is running on http://localhost:3000");
});
