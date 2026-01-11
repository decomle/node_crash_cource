const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    console.log('Request made: ', req.url, req.method)
    res.setHeader('Content-Type', 'text/html');

    let count = 0;
    const greet = _.once(()=> {
        console.log('Hello once', count)
    });
    
    switch(req.url) {
        case '/':
            responseFromFile(res, '../views/index.html', onSuccess);
            break;
        case '/about':
            responseFromFile(res, '../views/about.html', onSuccess);
            break;
        case '/about-us-test':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end()
            break;
        default:
            res.statusCode = 404;
            responseFromFile(res, '../views/404.html', function() {
                res.statusCode = 404;
            });
            break;
    }

    var onSuccess = (res) => {
        res.statusCode = 200;
    }
});

const responseFromFile = (res,fileName, cb) => {
    fs.readFile(fileName, (err, data) => {
        if(err) {
            console.log('ERROR: ', err)
            res.statusCode = 500;
        }
        res.write(data);
        cb && cb(res);
        res.end()
    })
}

server.listen(3000, 'localhost', () => {
    console.log('listening for request on port 3000')
})
