'use strict';

let _ = require('lodash');
let gridSquareStates = require('../flux/constants').gridSquareStates;

class SudokuSquare {
	constructor (gridSquareData) {
		_.extend(this, gridSquareData);
		this.state = gridSquareStates.PASSIVE;
	  this.isStatic = true;
	  this.userInput = null;
	  this.conflicts = [];
	  this.clueMarks = [];
	  this.sudokuGrid = null;

	  this.clearClueMarks();
	}

	value () {
		return this.isStatic ? this.number : this.userInput;
	};

	hasConflicts () {
		return this.conflicts.length > 0;
	};

	establishRelationships (sudokuGrid) {
		this.sudokuGrid = sudokuGrid;
		this.leftNeighbor = sudokuGrid.getSudokuSquareById(this.leftNeighbor);
	  this.upperNeighbor = sudokuGrid.getSudokuSquareById(this.upperNeighbor);
	  this.rightNeighbor = sudokuGrid.getSudokuSquareById(this.rightNeighbor);
	  this.lowerNeighbor = sudokuGrid.getSudokuSquareById(this.lowerNeighbor);
	  this.relationships = _.map(this.relationships, (relationship) => {
	  	return sudokuGrid.getSudokuSquareById(relationship);
	  });
	};

	setStatusToPassive () {
	  this.state = gridSquareStates.PASSIVE;
	};

	setStatusToActive () {
	  this.state = gridSquareStates.ACTIVE;
	};

	setStatusToRelatedToActive () {
	  this.state = gridSquareStates.RELATED_TO_ACTIVE;
	};

	highlightAsActive () {
		this.setStatusToActive();
		_.each(this.relationships, (relatedSquare) => {
			relatedSquare.setStatusToRelatedToActive();
		});
	};

	setNumber (number) {
		this.userInput = number;
		this.updateConflicts();
		this.clearClueMarks();
		if (this.sudokuGrid.activeMarksMode) {
			this.updatePossibleClueMarks();
			this.updatePossibleClueMarksForAllRelationships();
		}
	};

	updateConflicts () {
		this.conflicts = [];
		_.each(this.relationships, (relationship) => {
			if (this.value() === relationship.value() && this.value() !== null) {
				this.addConflict(relationship.id);
				relationship.addConflict(this.id);
			} else {
				this.removeConflict(relationship.id);
				relationship.removeConflict(this.id);
			}
		});
	};

	addConflict (sudokuSquareId) {
		if (sudokuSquareId !== null && this.id !== sudokuSquareId && !_.contains(this.conflicts, sudokuSquareId)) {
			this.conflicts.push(sudokuSquareId);
		}
	};

	removeConflict (sudokuSquareId) {
		this.conflicts = _.difference(this.conflicts, [sudokuSquareId]);
	};

	toggleClueMark (number) {
		if (_.contains(this.clueMarks, number)) {
	    this.removeClueMark(number);
	  } else {
	    this.addClueMark(number);
	  }
	};

	addClueMark (number) {
		this.clueMarks.push(number);
	  this.arrangeClueMarks();
	};

	removeClueMark (number) {
		this.clueMarks = _.difference(this.clueMarks, [number]);
	  this.arrangeClueMarks();
	};

	arrangeClueMarks (gridSquare) {
	  let arrangedClueMarks = [];
	  for (let number = 1; number <= 9; number++) {
	    if (this.clueMarksContainsNumber(number)) {
	      arrangedClueMarks.push(number);
	    } else {
	      arrangedClueMarks.push(null);
	    }
	  }
	  this.clueMarks = arrangedClueMarks;
	};

	clueMarksContainsNumber (number) {
	  return _.contains(this.clueMarks, number);
	};

	clearClueMarks () {
		this.clueMarks = [];
		for (let _ = 1; _ <= 9; _++) { this.clueMarks.push(null); }
	};

	removeClueMarkFromAllRelationships (number) {
		_.each(this.relationships, (relationship) => {
			relationship.removeClueMark(number);
		});
	};

	updatePossibleClueMarks () {
		let relationshipValues = _.map(this.relationships, (relationship) => {
			return relationship.value();
		});
		let relevantRelationshipValues = _.compact(relationshipValues);
		let possibleClueMarks = _.difference([1, 2, 3, 4, 5, 6, 7, 8, 9], relevantRelationshipValues);
		this.clueMarks = possibleClueMarks;
		this.arrangeClueMarks();
	};
	updatePossibleClueMarksForAllRelationships () {
		_.each(this.relationships, (relationship) => {
			relationship.updatePossibleClueMarks();
		});
	};
	
};

module.exports = SudokuSquare;