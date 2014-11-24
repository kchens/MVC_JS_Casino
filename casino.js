var Casino = Casino || {}; // Namespacing to Casino object

// Shortcut for: $(document).ready(function() {})
$(function() {
	Casino.Dealer.start()  // 'Kicks off the game'. Calls Casino' Dealer's start function
})

// Models
function Die() { //create a constructor pattern of model Die
	this.SIDE_COUNT = 6  // Capital text for 'magic'/'static' numbers. Set SIDE_COUNT constant to arbitrary number of sides.
	this.value = this._generateRandomValue() // Underscore for 'protected'/'local' methods. Set a value variable to the generateRandomValue() invoked method.
}

Die.prototype = { //create a prototype pattern for Die
	roll: function() { //create a roll function
		this.value = this._generateRandomValue() //set this value to  generateRandomValue() invoked method.
	},
	// Helper Methods
	_generateRandomValue: function() { // define _generateRandomValue method. Underscore for "local methods"
		return Math.floor((Math.random() * this.SIDE_COUNT) + 1) // function should return the floor of a random number multiplied by the SIDE_COUNT
	}
}

function Game(DieFactory) { // create a constructor pattern for model Game. Takes an DieFactory instance of model Die as a parameter.
	this.DieFactory = DieFactory //set the DieFactory to the parameter DieFactory
	this.dice = [] // set a variable dice to an array that holds all the die
}

Game.prototype = { // use the prototype pattern to hold other functions for Game
	addDie: function() { //create an addDie function
		this.dice.push(new this.DieFactory()) // it pushes a new instance of dieFactory to the dice.
	},
	rollDice: function() { //create a roll dice function
		// Alternatively use array methods for-in loop, .forEach, or Underscore
		for (var index = 0; index < this.dice.length; index++) { //iterate through the collection of dice
			var die = this.dice[index] // set a temporary die variable to the iterated die
			die.roll() // roll the die
		}
	},
	clearDice: function() { // create a clear dice function
		this.dice = [] // set a dice collection to an empty array
	}
}

// Views
function Display() { // create a constructor function Display
	this.DIE_CLASS_NAME = 'die' //create a constant DIE_CLASS_NAME that refers to the 'die' html class
	this.DICE_CONTAINER_NAME = '.dice' //create a constant DICE_CONTAINER_NAME that refers to the 'dice' class
	this.diceContainer = $(this.DICE_CONTAINER_NAME) // set a diceContainer to DICE_CONTAINER_NAME
}

Display.prototype = { // create a prototype pattern to hold Display functions
	dieTemplate: function(value) { // create a dieTemplate function. Takes a value parameter
		return "<div class=\'"+ this.DIE_CLASS_NAME +"\'>"+ value +"</div>" //it will return an html div with the proper DIE_CLASS_NAME. It places the parameter value inside the divs.
	},
	compileDiceTemplate: function(dice) { // create a compileDiceTemplate. it take dice as a variable.
		var diceTemplate = "" // set the diceTemplate to an empty string
		for (var index = 0; index < dice.length; index++) { // iterate through the dice
			var die = dice[index] // set the die to a dice at the index
			diceTemplate += this.dieTemplate(die.value) //keep adding a new dieTemplate to the dice template. The dieTemplate takes a value from the die.
		}
		return diceTemplate // return the diceTempalte
	},
	render: function(dice) { // create a render function. it takes a variable dice.
		this.diceContainer.empty() //call the jQuery empty() function on the diceContainer to empty the diceContainer
		this.diceContainer.append(this.compileDiceTemplate(dice)) // append the compileDiceTemplate to diceContainer
	}
}

// Controllers
function Dealer(game, display) { // create a Dealer constructor. it takes variables 'game' and 'display'.
	this.game = game // set the dealer's game variable to the 'game'
	this.display = display // set the dealer's display varaible to 'display'
}

Dealer.prototype = { // create a prototype pattern to hold the dealer's functions:  start, addDie, rollDice, clearDice, updateView, bindEventListeners
	start: function() { // the start function
		this.bindEventListeners() // // call the bindEventlisteners function
	},
	addDie: function() { // the addDie function
		this.game.addDie() // call the 'game's addDie function on this dealer
		this.updateView() // updateView on this dealer
	},
	rollDice: function() { // the rollDice function
		this.game.rollDice() // call the 'game's rollDice function
		this.updateView() // call the updateView function
	},
	clearDice: function() { // the clearDice function
		this.game.clearDice() // calls the 'game' model method clearDice on this Dealer
		this.updateView() // calls this Dealer's updateView method
	},
	updateView: function() { // the updateView function
		this.display.render(this.game.dice) // calls the Display's render function. Renders this Dealer's Game's dice.
	},
	bindEventListeners: function() {
		// Two options for managing scope
		// 1. self, _this, that (as implemented)
		// 2. Bind

		var self = this // set the Dealer this to a self variable
		$('.add').on('click', function() { // when '.add' class is clicked
			self.addDie() // run teh Dealer's addDie function
		})

		$('.roll').on('click', function() { // same with '.roll'
			self.rollDice()
		})

		$('.clear').on('click', function() { // same with '.clear'
			self.clearDice()
		})
	}
}

// Model Declarations
Casino.Die = Die // set a variable casino die to an uninvoked Die
Casino.Game = new Game(Casino.Die) // set the casino game to a new Game with the Casino's Die

// View Declarations
Casino.Display = new Display() // set the Casino's Display to an invoked Display

// Controller Declarations
Casino.Dealer = new Dealer(Casino.Game, Casino.Display) // set the Casino's dealer to a new Dealer with the Casino Game and Casino Display

// P.S. Use your browser's dev tools for all your problems!!
// i.e. Chrome console!! :)
