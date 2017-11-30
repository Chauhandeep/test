const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();//create an app

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');//setting view engine

app.use((request,response,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n');
  next();
});//registering middleware

// app.use((request,response,next)=>{
//   response.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));//middleware

hbs.registerHelper('getCurrentYear' , ()=>{
  return new Date().getFullYear();
  // return 'fuck';
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/',(request,response)=>{
  // response.send('<h1>hello</h1>');
  response.render('home.hbs',{
    welcomeMessage: 'Welcome to my Webiste',
    pageTitle : 'Home Page',
  });
});

app.get('/about',(request,response)=>{
  // response.send('About Page');
  response.render('about.hbs',{
    pageTitle : 'About Page',
  });
});

app.get('/bad',(request,response)=>{
  response.send({
    errorMessage : 'Unable to handle Request'
  });
});

app.listen(3000,()=>{
  console.log('Server is up on port 3000');
});
