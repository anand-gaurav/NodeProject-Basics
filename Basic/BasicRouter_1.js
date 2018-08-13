'use strict';
const http = require('http');
const url = require('url');

let routes = {
    'GET' : {
        '/': (req, res) =>{
            res.writeHead(200,{'content-type':'text/html'});
            res.end('<h1> Hello Router </h1>');
        }

    },
    'POST' : {

    },
    'NA': (req, res) =>{
        res.writeHead(404);
        res.end('Content not found');
    }
}
function router(req, res){
    //http://localhost:3000/api/getinfo?prod=car&colour=red
    let baseUri = url.parse(req.url);
    console.log(baseUri);
    console.log('Request route: '+ req.url);
    console.log('Request method: '+ req.method);
        res.writeHead(200,{'content-type':'text/html'});
        res.end('<h1> Hello Router </h1>');
}
http.createServer(router).listen(3000, ()=>{
    console.log('Server running on port 3000'); 
});
