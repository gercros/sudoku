var app = angular.module("sudoku",[]);


var guessesTimes = 0;
var calls = {};
function stopRecursion( cant ) {

	func = arguments.callee.caller.toString() ;
	if( calls.hasOwnProperty( func ) ){
		calls[func]++;
	}else{
		calls[func] = 0;
	}

	if ( calls[func] > cant ){
		calls[func] = 0;
		err = new Error("To much recursion from: " + func );
		throw err;
	}

}




// attach the .compare method to Array's prototype to call it on any array
Array.prototype.compare = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;



    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].compare(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}





app.factory("Logic", function () {
	return {

		inputs : [],
		setUp : function() {
			this.inputs = [];
			this.playing = false;
			for(i=1; i<=3;i++){
				for(j=1; j<=3;j++){
					for(x=1; x<=3;x++){
						for(y=1; y<=3;y++){
							this.addInput({x: x, y:y , suby: i, subx: j, value: null, given: false, posibleValues: [1,2,3,4,5,6,7,8,9] }) ;
						}
					}
				}
			}
		},

		playing: false,


		testSimple: function () {

			this.setUp();
			this.modified(this.getFromPosition({x: 1, y:1 , subx: 1, suby: 1}), 6);
			this.modified(this.getFromPosition({x: 1, y:1 , subx: 3, suby: 2}), 3);

			this.modified(this.getFromPosition({x: 2, y:1 , subx: 1, suby: 1}), 4);
			this.modified(this.getFromPosition({x: 2, y:1 , subx: 2, suby: 2}), 7);
			this.modified(this.getFromPosition({x: 2, y:1 , subx: 1, suby: 3}), 1);
			this.modified(this.getFromPosition({x: 2, y:1 , subx: 3, suby: 3}), 5);

			this.modified(this.getFromPosition({x: 3, y:1 , subx: 1, suby: 2}), 9);
			this.modified(this.getFromPosition({x: 3, y:1 , subx: 2, suby: 2}), 4);
			this.modified(this.getFromPosition({x: 3, y:1 , subx: 3, suby: 2}), 5);
			this.modified(this.getFromPosition({x: 3, y:1 , subx: 1, suby: 3}), 6);
			this.modified(this.getFromPosition({x: 3, y:1 , subx: 3, suby: 3}), 2);

			this.modified(this.getFromPosition({x: 1, y:2 , subx: 2, suby: 1}), 7);
			this.modified(this.getFromPosition({x: 1, y:2 , subx: 3, suby: 1}), 6);
			this.modified(this.getFromPosition({x: 1, y:2 , subx: 1, suby: 2}), 4);
			this.modified(this.getFromPosition({x: 1, y:2 , subx: 2, suby: 2}), 3);

			this.modified(this.getFromPosition({x: 2, y:2 , subx: 2, suby: 1}), 3);
			this.modified(this.getFromPosition({x: 2, y:2 , subx: 1, suby: 2}), 5);
			this.modified(this.getFromPosition({x: 2, y:2 , subx: 3, suby: 2}), 1);
			this.modified(this.getFromPosition({x: 2, y:2 , subx: 2, suby: 3}), 4);

			this.modified(this.getFromPosition({x: 3, y:2 , subx: 2, suby: 2}), 9);
			this.modified(this.getFromPosition({x: 3, y:2 , subx: 3, suby: 2}), 7);
			this.modified(this.getFromPosition({x: 3, y:2 , subx: 1, suby: 3}), 3);
			this.modified(this.getFromPosition({x: 3, y:2 , subx: 2, suby: 3}), 1);

			this.modified(this.getFromPosition({x: 1, y:3 , subx: 1, suby: 1}), 5);
			this.modified(this.getFromPosition({x: 1, y:3 , subx: 3, suby: 1}), 8);
			this.modified(this.getFromPosition({x: 1, y:3 , subx: 1, suby: 2}), 7);
			this.modified(this.getFromPosition({x: 1, y:3 , subx: 2, suby: 2}), 6);
			this.modified(this.getFromPosition({x: 1, y:3 , subx: 3, suby: 2}), 1);

			this.modified(this.getFromPosition({x: 2, y:3 , subx: 1, suby: 1}), 6);
			this.modified(this.getFromPosition({x: 2, y:3 , subx: 3, suby: 1}), 9);
			this.modified(this.getFromPosition({x: 2, y:3 , subx: 2, suby: 2}), 8);
			this.modified(this.getFromPosition({x: 2, y:3 , subx: 3, suby: 3}), 2);

			this.modified(this.getFromPosition({x: 3, y:3 , subx: 1, suby: 2}), 2);
			this.modified(this.getFromPosition({x: 3, y:3 , subx: 3, suby: 3}), 8);

			this.stopInput();
		},

		testMedium: function () {

			this.setUp();

			this.modified( this.getFromPosition({x: 1, y:1 , subx: 1, suby: 1} ), 1);
			this.modified( this.getFromPosition({x: 1, y:1 , subx: 3, suby: 2} ), 2);
			this.modified( this.getFromPosition({x: 1, y:1 , subx: 2, suby: 3} ), 8);

			this.modified( this.getFromPosition({x: 2, y:1 , subx: 3, suby: 1} ), 8);
			this.modified( this.getFromPosition({x: 2, y:1 , subx: 1, suby: 3} ), 5);
			this.modified( this.getFromPosition({x: 2, y:1 , subx: 2, suby: 3} ), 4);
			this.modified( this.getFromPosition({x: 2, y:1 , subx: 3, suby: 3} ), 9);

			this.modified( this.getFromPosition({x: 3, y:1 , subx: 3, suby: 1} ), 9);
			this.modified( this.getFromPosition({x: 3, y:1 , subx: 3, suby: 2} ), 8);

			this.modified( this.getFromPosition({x: 1, y:2 , subx: 2, suby: 1} ), 4);
			this.modified( this.getFromPosition({x: 1, y:2 , subx: 1, suby: 2} ), 3);
			this.modified( this.getFromPosition({x: 1, y:2 , subx: 3, suby: 2} ), 9);
			this.modified( this.getFromPosition({x: 1, y:2 , subx: 3, suby: 3} ), 1);

			this.modified( this.getFromPosition({x: 2, y:2 , subx: 1, suby: 1} ), 2);
			this.modified( this.getFromPosition({x: 2, y:2 , subx: 3, suby: 3} ), 5);

			this.modified( this.getFromPosition({x: 3, y:2 , subx: 1, suby: 1} ), 9);
			this.modified( this.getFromPosition({x: 3, y:2 , subx: 1, suby: 2} ), 2);
			this.modified( this.getFromPosition({x: 3, y:2 , subx: 3, suby: 2} ), 1);
			this.modified( this.getFromPosition({x: 3, y:2 , subx: 2, suby: 3} ), 4);

 			this.modified( this.getFromPosition({x: 1, y:3 , subx: 1, suby: 2} ), 7);
 			this.modified( this.getFromPosition({x: 1, y:3 , subx: 1, suby: 3} ), 2);

			this.modified( this.getFromPosition({x: 2, y:3 , subx: 1, suby: 1} ), 9);
			this.modified( this.getFromPosition({x: 2, y:3 , subx: 2, suby: 1} ), 1);
			this.modified( this.getFromPosition({x: 2, y:3 , subx: 3, suby: 1} ), 2);
			this.modified( this.getFromPosition({x: 2, y:3 , subx: 1, suby: 3} ), 7);

			this.modified( this.getFromPosition({x: 3, y:3 , subx: 2, suby: 1} ), 3);
			this.modified( this.getFromPosition({x: 3, y:3 , subx: 1, suby: 2} ), 1);
			this.modified( this.getFromPosition({x: 3, y:3 , subx: 3, suby: 3} ), 6);

			this.stopInput();
		},

		testHard: function () {

			this.setUp();

			this.modified( this.getFromPosition({x: 1, y:1 , subx: 3, suby: 1} ), 9);
			this.modified( this.getFromPosition({x: 1, y:1 , subx: 2, suby: 2} ), 3);

			this.modified( this.getFromPosition({x: 2, y:1 , subx: 1, suby: 3} ), 3);
			this.modified( this.getFromPosition({x: 2, y:1 , subx: 2, suby: 3} ), 4);
			this.modified( this.getFromPosition({x: 2, y:1 , subx: 3, suby: 2} ), 7);

			//this.modified( this.getFromPosition({x: 2, y:1 , subx: 1, suby: 1} ), 6);


			this.modified( this.getFromPosition({x: 3, y:1 , subx: 1, suby: 1} ), 7);
			this.modified( this.getFromPosition({x: 3, y:1 , subx: 2, suby: 1} ), 3);
			this.modified( this.getFromPosition({x: 3, y:1 , subx: 3, suby: 1} ), 1);
			this.modified( this.getFromPosition({x: 3, y:1 , subx: 1, suby: 3} ), 8);

			this.modified( this.getFromPosition({x: 1, y:2 , subx: 1, suby: 1} ), 7);
			this.modified( this.getFromPosition({x: 1, y:2 , subx: 1, suby: 2} ), 8);
			this.modified( this.getFromPosition({x: 1, y:2 , subx: 2, suby: 2} ), 9);
			this.modified( this.getFromPosition({x: 1, y:2 , subx: 2, suby: 3} ), 5);

			this.modified( this.getFromPosition({x: 2, y:2 , subx: 1, suby: 2} ), 5);
			this.modified( this.getFromPosition({x: 2, y:2 , subx: 3, suby: 2} ), 6);

			this.modified( this.getFromPosition({x: 3, y:2 , subx: 2, suby: 1} ), 5);
			this.modified( this.getFromPosition({x: 3, y:2 , subx: 2, suby: 2} ), 4);
			this.modified( this.getFromPosition({x: 3, y:2 , subx: 3, suby: 2} ), 7);
			this.modified( this.getFromPosition({x: 3, y:2 , subx: 3, suby: 3} ), 6);

 			this.modified( this.getFromPosition({x: 1, y:3 , subx: 3, suby: 1} ), 6);
 			this.modified( this.getFromPosition({x: 1, y:3 , subx: 1, suby: 3} ), 5);
 			this.modified( this.getFromPosition({x: 1, y:3 , subx: 2, suby: 3} ), 8);
 			this.modified( this.getFromPosition({x: 1, y:3 , subx: 3, suby: 3} ), 2);

			this.modified( this.getFromPosition({x: 2, y:3 , subx: 1, suby: 2} ), 2);
			this.modified( this.getFromPosition({x: 2, y:3 , subx: 2, suby: 1} ), 5);
			this.modified( this.getFromPosition({x: 2, y:3 , subx: 3, suby: 1} ), 9);

			this.modified( this.getFromPosition({x: 3, y:3 , subx: 1, suby: 3} ), 3);
			this.modified( this.getFromPosition({x: 3, y:3 , subx: 2, suby: 2} ), 1);

			this.stopInput();
		},


		stopInput: function() {
			this.playing = true;
		},

		getInput: function (x, y, subx, suby, inputs) {
			inputs = inputs || this.inputs;
			return inputs[this.indexOfInput({x: x, y:y, subx: subx, suby: suby}, inputs)];
		},

		getFromPosition: function (position, inputs) {
			return this.getInput(position.x, position.y, position.subx, position.suby, inputs);
		},

		indexOfInput: function(input, inputs) {

			inputs = inputs || this.inputs;
			for(i = 0; i<inputs.length; i++){
				otherInput = inputs[i];
				if (input.x == otherInput.x && input.y == otherInput.y && input.subx == otherInput.subx && input.suby == otherInput.suby){
					return i;
				}
			}
			console.log(inputs);
			console.log("X:", input.x , " , Y: ", input.y, " subx: ", input.subx, " suby: ", input.suby);
			throw new Error("Input not found");
		},

		deleteInputFromInputs: function(input, inputs){
			inputs.splice(this.indexOfInput(input, inputs),1);
			return inputs;
		},

		stringPosibilities: function (input) {
			return input.posibleValues.join(" ");
		},

		wasGiven: function(input) {
			return input.given && this.playing;
		},


		isValid: function(input) {

			/* FAST VERSION */
			return input.posibleValues.some(function (value) {
				return value = input.value;
			});


			/* SLOW VERSION */
			/*
				This version could be useful for checking if it is valid, but solving the puzzle in this way would be really slow because
				it has to check every posible input value. With the other way is faster because it doesn't has to recalculate every pass.
			*/

			/*
			allValues = this.RowOf(input).concat(this.LineOf(input), this.BoxOf(input));
			allValues = this.valuesOf(allValues);
			if (allValues.indexOf(input.value) == -1)
				return true;
			else
				return false;
			*/
		},


		//When an input is modified all the related inputs must take it out from its posibilities
		modified: function (input, value, inputs) {

			allValues = this.getRelated(input, inputs);
		
			if(!this.playing) input.given = true;

			input.value = value;
			input.posibleValues = [value];

			self = this;
			allValues.forEach(function(input) {
				self.takeOutPosibility(input.posibleValues, value);
			});
		},

		takeOutPosibility: function (posibleValues, number) {

			for (i = 0; i<posibleValues.length; i++)
			{
					if(posibleValues[i] == number)
						posibleValues.splice(i,1);
			}
			return posibleValues;
		},

		deleted: function (input) {
			self = this;

			input.value = null;
			input.given = false;

			this.recaltulatePosibilities(input);

			allValues = this.getRelated(input);
			allValues.forEach(function(input) {
				self.recaltulatePosibilities(input);
			});
		},

		//Related inputs are those that are in the same box/line/row
		getRelated:function(input, inputs) {
			inputs = inputs || this.inputs;
			return this.RowOf(input, inputs).concat(this.LineOf(input, inputs), this.BoxOf(input, inputs));
		},

		recaltulatePosibilities: function (input, inputs) {
			inputs = inputs || this.inputs;
			//We get all the inputs that are related
			allValues = this.getRelated(input);
			//We get the numbers
			allValues = this.valuesOf(allValues);
			input.posibleValues = [1,2,3,4,5,6,7,8,9];
			self = this;
			allValues.forEach(function (number) {
				self.takeOutPosibility(input.posibleValues, number);
			});
		},

		addInput: function(input) {
			this.inputs.push(input);
		},

		valuesOf: function (inputs) {
			return inputs.map(function(input) {
				return input.value;
			});
		},

		RowOf: function(originalInput, inputs, deleteOriginal) {
			return this.filterBy(originalInput, inputs, deleteOriginal, this.areInTheSameRow);
		},
		areInTheSameRow: function (input1, input2) {
			return input1.x == input2.x && input1.subx == input2.subx;
		},

		LineOf: function(originalInput, inputs, deleteOriginal) {
			return this.filterBy(originalInput, inputs, deleteOriginal, this.areInTheSameLine);
		},
		areInTheSameLine: function (input1, input2) {
			return input1.y == input2.y && input1.suby == input2.suby;
		},

		BoxOf: function(originalInput, inputs, deleteOriginal) {
			return this.filterBy(originalInput, inputs, deleteOriginal, this.areInTheSameBox);
		},
		areInTheSameBox: function (input1, input2) {
			return input1.x == input2.x && input1.y == input2.y;
		},

		//It gets the inputs the matches the filter criteria, comparted to originalInput
		filterBy: function (originalInput, inputs, deleteOriginal, filterFunction) {

			stopRecursion();
			inputs = inputs || this.inputs;

			if(deleteOriginal === undefined) deleteOriginal = true;
			else deleteOriginal = false;

			array = inputs.filter(function (input) {
				return filterFunction(input, originalInput);
			});

			if(deleteOriginal) return this.deleteInputFromInputs(originalInput, array);
			else return array;
		},

		showLine: function (input) {
			inputs = this.LineOf(input);
			inputs.forEach(function(input){
				input.given = true;
			});
		},
		showRow: function (input) {
			inputs = this.RowOf(input);
			inputs.forEach(function(input){
				input.given = true;
			});
		},
		showBox: function (input) {
			inputs = this.BoxOf(input);
			inputs.forEach(function(input){
				input.given = true;
			});
		},


		hasChanged: function(old, newInputs) {
			old = this.valuesOf(old);
			newInputs = this.valuesOf(newInputs);
			return !old.compare( newInputs ) ;
		},

		//It puts the numbers when a input has only one posibility
		simpleComplete: function (inputs) {

			inputs = inputs || this.inputs;
			inputs = angular.copy(inputs);

			//We see every input
			for(i=0; i < inputs.length; i++){
				input = inputs[i];
				//if it has no value and the posible values that goes in there is only 1...
				if(input.value == null && input.posibleValues.length == 1){
					this.modified(input, input.posibleValues[0], inputs);
					somethingChanged = true;
				}
			}

			return inputs;
		},


		//This method tries in every box/line/column
		//if a certain number can only be in one and only one place
		//it puts it in there.
		completeBy: function (inputs, by) {

			inputs = inputs || this.inputs;
			inputs = angular.copy(inputs);

			//To go over all the boxes of 3x3
			for(x=1;x<4;x++){
				for(y=1;y<4;y++){

					//Get all the inputs of that box/line/column
					setOfInputs = by(x, y, inputs);
					setOfInputs = this.getEmptyInputs(setOfInputs);

					//Get a number
					for(number=1;number<10;number++){

						//If the number isn't in the box/line/column
						if(this.valuesOf(setOfInputs).indexOf(number) == -1){

							placesWhereItCanGo = [];
							//and see where it can go...
							for(z=0;z<setOfInputs.length;z++){
								input = setOfInputs[z];
								//if it the number can go in that input
								if(input.posibleValues.indexOf(number) != -1)
									placesWhereItCanGo.push(input);
							}

							// if the number can go in only one place
							if(placesWhereItCanGo.length == 1){
								//we put it there
								this.modified(placesWhereItCanGo[0], number, inputs);
							}
						}



					}
				}
			}

			return inputs;
		},

		getEmptyInputs: function (inputs) {
			return inputs.filter(this.isEmpty);
		},
		getCompleteInputs: function(inputs){
			return inputs.filter(this.isNotEmpty);
		},

		isEmpty: function (input) {
			return input.value == null;
		},
		isNotEmpty: function(input){
			return input.value != null;
		},
		completeByBox: function  (inputs) {
			return this.completeBy(inputs, this.getBoxToComplete);
		},
		getBoxToComplete : function  (x, y, inputs) {
			return self.BoxOf( self.getInput( x, y, 1, 1) , inputs, false);
		},
		completeByLine: function  (inputs) {
			return this.completeBy(inputs, this.getLineToComplete);
		},
		getLineToComplete: function  (x, y, inputs) {
			return self.LineOf( self.getInput( x, 1, 1, y) , inputs, false);
		},
		completeByRow: function  (inputs) {
			return this.completeBy(inputs, this.getLineToComplete);
		},
		getRowToComplete: function  (x, y, inputs) {
			return self.LineOf( self.getInput( x, 1, y, 1) , inputs, false);
		},

		getPosition: function(input) {
			return {x: input.x, y:input.y, subx: input.subx, suby: input.suby};
		},


		complete: function (inputs) {

			if(this.isComplete(inputs)){
				return inputs;
			}

			solution = old = inputs;
			somethingChanged = true;
			while( somethingChanged ){

				solution = this.simpleComplete(solution);
				solution = this.completeByBox(solution);
				solution = this.completeByLine(solution);
				solution = this.completeByRow(solution);
				somethingChanged = this.hasChanged(old, solution);
				old = solution;

			}
			return solution;
		},


		solve: function (inputs) {

			this.inputs = solution = this.complete(this.inputs);

			if(this.isComplete(solution)){
				return true;
			}

			hardSolution = this.hardSolve(solution);
			if(hardSolution !== false){
				this.inputs = hardSolution;
			}

		},


		//This is when the simple complete doesn't work
		//It will guess a numberes and continue until it's complete or wrong
		hardSolve: function (inputs) {

			stopRecursion( 100 );

			if (this.isComplete(inputs))
				return inputs;

			solutions = this.guess( inputs );

			self = this;
			finalSolution = false;

			solutions.forEach(function (solution) {

				if(self.isComplete(solution)){
					finalSolution = solution;

				}else if ( !finalSolution ){

					//Anda pero tiene que ser recursivo
					

					newSols = self.guess(solution);
					newSols.forEach( function (sol) {
						if(self.isComplete(sol))
							finalSolution = sol;
					});

					

					/* Es lo mismo que hacer lo de abajo */
					/*
						Como arriba evaluamos que finalSolution ya sea false, el hardSolve va a devolver a una respuesta o falso,
						si es falso no cambia nada, si da una solucion ya tenemos a la resolucion !
					*/
					//finalSolution = self.hardSolve(solution);

					/*newSol = self.hardSolve(solution);
					if(newSol)
						finalSolution = newSol;*/

				}

			});

			return finalSolution;

		},


		//if there are two inputs that are related and have the same posible values, guess!
		guess: function (inputs) {

			console.log("Guessing...");
			//We must guess a value
			guesses = this.guessBy(inputs, true);

			if(guesses){
				return guesses;
			}else{
				return this.guessBy(inputs, false);
			}
			return false;
		},


		guessBy: function (inputs, random) {
			//Maybe can try with more than 2
			min = 2;
			guesses = [];

			for(k=0;k<inputs.length;k++){

				input = inputs[k];

				// && this.anyHasSamePosibilities( input )
				if( input.posibleValues.length == min && (this.anyHasSamePosibilities (input) || ! random ) ){

					for(j=0;j<min;j++){

						guesses.push( angular.copy(inputs) );

						newInput = guesses[j][k];

						this.modified( newInput, newInput.posibleValues[j], guesses[j] );

						guesses[j] = this.complete( guesses[j] );

					}

					return guesses.filter( this.areAllCorrect, this );

				}
			}
			return false;
		},


		anyHasSamePosibilities: function (input) {

			inputs = this.getEmptyInputs( this.getRelated( input ) );
			return inputs.some(function (otherInput){
				return input.posibleValues.compare( otherInput.posibleValues );
			});
		},

		isSolved: function(inputs) {
			stopRecursion();
			return this.isComplete(inputs) && this.areAllCorrect(inputs);
		},

		isComplete: function (inputs) {
			return inputs.every( function (input) {
				return input.value != null;
			});
		},

		//It's wrong when an input can't be completed
		isWrong: function (inputs) {
			self = this;
			return inputs.some(function (input) {
				return input.posibleValues.length == 0 || ! self.isValid(input);
			});
		},

		areAllCorrect: function  (inputs) {

			//The we check every complete input is valid
			completeInputs = self.getCompleteInputs(inputs || this.inputs);
			return completeInputs.every( this.isValid ) || !this.isWrong(inputs);

		},

		restart: function () {
			for(j= 0; j< this.inputs.length; j++){
				input = this.inputs[j];
				if(!input.given)
					this.deleted(input);
			}
		}
	};
});





app.directive("box", function (Logic) {
	return{
		requiere:"ngModel",
		restrict:"EA",
		template:"<input ng-class='{ok:valid(), error:error()}' title='{{posibilities()}}'  ng-change='value = getInput().value' ng-model='getInput().value' ng-disabled='wasGiven()'  type='text' class='box'>",
		link: function(scope, element, attr) {

			scope.getInput = function() {
				return Logic.getFromPosition(scope.getPosition());
			};


			scope.getPosition = function() {
				return {x: parseInt(attr.x), y: parseInt(attr.y), subx: parseInt(attr.subx), suby: parseInt(attr.suby)};
			};

			scope.valid = function() {
				return Logic.isValid(scope.getInput());
				//return Logic.isValid(Logic.getFromPosition(scope.getPosition()));
				//return Logic.isValid(parseInt(attr.x), parseInt(attr.y),parseInt(attr.subx), parseInt(attr.suby) );
			};
			scope.error = function() {
				return !scope.valid();
				//return !Logic.isValid(parseInt(attr.x), parseInt(attr.y), parseInt(attr.subx), parseInt(attr.suby) );
				//return !Logic.isValid({x: parseInt(attr.x), y: parseInt(attr.y), subx: parseInt(attr.subx), suby: parseInt(attr.suby)});
			};

			scope.posibilities = function () {
				return Logic.stringPosibilities(scope.getInput());
			};

			scope.wasGiven = function() {
				return Logic.wasGiven(scope.getInput());
			};

			scope.$watch("value", function (newValue) {
				if (newValue !== undefined){
					newValue = parseInt(newValue.slice(-1));
					Logic.deleted(scope.getInput());
					Logic.modified(scope.getInput(), newValue);
				}
				if(newValue == "" || newValue == undefined){
					Logic.deleted(scope.getInput());
				}
			});
		},
	}
});

app.controller("main",function ($scope, Logic, $timeout) {

	$scope.logic = Logic;
	Logic.setUp();


	$timeout( function () {
		$scope.logic.testHard();
	}, 30);

	//console.log(Logic.RowOf({x:1, y:1, subx:2, suby:3}));
	//console.log(Logic.showRow({x:1, y:3, subx:2, suby:3}));
	$scope.long = [1, 2, 3];


});

