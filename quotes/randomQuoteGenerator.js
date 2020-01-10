const Quotes = require('./quotes');

function generateQuote(topic){
    let quoteTopic = topic.toLowerCase();
    const quoteArray = Quotes.Quotes[quoteTopic];
    if (quoteArray !== undefined) {
        const quote = quoteArray[Math.floor(Math.random()*quoteArray.length)];
        return quote.toString();

    }
    return null;
}

module.exports = {
    generateQuote
};