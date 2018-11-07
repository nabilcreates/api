var express = require('express');
var app = express();
var port = 3030;

app.get('/' , (request,response) => {
    response.send('ehy there!')
})

app.listen(port , () => {
    console.log('Server is running!')
})