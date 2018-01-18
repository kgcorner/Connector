"use strict";

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.get = function (host, port, path, headers, callback) {

    var options = {
        host: host,
        port: port,
        path: path,
        method: 'GET',
        headers: headers
    };

    var x = _http2.default.request(options, function (res) {
        console.log("Connected");
        var response = "";
        res.on('data', function (data) {
            response += data;
            // console.log("data is :"+data);
        });
        res.on('end', function (err) {
            callback(response);
        });
    });

    x.end();
};