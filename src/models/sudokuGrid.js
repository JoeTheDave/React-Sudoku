'use strict';

let _ = require('lodash');
let SudokuSquare = require('./sudokuSquare');

class SudokuGrid {
	constructor (sudokuPuzzleData) {
		this.gridSquares = [];
		this.selectedGridSquare = null;
		this.initialize(sudokuPuzzleData);
		this.activeMarksMode = false;
		this.showAnswers = false;
		this.puzzleIsComplete = false;
	}

	initialize (sudokuPuzzleData) {
		_.each(sudokuPuzzleData, (sudokuSquareData) => {
	    this.gridSquares.push(new SudokuSquare(sudokuSquareData));
	  });
	  this.establishGridRelationships();
	  this.hideNumbers(40);
	};

	establishGridRelationships () {
		_.each(this.gridSquares, (sudokuSquare) => {
			sudokuSquare.establishRelationships(this);
		});
	};

	getSudokuSquareById (id) {
		return _.find(this.gridSquares, (sudokuSquare) => { 
			return sudokuSquare.id === id; 
		});
	};

	hideNumbers (numberToHide) {
		_.each(_.take(_.shuffle(this.gridSquares), numberToHide), (sudokuSquare) => {
	    sudokuSquare.isStatic = false;
	  });
	};

	moveSelectionLeft () {
		if (this.selectedGridSquare) {
			this.setSelectedGridSquare(this.selectedGridSquare.leftNeighbor);
		}
	};

	moveSelectionUp () {
		if (this.selectedGridSquare) {
			this.setSelectedGridSquare(this.selectedGridSquare.upperNeighbor);
		}
	};

	moveSelectionRight () {
		if (this.selectedGridSquare) {
			this.setSelectedGridSquare(this.selectedGridSquare.rightNeighbor);
		}
	};

	moveSelectionDown () {
		if (this.selectedGridSquare) {
			this.setSelectedGridSquare(this.selectedGridSquare.lowerNeighbor);
		}
	};

	unselectGridSquare () {
		this.setSelectedGridSquare(null);
	};

	setSelectedGridSquare (sudokuSquare) {
		this.selectedGridSquare = sudokuSquare;
		this.highlightGridSquaresBasedOnSelection();
	};

	highlightGridSquaresBasedOnSelection () {
	  this.setAllGridSquaresPassive();
	  if (this.selectedGridSquare) {
	  	this.selectedGridSquare.highlightAsActive();
	  }
	};

	setAllGridSquaresPassive () {
	  _.each(this.gridSquares, (sudokuSquare) => {
	    sudokuSquare.setStatusToPassive();
	  });
	};

	assignNumberToSelectedGridSquare (number) {
		if (this.selectedGridSquare && !this.selectedGridSquare.isStatic) {
			this.selectedGridSquare.setNumber(number);
			this.checkForPuzzleCompletion();
		}
	};

	toggleClueMarkOnSelectedGridSquare (number) {
		if (this.selectedGridSquare && !this.activeMarksMode) {
			this.selectedGridSquare.toggleClueMark(number);
		}
	};

	toggleActiveMarksMode () {
		this.activeMarksMode = !this.activeMarksMode;
		if (this.activeMarksMode) {
			this.updateClueMarksForAllGridSquares();
		}
	};

	updateClueMarksForAllGridSquares () {
		_.each(this.gridSquares, (sudokuSquare) => {
			if (!sudokuSquare.isStatic) {
				sudokuSquare.updatePossibleClueMarks();
			}
		});
	};

	toggleShowAnswersMode () {
		this.showAnswers = !this.showAnswers;
	};

	clearClueMarksFromSelectedGridSquare () {
		if (this.selectedGridSquare && !this.activeMarksMode) {
			this.selectedGridSquare.clearClueMarks();
		}
	};

	clearAllClueMarks () {
		if (!this.activeMarksMode) {
			_.each(this.gridSquares, (sudokuSquare) => {
				sudokuSquare.clearClueMarks();
			});
		}
	};

	checkForPuzzleCompletion () {
		this.puzzleIsComplete = _.every(this.gridSquares, (sudokuSquare) => {
			return sudokuSquare.value() === sudokuSquare.number;
		});
	};
	
};



module.exports = SudokuGrid;