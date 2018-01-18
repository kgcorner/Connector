'use-strict'
import Hapi from 'hapi';
import http from './http';
let server = new Hapi.Server();
let employees = [];
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}
let app = () =>{
    server.connection({port:3000,host:'localhost', routes: {cors:{"headers":["Accept", "Authorization", "Content-Type", "If-None-Match", "x-user-id"]}}});
    server.route({
        method: 'POST',
        path: '/employee',
        handler: function (request, reply) {
            let employee = request.payload;
            employee.id = makeid;
            employees.push(employee);
            let headers = {
                "X-ACCESS-TOKEN":"7pnboh2ah6me04583n59s37sak",
                "X-USER-ID":"16",
                "X-DATE-TOKEN":"1"
            };
            http.get("api.pixyfi.com", "80", "/public/feeds?page=1", headers, function(res){
                reply(res);
            }, 'GET');
        }
    });   

    server.route({
        method: 'PUT',
        path: '/transfer',
        handler: function (request, reply) {
            let headers = {
                "X-ACCESS-TOKEN":"7pnboh2ah6me04583n59s37sak",
                "X-USER-ID":"16",
                "X-DATE-TOKEN":"1"
            };
            http.get("api.pixyfi.com", "80", "/public/feeds?page=1", headers, function(res){
                reply(res);
            }, 'GET');
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