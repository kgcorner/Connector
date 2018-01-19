'use strict';
'use-strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _channel = require('./channel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var channels = [];
var server = new _hapi2.default.Server();
var app = function app() {

    server.connection({ port: 3300, host: 'localhost', routes: { cors: { "headers": ["Accept", "Authorization", "Content-Type", "If-None-Match", "x-user-id"] } } });

    server.route({
        method: 'DELETE',
        path: '/channels/{id}',
        handler: function handler(request, reply) {
            reply("Wroking");
        }
    });

    server.route({
        method: 'POST',
        path: '/channels',
        handler: function handler(request, reply) {
            var channel = request.payload;
            (0, _channel.add)(channel, function (res, err) {
                if (!err) {
                    reply(res).code(201);
                } else {
                    reply(err).code(424);
                }
            });
        }
    });

    server.route({
        method: 'POST',
        path: '/channels/{cid}/processes/{sid}',
        handler: function handler(request, reply) {
            var channelId = request.params.cid;
            var stepid = request.params.sid;
            (0, _channel.process)(channelId, stepid, request, function (data, err) {
                if (!data) {
                    reply(err).code(424);
                } else {
                    reply(data);
                }
            });
        }
    });
    server.register(require('inert'), function (err) {

        if (err) {
            throw err;
        }
        server.route({
            method: 'GET',
            path: '/api/{param*}',
            handler: {
                directory: {
                    path: '/work/open-source/Connector/Connector/api'
                }
            }
        });

        server.start(function (err) {
            if (err) {
                throw err;
            }
            console.log("Hapi Is happily serving at ${server.info.uri}");
        });
    });
};
app();
//app.startServer();