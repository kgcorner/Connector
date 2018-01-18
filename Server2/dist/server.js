'use strict';
'use-strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = new _hapi2.default.Server();
var app = function app() {
    server.connection({ port: 3302, host: 'localhost', routes: { cors: { "headers": ["Accept", "Authorization", "Content-Type", "If-None-Match", "x-user-id"] } } });
    server.route({
        method: 'POST',
        path: '/fund/request',
        handler: function handler(request, reply) {
            reply(request.payload);
        }
    });
    server.start(function (err) {
        if (err) {
            throw err;
        }
        console.log("Hapi Is happily serving at ${server.info.uri}");
    });
};
app();
//app.startServer();