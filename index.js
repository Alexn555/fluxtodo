/**
 * Created by alexn555 on 9/30/2015.
 */

//import express from 'express';

const url = require('url'),
	path = require('path'),
    express = require('express'),
	bodyParser = require("body-parser");
	

const app = express(),
	modules = 'server',
	ENV = 'dev', //'dev' | 'prod' (prod uses build/ folders)
	PORT = 8080; //process.env.PORT	
	
const FRONTEND_DIR = ENV === 'dev' ? '/public' : '/build/public';

console.log(`server ${__dirname}  environment ${ENV}`);
console.log(' port ' + PORT);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + FRONTEND_DIR));

app.get('/',  function (req, res) {
    res.sendFile(path.join(__dirname + FRONTEND_DIR+'/index.html'));
});

app.listen(PORT);
