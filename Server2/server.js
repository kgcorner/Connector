'use-strict'
import Hapi from 'hapi';
import http from './http';
import fs from 'fs';


let server = new Hapi.Server();
let requests = [];
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}

function onFundRequest() {

}

function onFundApproval() {

}

let app = () =>{
    server.connection({port:3302,host:'localhost', routes: {cors:{"headers":["Accept", "Authorization", "Content-Type", "If-None-Match", "x-user-id"]}}});
    server.route({
        method: 'POST',
        path: '/funds',
        config: {
            payload:{
                  maxBytes: 209715200,
                  output:'stream',
                  parse: true
            }, 
            handler: function (request, reply) {

                let command = request.query.command;
                if(command == "request") {
                    let name = makeid();
                    let path = __dirname+"/uploads/"+ name;
                    let error = false;
                    let fundOnBill = request.payload["fundOnBill"];
                    let message = request.payload["message"];
                    request.payload["document"].pipe(fs.createWriteStream(path));
                    request.payload["document"].on('error', function (err) { 
                        console.error(err);
                        error = true;
                    });
                    request.payload["document"].on('end', function(err){
                        console.log("completed");
                        if(!error) {
                            let request1 = {};
                            request1.id = name;
                            request1.fundOnBill = fundOnBill;
                            request1.message = message;
                            request1.totalApproved = 0;
                            requests.push(request1);
                            reply(request1).code(201);
                        }
                        else {
                            reply("Error occured in uploading document").code(500);
                        }
                    })
                }
                else {
                    if(command == "approve") {
                        for(let index = 0; index< requests.length; index++) {
                            if(request.payload["id"] == requests[index].id) {                                
                                let totalApproved = request.payload["totalApproved"];
                                requests[index].totalApproved = totalApproved;
                                reply(requests[index]);
                                break;
                            }
                        }
                    }
                    else {
                        reply("Request not found with ID "+request.payload["id"]).code(400);
                    }
                }

                
            }
      }        
    }); 
    
    server.route({
        method: 'GET',
        path: '/funds/{id}',
        handler: function (request, reply) {
            let found = false;
            let id = request.params.id;
            for(let index = 0; index< requests.length; index++) {
                if(id == requests[index].id) {                                                    
                    reply(requests[index]);
                    found = true;
                    break;
                }
            }
            if(!found) {
                reply("Request not found").code(404);
            }
        }
    });
    
    

    // server.route({
    //     method: 'POST',
    //     path: '/uploadFile',
    //     handler: function (request, reply) {
            
    //     }
    // });

    server.start((err)=>{
        if(err){
            throw err;
        }
    console.log("Hapi Is happily serving at ${server.info.uri}");
    });
}
app();
//app.startServer();