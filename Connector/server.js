'use-strict'
import Hapi from 'hapi';

import {
    add,
    remove,
    process
} from './channel';

require('dotenv').config();

let channels = [];
let server = new Hapi.Server();
let app = () =>{

    






    server.connection({port:3300,host:'localhost', routes: {cors:{"headers":["Accept", "Authorization", "Content-Type", "If-None-Match", "x-user-id"]}}});
    
    server.route({
        method: 'DELETE',
        path: '/channels/{id}',
        handler: function (request, reply) {
            reply("Wroking");
        }
    });
    
    
    server.route({
        method: 'POST',
        path: '/channels',
        handler: function (request, reply) {
            let channel = request.payload;
            add(channel, (res, err)=>{
                if(!err) {
                    reply(res).code(201);
                }
                else {
                    reply(err).code(424);
                }
            })
        }
    });

    server.route({
        method: 'POST',
        path: '/channels/{cid}/processes/{sid}',
        handler: function (request, reply) {
           let channelId = request.params.cid;
           let stepid = request.params.sid;
           process(channelId, stepid, request, (data, err)=>{
               if(!data) {
                   reply(err).code(424);
               }
               else {
                   reply(data);
               }
           });
           
        }
    });
    server.register(require('inert'), (err) => {

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

        server.start((err)=>{
            if(err){
                throw err;
            }
            console.log("Hapi Is happily serving at ${server.info.uri}");
        });
    })

    
}
app();
//app.startServer();