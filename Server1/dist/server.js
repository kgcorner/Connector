'use strict';
'use-strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _http = require('./http');

var _http2 = _interopRequireDefault(_http);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = new _hapi2.default.Server();
var employees = [];
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }return text;
}

function onFundRequest() {}

function onFundApproval() {}

var app = function app() {
    server.connection({ port: 3000, host: 'localhost', routes: { cors: { "headers": ["Accept", "Authorization", "Content-Type", "If-None-Match", "x-user-id"] } } });
    server.route({
        method: 'POST',
        path: '/funds',
        handler: function handler(request, reply) {
            var command = "request";
            if (command == "request") {
                var payload = request.payload;
                if (payload.document) {
                    var name = payload.document.hapi.name;
                    console.log(name);
                } else {
                    reply("No Document found in request").code(400);
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/fund/{id}',
        handler: function handler(request, reply) {
            var employee = request.payload;
            employee.id = makeid;
            employees.push(employee);
            var headers = {
                "X-ACCESS-TOKEN": "7pnboh2ah6me04583n59s37sak",
                "X-USER-ID": "16",
                "X-DATE-TOKEN": "1"
            };
            _http2.default.get("api.pixyfi.com", "80", "/public/feeds?page=1", headers, function (res) {
                reply(res);
            }, 'GET');
        }
    });

    // server.route({
    //     method: 'POST',
    //     path: '/uploadFile',
    //     handler: function (request, reply) {

    //     }
    // });

    server.start(function (err) {
        if (err) {
            throw err;
        }
        console.log("Hapi Is happily serving at ${server.info.uri}");
    });
};
app();
//app.startServer();