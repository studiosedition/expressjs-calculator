// Require the Express.js library and create the server object.
var express = require('express');
var app = express.createServer();

// Set the default view engine for this server. This serves a pretty basic
// purpose: later, when we tell the server to render a file, we won't need
// to provide the file extension - the server will automatically append a .jade
// file extension.
app.set('view engine', 'jade');

// Let's set up a basic route to the root of the app.
app.get('/', function (req, res) {
    // Render `views/index.jade`.
    res.render('index', {
	locals: {
	    operator: ''
	}
    });
});

// We're using verbs like "add" and "multiply" in our URLs. Let's convert these
// to words we can use in a result sentence. Ex: *Add 5 and 10* => *5 plus 10*
var corresponding_words = {
    add: 'plus',
    subtract: 'minus',
    multiply: 'multiplied by',
    divide: 'divided by'
};

// Set up a URL route so we can make requests like this:
// 
//     /multiply/2/4
//     /divide/20.12/10
// 
app.get('/:operator/:num1/:num2', function (req, res) {
    // Convert the operator given in the URL to something that will fit into
    // the result sentence, using the hash we created earlier.
    var word = corresponding_words[req.params.operator];
    
    var result = null;

    // Parse the numbers provided in the URL as floats.
    var num1 = parseFloat(req.params.num1);
    var num2 = parseFloat(req.params.num2);

    // Based on the operator string, perform the mathematical operations on the
    // parsed numbers.
    switch ( req.params.operator ) {
	case 'add':
	    result = num1 + num2;
	    break;
	case 'subtract':
	    result = num1 - num2;
	    break;
	case 'multiply':
	    result = num1 * num2;
	    break;
	case 'divide':
	    result = num1 / num2;
	    break;
    }

    // Render `views/result.jade` and provide the result variables for display.
    res.render('result', {
	locals: {
	    operator: ' :: ' + req.params.operator,
	    word: word,
	    num1: num1,
	    num2: num2,
	    result: result
	}
    });
});

// Set up the server to listen on 0.0.0.0:8000.
app.listen(8000);
