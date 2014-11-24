// Namespacing to Casino object
var Casino = Casino || {};

// Shortcut for: $(document).ready(function() {})
$(function() {

});

// 'Kicks off the game'. Calls Casino' Dealer's start function


// Models
function Die() {
	this.SIDE_COUNT = 6;
	this.value = this._generateRandomValue();
}

Die.prototype = {
	roll: function() {
		this.value = this._generateRandomValue();
		console.log(this.value);
	},
	_generateRandomValue: function() {
		return Math.floor( Math.random() * this.SIDE_COUNT + 1 )
	}
}


function Game(DieFactory) { // DieFactory is actually the definition
	this.DieFactory = DieFactory;
	this.dice = [];
}

Game.prototype = {
	addDie: function() { // no need for dieFactory parameter..
		this.dice.push(new this.DieFactory()); // ..simply invoke the dieFactory whenever addDie is invoked
	},
	rollDice: function() {
		for (var index = 0; index < this.dice.length; index++ ) {
			var die = this.dice[index];
			die.roll();
		}
	},
	clearDice: function() {
		this.dice = [];
	}
}

// Views

function Display() {
	// list down all the classes you'll work with that are already
	// in the HTML. Then list the HTML classes that you will attach
	this.DIE_CLASS_NAME = 'die';
	this.DICE_CONTAINER_NAME = '.dice';
	this.diceContainer = $(this.DICE_CONTAINER_NAME);
}

Display.prototype = {
	dieTemplate: function(value) {
		return "<div class=\'" + this.DIE_CLASS_NAME + "\'>" + value + "</div>";
	},
	compileDiceTemplate: function(dice) {
		var diceTemplate = "";
		for (var index = 0; index < dice.length; index++) {
			var die = dice[index];
			diceTemplate += this.dieTemplate(die.value);
		}
		return diceTemplate;
	},
	render: function(dice) {
		this.diceContainer.empty();
		this.diceContainer.append(this.compileDiceTemplate(dice));
	}
}


// Controllers
 // create a Dealer constructor. it takes variables 'game' and 'display'.
	 // set the dealer's game variable to the 'game'
	 // set the dealer's display varaible to 'display'


 // create a prototype pattern to hold the dealer's functions:  start, addDie, rollDice, clearDice, updateView, bindEventListeners
	 // the start function
		 // // call the bindEventlisteners function

	// the addDie function
		// call the 'game's addDie function on this dealer
		 // updateView on this dealer

	 // the rollDice function
		 // call the 'game's rollDice function
		 // call the updateView function

	// the clearDice function
		 // calls the 'game' model method clearDice on this Dealer
		 // calls this Dealer's updateView method

	// the updateView function
		// calls the Display's render function. Renders this Dealer's Game's dice.


		// Two options for managing scope
		// 1. self, _this, that (as implemented)
		// 2. Bind

		// set the Dealer this to a self variable
		 // when '.add' class is clicked
			// run teh Dealer's addDie function


		 // same with '.roll'


		// same with '.clear'


// Model Declarations

Casino.Die = Die; //must set die to definition. So no "new" or '()'
 // set the casino game to a new Game with the Casino's Die
Casino.Game = new Game(Casino.Die);

// View Declarations
 // set the Casino's Display to an invoked Display
 Casino.Display = new Display()

// Controller Declarations
 // set the Casino's dealer to a new Dealer with the Casino Game and Casino Display

// P.S. Use your browser's dev tools for all your problems!!
// i.e. Chrome console!! :)
