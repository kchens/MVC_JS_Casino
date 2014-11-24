// Namespacing to Casino object

// Shortcut for: $(document).ready(function() {})

// 'Kicks off the game'. Calls Casino' Dealer's start function


// Models
 //create a constructor pattern of model Die
	  // Capital text for 'magic'/'static' numbers. Set SIDE_COUNT constant to arbitrary number of sides.
	 // Underscore for 'protected'/'local' methods. Set a value variable to the generateRandomValue() invoked method.


//create a prototype pattern for Die
	//create a roll function
		//set this value to  generateRandomValue() invoked method.

	// Helper Methods
	// define _generateRandomValue method. Underscore for "local methods"
		// function should return the floor of a random number multiplied by the SIDE_COUNT

// create a constructor pattern for model Game. Takes an DieFactory instance of model Die as a parameter.
	 //set the DieFactory to the parameter DieFactory
	 // set a variable dice to an array that holds all the die

 // use the prototype pattern to hold other functions for Game
	//create an addDie function
		 // it pushes a new instance of dieFactory to the dice.

	 //create a roll dice function
		// Alternatively use array methods for-in loop, .forEach, or Underscore
		 //iterate through the collection of dice
			// set a temporary die variable to the iterated die
			 // roll the die

		// create a clear dice function
		// set a dice collection to an empty array

// Views
// create a constructor function Display
	//create a constant DIE_CLASS_NAME that refers to the 'die' html class
	//create a constant DICE_CONTAINER_NAME that refers to the 'dice' class
	// set a diceContainer to DICE_CONTAINER_NAME

 // create a prototype pattern to hold Display functions
	// create a dieTemplate function. Takes a value parameter
		//it will return an html div with the proper DIE_CLASS_NAME. It places the parameter value inside the divs.
	// create a compileDiceTemplate. it take dice as a variable.
		// set the diceTemplate to an empty string
		// iterate through the dice
			 // set the die to a dice at the index
			 //keep adding a new dieTemplate to the dice template. The dieTemplate takes a value from the die.

		 // return the diceTempalte

	 // create a render function. it takes a variable dice.
		 //call the jQuery empty() function on the diceContainer to empty the diceContainer
		 // append the compileDiceTemplate to diceContainer


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
 // set a variable casino die to an uninvoked Die
 // set the casino game to a new Game with the Casino's Die

// View Declarations
 // set the Casino's Display to an invoked Display

// Controller Declarations
 // set the Casino's dealer to a new Dealer with the Casino Game and Casino Display

// P.S. Use your browser's dev tools for all your problems!!
// i.e. Chrome console!! :)
