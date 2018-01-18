import http from "http";

module.exports.request = (host, port, path, headers, callback, method) => {

    var options = {
        host: host,
        port: port,
        path: path,
        method: method,
        headers: headers
    };

    var x = http.request(options,function(res){
        console.log("Connected");
        let response = "";
        res.on('data',function(data){
            response+=data;
           // console.log("data is :"+data);
            
        });
        res.on('end', function(err){
            callback(response);
        })
       
        
    });
    
    x.end();    
    
}