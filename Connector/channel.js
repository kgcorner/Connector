import http from './http';

let channels = [];

module.exports = {
    add : (channel, callback) =>{
        let err = {};  
        if(channel.identifier) {
            let valid = true;
            for(let index = 0; index< channels.length; index++ ) {
                              
                if(channels[index].identifier == channel.identifier) {
                    err.message = "Channel with identifier "+ channel.identifier+" already exists";
                    callback(null, err);
                    valid = false;
                    break;
                }                
            }

            if(valid) {
                if(channel.steps && channel.steps instanceof Array) {
                    valid = true;
                    for(let index =0; index< channel.steps.length; index++) {
                        if(!channel.steps[index].source) {
                            err.message = "Each steps must have single source";    
                            valid = false;                            
                            callback(null, err);
                            break;
                        }
                        else {
                            if( !channel.steps[index].destination) {
                                err.message = "Each steps must have single destination"; 
                                 valid = false;                            
                            callback(null, err);   
                                callback(null, err);
                            }
                        }
                    }
                    if(valid) {
                        channels.push(channel);
                        err.message = "Channel has been added sucesfully";
                        callback(err, null);
                    }
                }
                else {
                    err.message = "Channel needs array of steps";
                    callback(null, err);
                }
            }
        } else{
            let err = {};
            err.message = "Can't create channel without identifier";
            callback(null, err);
        }
    },

    remove : (identifier) => {
        let found = false;
        for(let index = 0; index< channels.length; index++ ) {
            let err = {};                
            if(channels[index].identifier == channel.identifier) {
                channels.splice(index, 1);
                err.message = "Channel with identifier "+ channel.identifier+" removed";
                callback(err, null);
                found = true;
                break;
            }                
        }
        if(!found) {
            err.message = "Channel with identifier "+ channel.identifier+" not found";
            callback(null, err);
        }
    },
    process : (channel, step, request, callback) =>{
        let found = false;
        for(let index = 0; index< channels.length; index++ ) {
            let err = {};                
            if(channels[index].identifier == channel) {
                channel = channels[index];
                found = true;
                break;
            }                
        }
        if(found) {
            found = false;
            for(let index = 0; index< channel.steps.length; index++ ) {
                if(channel.steps[index].identifier == step) {
                    step = channel.steps[index];
                    found = true;
                    break;
                }
            }
            if(found) {
                let mapping = step.mapping;
                let destObject = getDestObject(mapping, request.payload);
                let destUrl = step.destination.endpoint;
                let destMethod = step.destination.method;
                let destContentType = step.destination.contentType;
                let destHeaders = step.destination.headers;
                let host = getHost(destUrl);
                let port = getPort(destUrl);
                let path = getPath(destUrl);
                destHeaders["Content-Type"] = destContentType;
                http.request(host, port, path, destHeaders, destMethod, destObject, (data)=>{
                    console.log("Data:"+ data);
                    callback(data);
                })
            }
            else {
                let err = {};
                err.message = "Step with identifier "+ channel.identifier+" not found in channel "+ channel.identifier;
                callback(null, err);
            }
        }
        else {
            let err = {};
            err.message = "Channel with identifier "+ channel+" not found";
            callback(null, err);
        }
    }
}

function getDestObject(mapping, payload) {
    let output = {};
    for(let mem in mapping) {
        output[mapping[mem]] = payload[mem];
    }
    return output;
}

function getHost(url) {
    let host = url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
    if(host.indexOf(":") >0) {
        host = host.split(":")[0];
    }
    return host;
} 

function getPath(url) {
    let host=url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
    return url.substring(url.indexOf(host)+host.length);
}

function getPort(url) {
    let host=url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
    let port = host.split(":")[1];
    if(!port || port.length <1) {
        port=80;
    }
    return port;
}