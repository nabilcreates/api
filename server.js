var express = require('express');
var fetch = require('node-fetch');
var app = express();
var port = 3030;

app.get('/' , (request,response) => {
    response.send(`/api/reddit/:subreddit/:limit`)
})

// REDDIT
app.get('/api/reddit/:subreddit/:limit?' , (request,response) => {
    var subreddit = request.params.subreddit;
    var limit = request.params.limit;

    fetch('https://www.reddit.com/r/' + subreddit + '/new.json?limit=' + limit)
    .then(response => response.json())
    .then(json => {
        response.send(json)
    })

})

app.listen(port , () => {
    console.log('Server is running!')
})