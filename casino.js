// Namespacing to Casino object
var Casino = Casino || {};

// Shortcut for: $(document).ready(function() {})
$(function() {
	Casino.Dealer.start();
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
		console.log(this.value); // unnecessary, but good for debugging
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
function Dealer(game, display) {
	this.game = game;
	this.display = display;
}

Dealer.prototype = {
	start: function() {
		this.bindEventListeners(); // Javascript function calls require similarly named functions
	},
	addDie: function() {
		this.game.addDie();
		this.updateView();
	},
	rollDice: function() {
		this.game.rollDice();
		this.updateView();
	},
	clearDice: function() {
		this.game.clearDice();
		this.updateView();
	},
	updateView: function() {
		this.display.render(this.game.dice);
	},
	bindEventListeners: function() {
		var that = this;
		$('.add').on('click', function() {
			that.addDie();
		})
		$('.roll').on('click', function() {
			that.rollDice();
		})
		$('.clear').on('click', function() {
			that.clearDice();
		})
	}
}


// Model Declarations

Casino.Die = Die; //must set die to definition. So no "new" or '()'
 // set the casino game to a new Game with the Casino's Die
Casino.Game = new Game(Casino.Die);
// View Declarations
Casino.Display = new Display();

// Controller Declarations
Casino.Dealer = new Dealer(Casino.Game, Casino.Display);
