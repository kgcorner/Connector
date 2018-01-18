"use strict";

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.request = function (host, port, path, headers, method, body, callback) {

    var options = {
        host: host,
        port: port,
        path: path,
        method: method,
        headers: headers
    };

    console.log(JSON.stringify(options));
    var x = _http2.default.request(options, function (res) {
        console.log("Connected");
        var response = "";
        console.log("Response:" + res.statusCode);
        res.on('data', function (data) {
            response += data;
            console.log("data is :" + data);
        });
        res.on('error', function (err) {
            console.error("error:" + err);
        });
        res.on('end', function (err) {
            console.error("end:" + err);
            callback(response);
        });
    });
    x.write(JSON.stringify(body));
    x.end();
};