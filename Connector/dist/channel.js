"use strict";

var _http = require("./http");

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var channels = [];

module.exports = {
    add: function add(channel, callback) {
        var err = {};
        if (channel.identifier) {
            var valid = true;
            for (var index = 0; index < channels.length; index++) {

                if (channels[index].identifier == channel.identifier) {
                    err.message = "Channel with identifier " + channel.identifier + " already exists";
                    callback(null, err);
                    valid = false;
                    break;
                }
            }

            if (valid) {
                if (channel.steps && channel.steps instanceof Array) {
                    valid = true;
                    for (var _index = 0; _index < channel.steps.length; _index++) {
                        if (!channel.steps[_index].source) {
                            err.message = "Each steps must have single source";
                            valid = false;
                            callback(null, err);
                            break;
                        } else {
                            if (!channel.steps[_index].destination) {
                                err.message = "Each steps must have single destination";
                                valid = false;
                                callback(null, err);
                                callback(null, err);
                            }
                        }
                    }
                    if (valid) {
                        channels.push(channel);
                        err.message = "Channel has been added sucesfully";
                        callback(err, null);
                    }
                } else {
                    err.message = "Channel needs array of steps";
                    callback(null, err);
                }
            }
        } else {
            var _err = {};
            _err.message = "Can't create channel without identifier";
            callback(null, _err);
        }
    },

    remove: function remove(identifier) {
        var found = false;
        for (var index = 0; index < channels.length; index++) {
            var _err2 = {};
            if (channels[index].identifier == channel.identifier) {
                channels.splice(index, 1);
                _err2.message = "Channel with identifier " + channel.identifier + " removed";
                callback(_err2, null);
                found = true;
                break;
            }
        }
        if (!found) {
            err.message = "Channel with identifier " + channel.identifier + " not found";
            callback(null, err);
        }
    },
    process: function process(channel, step, request, callback) {
        var found = false;
        for (var index = 0; index < channels.length; index++) {
            var _err3 = {};
            if (channels[index].identifier == channel) {
                channel = channels[index];
                found = true;
                break;
            }
        }
        if (found) {
            found = false;
            for (var _index2 = 0; _index2 < channel.steps.length; _index2++) {
                if (channel.steps[_index2].identifier == step) {
                    step = channel.steps[_index2];
                    found = true;
                    break;
                }
            }
            if (found) {
                var mapping = step.mapping;
                var destObject = getDestObject(mapping, request.payload);
                var destUrl = step.destination.endpoint;
                var destMethod = step.destination.method;
                var destContentType = step.destination.contentType;
                var destHeaders = step.destination.headers;
                var host = getHost(destUrl);
                var port = getPort(destUrl);
                var path = getPath(destUrl);
                destHeaders["Content-Type"] = destContentType;
                _http2.default.request(host, port, path, destHeaders, destMethod, destObject, function (data) {
                    console.log("Data:" + data);
                    callback(data);
                });
            } else {
                var _err4 = {};
                _err4.message = "Step with identifier " + channel.identifier + " not found in channel " + channel.identifier;
                callback(null, _err4);
            }
        } else {
            var _err5 = {};
            _err5.message = "Channel with identifier " + channel + " not found";
            callback(null, _err5);
        }
    }
};

function getDestObject(mapping, payload) {
    var output = {};
    for (var mem in mapping) {
        output[mapping[mem]] = payload[mem];
    }
    return output;
}

function getHost(url) {
    var host = url.replace('http://', '').replace('https://', '').split(/[/?#]/)[0];
    if (host.indexOf(":") > 0) {
        host = host.split(":")[0];
    }
    return host;
}

function getPath(url) {
    var host = url.replace('http://', '').replace('https://', '').split(/[/?#]/)[0];
    return url.substring(url.indexOf(host) + host.length);
}

function getPort(url) {
    var host = url.replace('http://', '').replace('https://', '').split(/[/?#]/)[0];
    var port = host.split(":")[1];
    if (!port || port.length < 1) {
        port = 80;
    }
    return port;
}