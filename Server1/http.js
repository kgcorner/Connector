import http from "http";

module.exports.request = (host, port, path, headers, method, body, callback) => {

    var options = {
        host: host,
        port: port,
        path: path,
        method: method,
        headers: headers
    };

    console.log(JSON.stringify(options));
    var x = http.request(options,function(res){
        console.log("Connected");
        let response = "";
        console.log("Response:"+res.statusCode);
        res.on('data',function(data){
            response+=data;
           console.log("data is :"+data);
            
        });        
        res.on('error', (err)=>{
            console.error("error:"+err);
        })
        res.on('end', function(err){
            console.error("end:"+err);
            callback(response);
        })
       
        
    });
    x.write(JSON.stringify(body));
    x.end();    
    
}