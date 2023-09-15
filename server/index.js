const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;
const logger = require('./logger');
//const quotes = require('./quotes.json');

const fs = require('fs');
const quotes  = JSON.parse(fs.readFileSync('quotes.json', 'utf8'));
//console.log(quotes);
app.use(express.json());
app.use(cors());
app.use(logger);

//route for /quotes/random
app.get('/quotes/random', (req, res) => {
    //console.log("get request received")
    const randIdx = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randIdx];
    res.json({quote: randomQuote})
    // res.send(quotes[randIdx]);
})

app.post("/quotes", (req, res) => {
    //console.log(req.body, "my console log!!!");

    const newQuote = req.body; 

  
    //add a new quote to the quotes array

    quotes.push(newQuote);
    //console.log(quotes);
    //save the quotes array to the quotes.json file
    fs.writeFileSync('quotes.json', JSON.stringify(quotes), 'utf8');


    res.status(201).send(newQuote);
})

app.get('/quotes', (req, res) => {  
   
    res.json(quotes)
    // res.send("All the quotes!");
})



app.listen(port, () => {
    console.log(`API listening on port number ${port}.`);
})