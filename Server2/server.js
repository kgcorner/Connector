'use-strict'
import Hapi from 'hapi';

let server = new Hapi.Server();
let app = () =>{
    
  







    server.connection({port:3000,host:'localhost', routes: {cors:{"headers":["Accept", "Authorization", "Content-Type", "If-None-Match", "x-user-id"]}}});
    server.route({
        method: 'GET',
        path: '/test',
        handler: function (request, reply) {
            reply("Hello World");
        }
    });   
    server.start((err)=>{
        if(err){
            throw err;
        }
    console.log("Hapi Is happily serving at ${server.info.uri}");
    });
}
app();
//app.startServer();