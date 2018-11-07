var express = require('express');
var fetch = require('node-fetch');
var app = express();
var port = 3030;

app.get('/', (request, response) => {
    response.send({
        api: {
            'Reddit': {
                endpoint: '/api/reddit/:subreddit/:limit?',
                params: {
                    subreddit: 'Preferred subreddit',
                    limit: 'max 100, default 25'
                }
            },
            'Bus Stops': {
                endpoint: '/api/bus/stop/:busstopnumber?',
                params: {
                    busstopnumber: 'optional, returns all bus stops if the param is not inside the link'
                }
            }
        }
    })
})

// REDDIT
app.get('/api/reddit/:subreddit/:limit?', (request, response) => {
    var subreddit = request.params.subreddit;
    var limit = request.params.limit;

    if (limit) {
        fetch('https://www.reddit.com/r/' + subreddit + '/new.json?limit=' + limit)
            .then(response => response.json())
            .then(json => {
                response.send(json)
            })
    } else {
        fetch('https://www.reddit.com/r/' + subreddit + '/new.json')
            .then(response => response.json())
            .then(json => {
                response.send(json)
            })
    }

})

// BUS STOPS
app.get('/api/bus/stop/:busstopnumber?', (request, response) => {

    var busstopnumber = request.params.busstopnumber;

    if (busstopnumber) {
        fetch('https://busrouter.sg/data/2/bus-stops.json')
            .then(response => response.json())
            .then(json => {
                var rtnvalue = json.filter(data => {
                    return data.no.match(busstopnumber)
                })

                response.send(rtnvalue)
            })
    } else {
        fetch('https://busrouter.sg/data/2/bus-stops.json')
            .then(response => response.json())
            .then(json => {
                var rtnvalue = json.filter(data => {
                    return data.no.match()
                })

                response.send(rtnvalue)
            })
    }

})

app.listen(port, () => {
    console.log('Server is running!')
})