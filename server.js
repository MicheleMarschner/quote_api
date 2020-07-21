const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes', (req, res, next) => {
    const author = req.query.person;
    if (author) {
        const quotesByPerson = quotes.filter(quote => {
        return quote.person === author;
        })
        res.json({quotes: quotesByPerson});
    } else {
        //res.status(404).send({msg: "Author does not exists"});
        res.json({quotes});
    }
});

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.json({quote: randomQuote});
});

app.post('/api/quotes', (req, res, next) => {
    const newQuote = {quote: req.query.quote, person: req.query.person};
    if(newQuote.quote && newQuote.person) {
        quotes.push(newQuote);
        res.status(201).json({quote: newQuote});
    } else {
        res.status(400).json();
    }
    
});

//add put & delete --> needs id on quotes

app.listen(PORT);

