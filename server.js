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
            res.json({quote: {quotesByPerson}});
        } else {
            //res.status(404).send({msg: "Author does not exists"});
            res.json({quotes});
        }
});

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.json({quote: {randomQuote}});
});

app.post('/api/quotes', (req, res, next) => {
    const newQuote = req


    const randomQuote = getRandomElement(quotes);
    res.json({quote: {randomQuote}});
});



app.listen(PORT);

