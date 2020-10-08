// require express - gives us a function
const express = require('express');
// require body-parser to parse through data
const bodyParser = require('body-parser');

// creates instance of express by calling the function
// returned above - gives us an object
const app = express();
const port = 5000;

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended: true}));



const quotesData = require('./modules/quotes.js')
let index = 0;

app.get('/quotes', (req, res) => {
    console.log('hi from get request');
    
    res.send(quotesData);
});

function randomNumber(min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min);
}

app.get('/randomQuote', (req, res) => {
    console.log('hello from random');
    let randomNumber1 = randomNumber(0, quotesData.list.length - 1);
    res.send(quotesData.list[randomNumber1]);
})

// start up server
app.listen(port, () => {
    console.log('Up and running on port: ', port);
    
});

app.post('/quotes', (req, res) => {
    console.log('hello from post', req.body);
    // push req.body to our quotesData array
    quotesData.list.push(req.body);
    res.sendStatus(200);
});

