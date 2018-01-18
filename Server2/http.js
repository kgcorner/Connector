import http from "http";

module.exports.get = (host, port, path, headers, callback) => {

    var options = {
        host: host,
        port: port,
        path: path,
        method: 'GET',
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