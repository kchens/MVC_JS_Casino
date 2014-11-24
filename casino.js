var Casino = Casino || {}; // Namespacing to Casino object

// Shortcut for: $(document).ready(function() {})
$(function() {
	Casino.Dealer.start()  // 'Kicks off the game'
})

// Models
function Die() { //create a constructor pattern of model die
	this.SIDE_COUNT = 6  // Capital text for 'magic'/'static' numbers
	this.value = this._generateRandomValue() // Underscore for 'protected'/'local' methods. Make a set, random value
}

Die.prototype = { //create a prototype pattern
	roll: function() {
		this.value = this._generateRandomValue()
	},
	// Helper Methods
	_generateRandomValue: function() {
		return Math.floor((Math.random() * this.SIDE_COUNT) + 1)
	}
}

function Game(DieFactory) {
	this.DieFactory = DieFactory
	this.dice = []
}

Game.prototype = {
	addDie: function() {
		this.dice.push(new this.DieFactory())
	},
	rollDice: function() {
		// Alternatively use array methods for-in loop, .forEach, or Underscore
		for (var index = 0; index < this.dice.length; index++) {
			var die = this.dice[index]
			die.roll()
		}
	},
	clearDice: function() {
		this.dice = []
	}
}

// Views
function Display() {
	this.DIE_CLASS_NAME = 'die'
	this.DICE_CONTAINER_NAME = '.dice'
	this.diceContainer = $(this.DICE_CONTAINER_NAME)
}

Display.prototype = {
	dieTemplate: function(value) {
		return "<div class=\'"+ this.DIE_CLASS_NAME +"\'>"+ value +"</div>"
	},
	compileDiceTemplate: function(dice) {
		var diceTemplate = ""
		for (var index = 0; index < dice.length; index++) {
			var die = dice[index]
			diceTemplate += this.dieTemplate(die.value)
		}
		return diceTemplate
	},
	render: function(dice) {
		this.diceContainer.empty()
		this.diceContainer.append(this.compileDiceTemplate(dice))
	}
}

// Controllers
function Dealer(game, display) {
	this.game = game
	this.display = display
}

Dealer.prototype = {
	start: function() {
		this.bindEventListeners()
	},
	addDie: function() {
		this.game.addDie()
		this.updateView()
	},
	rollDice: function() {
		this.game.rollDice()
		this.updateView()
	},
	clearDice: function() {
		this.game.clearDice()
		this.updateView()
	},
	updateView: function() {
		this.display.render(this.game.dice)
	},
	bindEventListeners: function() {
		// Two options for managing scope
		// 1. self, _this, that (as implemented)
		// 2. Bind

		var self = this
		$('.add').on('click', function() {
			self.addDie()
		})

		$('.roll').on('click', function() {
			self.rollDice()
		})

		$('.clear').on('click', function() {
			self.clearDice()
		})
	}
}

// Model Declarations
Casino.Die = Die
Casino.Game = new Game(Casino.Die)

// View Declarations
Casino.Display = new Display()

// Controller Declarations
Casino.Dealer = new Dealer(Casino.Game, Casino.Display)

// P.S. Use your browser's dev tools for all your problems!!
// i.e. Chrome console!! :)
