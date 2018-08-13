'use strict';
const http = require('http');
const url = require('url');

let routes = {
    'GET' : {
        '/': (req, res) =>{
            res.writeHead(200,{'content-type':'text/html'});
            res.end('<h1> Hello Router </h1>');
        },
        '/about': (req, res) =>{
            res.writeHead(200,{'content-type':'text/html'});
            res.end('<h1> This is about page </h1>');
        },
        '/api/getinfo': (req, res) =>{
            res.writeHead(200,{'content-type':'application/json'});
            res.end(JSON.stringify(req.reqParams));
            // output : {"prod":"car","colour":"red"}
        }

    },
    'POST' : {

    },
    'NA': (req, res) =>{
        res.writeHead(404);
        res.end('Content not found');
    }
}
// req and res are JS objects created by http server
function router(req, res){
    //http://localhost:3000/api/getinfo?prod=car&colour=red
    let baseUri = url.parse(req.url, true);
    console.log(baseUri);
    let resolveRoutes = routes[req.method][baseUri.pathname];
    if(resolveRoutes != undefined){
        //reqParams is user defined field added in req JS object which will store query info (prod=car&colour=red)
        req.reqParams = baseUri.query;
        resolveRoutes(req, res);
    }else{
        routes['NA'](req, res);
    }         
}
http.createServer(router).listen(3000, ()=>{
    console.log('Server running on port 3000'); 
});
