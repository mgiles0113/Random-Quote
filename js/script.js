/******************************************************************************
 * Author: Mark Giles
 * Filename: script.js
 * Last Modified: 12/9/2016
 * Description:
 *
 * Resources:
 *   - Name:    The Modern Servant Leader - Servant Leadership - 12/9/2016
 *     URL:     http://modernservantleader.com/resources/leadership-quotes-for-servant-leaders/#leadership
 *     Purpose: This resource was used to provide the quote content on this
 *              page.
 *****************************************************************************/

/******************************************************************************
 *                            GLOBAL SCOPE VARIABLES
 *****************************************************************************/
// button used to view the next quote
var loadQuoteButton = document.getElementById('loadQuote');
// when loadQuote button is clicked, call member method printQuote()
loadQuoteButton.addEventListener("click", processNewQuote, false);
// html element to contain the quote text on the page
var quoteBox = document.getElementById('quote-box');
// used to automatically change the quote every 10 seconds
var autoQuoteInterval;
// body element to change random background color
var htmlBody = document.getElementsByTagName("body")[0];
// values in the normal hex range
var hexValues = [
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'A',
	'B',
	'C',
	'D',
	'E',
	'F'
];
// array of quotes to be randomly selected and displayed to the screen
var quotes = [ 
	{ 
		quote : 'Your focus determines your reality.',
		source : 'Qui-Gon Jinn',
		citation : 'The Phantom Menace',
		year : '1999',
		tags : [
			'focus',
			'jedi'
		]
	},
	{ 
		quote : 'Do. Or do not. There is no try.',
		source : 'Yoda',
		citation : 'The Empire Strikes Back',
		year : '1980',
		tags : [
			'leadership',
			'accountability',
			'jedi'
		]
	},
	{ 
		quote : 'In my experience there is no such thing as luck.',
		source : 'Obi-Wan Kenobi',
		citation : 'A New Hope',
		year : '1977',
		tags : [
			'leadership',
			'accountability',
			'jedi'
		]
	},
	{ 
		quote : 'You will find that many of the truths we cling to depend greatly on our own point of view',
		source : 'Obi-Wan Kenobi',
		citation : 'Return of the Jedi',
		year : '1983',
		tags : [
			'leadership',
			'accountability',
			'jedi'
		]
	},
	{
		quote : 'It is a shame that so many leaders spend their time pondering their rights as leaders instead of their awesome responsibilities as leaders.',
		source : 'James C. Hunter',
		citation : 'The Servant',
		year : '1998',
		tags : [
			'leadership',
			'servant leadersihp',
			'accountability'
		]
	},
	{ 
		quote : '…leaders who do not hold their people accountable to a set standard are, in effect, thieves and liars. Thieves because they are stealing from the stockholder who pays them to hold people accountable, and liars because they pretend that everything is OK with their people when in fact everything is not OK.',
		source : 'James C. Hunter',
		citation : 'The Servant',
		year : '1998',
		tags : [
			'leadership',
			'accountability'
		]
	},
	{ 
		quote : "It's not my job to steer the ship,<br>" +
				"The horn I’ll never blow.<br>" +
				"It’s not my place to say how far<br>" +
				"The ship’s allowed to go.<br>" +
				"I’m not allowed to go on deck<br>" +
				"Or even clang the bell<br>" +
				"But if this damn thing starts to sink<br>" +
				"Just watch who catches hell!",
		source : 'Unkown via James C. Hunter',
		citation : 'The Servant',
		year : '1998',
		tags : [
			'leadership',
			'accountability'
		]
	},
	{ 
		quote : 'A leader – whether in the home, church, business, community, or government – has authority due to her role, but her positional power will not bring about good for individuals or organizations unless it is backed up by the capital of character.',
		source : 'Dan B. Allender',
		citation : 'Leading with a Limp',
		year : '2008',
		tags : [
			'leadership',
			'authority'
		]
	},
	{ 
		quote : 'Authority cannot be bought or sold, given or taken away.',
		source : 'James C. Hunter',
		citation : 'The Servant',
		year : '1998',
		tags : [
			'leadership',
			'authority'
		]
	},
	{ 
		quote : 'Authority is always built on service and sacrifice.',
		source : 'James C. Hunter',
		citation : 'The Servant',
		year : '1998',
		tags : [
			'leadership',
			'authority'
		]
	},
	{ 
		quote : 'Either we heal now, as a team, or we will die as individuals.',
		source : 'Al Pacino',
		citation : 'Any Given Sunday',
		year : '1999',
		tags : [
			'leadership',
			'teamwork'
		]
	},
	{ 
		quote : 'Adversity doesn’t develop character as much as it reveals character.',
		source : 'Dr. Tony Baron',
		citation : 'The Art of Servant Leadership',
		year : '2013',
		tags : [
			'leadership',
			'servant leadership'
		]
	},
	{ 
		quote : 'For most leaders, humility comes only by wounds suffered from foolish falls.',
		source : 'Dan B. Allender',
		citation : 'Leading with a Limp',
		year : '2008',
		tags : [
			'leadership',
			'servant leadership',
			'humility'
		]
	},
	{ 
		quote : 'To experience brokenness and humiliation all you have to do is lead.',
		source : 'Dan B. Allender',
		citation : 'Leading with a Limp',
		year : '2008',
		tags : [
			'leadership',
			'servant leadership',
			'humility'
		]
	},
	{ 
		quote : "It’s not about trying to find something to help you be a more effective leader. It’s about trying to be a better person. The other will follow.",
		source : 'James A. Autry',
		citation : 'Practicing Servant Leadership',
		year : '2004',
		tags : [
			'leadership',
			'servant leadership'
		]
	},
	{ 
		quote : "You can only lead others as far as you are willing to go.",
		source : 'Dr. Tony Baron',
		citation : 'The Art of Servant Leadership',
		year : '2013',
		tags : [
			'leadership',
			'servant leadership'
		]
	},
	{ 
		quote : "There is no success without a successor.",
		source : 'Peter Drucker',
		tags : [
			'leadership',
			'servant leadership',
			'success'
		]
	},
	{ 
		quote : "The role of a servant leader is to stimulate what is already within the person.",
		source : 'Dr. Tony Baron',
		citation : 'The Art of Servant Leadership',
		year : '2013',
		tags : [
			'leadership',
			'servant leadership',
		]
	},
	{ 
		quote : "The high destiny of the individual is to serve rather than rule.",
		source : 'Albert Einstein',
		tags : [
			'leadership',
			'servant leadership',
		]
	},
	{ 
		quote : "The key to successful leadership today is influence, not authority.",
		source : 'Ken Blanchard',
		tags : [
			'leadership',
			'servant leadership',
			'influence'
		]
	}
];

// temporary storage for used quotes to avoid showing the same quote twice
var usedQuotes = [ ];

// begins the looping interval that presents a new quote every 10 seconds
function startAutoQuote() {
	autoQuoteInterval = setInterval(function() {
		processNewQuote();
	}, 10000);
}

// stops the looping interval that presents a new quote every 10 seconds
function stopAutoQuote() {
	clearInterval(autoQuoteInterval);
}

// retrieves a random quote from an array and replaces the qutoe on the screen
function printQuote() {
	// stores the randomly selected quote
	var quote = getRandomQuote();
	// detects if there was an issue retrieving a new quote
	if (!quote) {
		console.log('No quote retrieved');
		return 1;
	}
	// builds the html elements to display the quote to the screen
	var html = '<p class="quote">';
	html += quote.quote;
	html += '</p>';
	html += '<p class="source">';
	html += quote.source;
	// optional parameters are only added if they exist
	if (quote.citation)
		html += '<span class="citation">' + quote.citation + '</span>';
	if (quote.year)
		html += '<span class="year">' + quote.year + '</span>';
	html += '</p>';
	// replaces the html in the quote box element
	document.getElementById('quote-box').innerHTML = html;
}

// retrieves a random quote from the quoets array and saves it in the usedQuotes array 
function getRandomQuote() {
	// if all quotes have been used, refill the quotes array with the used quotes
	if (quotes.length === 0) {
		quotes = usedQuotes;
		// empties the used quotes to be filled in again as quotes are processed
		usedQuotes = [ ];
	}
	// return random quote
	var random = Math.floor(Math.random() * (quotes.length));
	// removes a quote from the quotes array at the randomly selected index
	var quote = quotes.splice(random, 1)[0];
	// adds the quote to the used quotes list
	usedQuotes.push(quote);
	// logs to the console to demonstrate quotes are not used twice
	console.log(quote.quote);
	// returns the randomly selected quote object
	return quote;
}

// builds a random hex color formatted for CSS
function getRandomHexColor() {
	// hex color begins with # in CSS
	var randomHexColor = "#";
	// randomly selects valid hex value (1-10, A-F) and adds to the color string
	for (var i = 0; i < 6; i++) {
		randomHexColor += hexValues[Math.floor(Math.random() * (hexValues.length))];
	}

	// returns the formatted hex color ready for use in CSS
	return randomHexColor;
}

// changes the color of the html body element with a randomly generated color
function changeBodyColor() {
	htmlBody.style.backgroundColor = getRandomHexColor();
}

// stops looping quote, changes the body color, replaces the quote text, and
// restarts the loop
function processNewQuote() {
	stopAutoQuote();
	changeBodyColor();
	printQuote();
	startAutoQuote();
}

// initial quote randomly selected when the page loads
processNewQuote();