'use strict';
const http = require('http');
const url = require('url');
const qs = require('querystring');

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
            //good place to fetch data from db and respond as JSON
            res.writeHead(200,{'content-type':'application/json'});
            res.end(JSON.stringify(req.reqParams));
            // output : {"prod":"car","colour":"red"}
        }

    },
    'POST' : {
        //http://localhost:3000/api/login - use postman to invoke post request
        //form url encoded data as key value pair username=johndoe password=mrrobot
        '/api/login': (req,res) =>{
            let body ='';
            // req.on is an inbuit function in req object which will listen to event named 'data'
            //data is chunk of data receviced by http server
            req.on('data', data =>{
                body += data;
                if(body.length > 2097152){ // > than 2 Mb
                    res.writeHead(413,{'content-type':'text/html'});
                    res.end('<h3>Error: File uploaded is exceeds 2 Mb limit</h3>',
                    ()=>req.connection.destroy());
                    //funtion within end call to close the connection not to accept any further data
                }
            });
            //this code will listen to event 'end'
            req.on('end',()=>{
                //console.log(body);
                // Good place to query a db to see if the user exists
                //If so, send a JSON response to the SPA
                let params = qs.parse(body);
                console.log('Username: '+ params['username']);
                console.log('Password: '+ params['password']);
                res.end();
            })
        }

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
//this returns an instance of http.Server
http.createServer(router).listen(3000, ()=>{
    console.log('Server running on port 3000'); 
});
