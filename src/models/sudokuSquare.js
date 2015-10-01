'use strict';

var _ = require('lodash');
var gridSquareStates = require('../flux/constants').gridSquareStates;

var SudokuSquare = function (gridSquareData) {
	_.extend(this, gridSquareData);
	this.state = gridSquareStates.PASSIVE;
  this.isStatic = true;
  this.userInput = null;
  this.conflicts = [];
  this.clueMarks = [];
  this.sudokuGrid = null;
};
SudokuSquare.prototype.value = function () {
	return this.isStatic ? this.number : this.userInput;
};
SudokuSquare.prototype.hasConflicts = function () {
	return this.conflicts.length > 0;
};
SudokuSquare.prototype.establishRelationships = function (sudokuGrid) {
	this.sudokuGrid = sudokuGrid;
	this.leftNeighbor = sudokuGrid.getSudokuSquareById(this.leftNeighbor);
  this.upperNeighbor = sudokuGrid.getSudokuSquareById(this.upperNeighbor);
  this.rightNeighbor = sudokuGrid.getSudokuSquareById(this.rightNeighbor);
  this.lowerNeighbor = sudokuGrid.getSudokuSquareById(this.lowerNeighbor);
  this.relationships = _.map(this.relationships, function (relationship) {
  	return sudokuGrid.getSudokuSquareById(relationship);
  });
};
SudokuSquare.prototype.setStatusToPassive = function () {
  this.state = gridSquareStates.PASSIVE;
};
SudokuSquare.prototype.setStatusToActive = function () {
  this.state = gridSquareStates.ACTIVE;
};
SudokuSquare.prototype.setStatusToRelatedToActive = function () {
  this.state = gridSquareStates.RELATED_TO_ACTIVE;
};
SudokuSquare.prototype.highlightAsActive = function () {
	this.setStatusToActive();
	_.each(this.relationships, function (relatedSquare) {
		relatedSquare.setStatusToRelatedToActive();
	});
};
SudokuSquare.prototype.setNumber = function(number) {
	this.userInput = number;
	this.updateConflicts();
};
SudokuSquare.prototype.updateConflicts = function() {
	this.conflicts = [];
	var sudokuSquare = this;
	_.each(this.relationships, function (relationship) {
		if (sudokuSquare.value() === relationship.value()) {
			sudokuSquare.addConflict(relationship.id);
			relationship.addConflict(sudokuSquare.id);
		} else {
			sudokuSquare.removeConflict(relationship.id);
			relationship.removeConflict(sudokuSquare.id);
		}
	});
};
SudokuSquare.prototype.addConflict = function (sudokuSquareId) {
	if (sudokuSquareId !== null && this.id !== sudokuSquareId && !_.contains(this.conflicts, sudokuSquareId)) {
		this.conflicts.push(sudokuSquareId);
	}
};
SudokuSquare.prototype.removeConflict = function (sudokuSquareId) {
	this.conflicts = _.difference(this.conflicts, [sudokuSquareId]);
};




SudokuSquare.prototype.toggleClueMark = function (number) {
	if (_.contains(this.clueMarks, number)) {
    this.removeClueMark(number);
  } else {
    this.addClueMark(number);
  }
};
SudokuSquare.prototype.addClueMark = function (number) {
	this.clueMarks.push(number);
  this.arrangeClueMarks();
};
SudokuSquare.prototype.removeClueMark = function (number) {
	this.clueMarks = _.difference(this.clueMarks, [number]);
  this.arrangeClueMarks();
};
SudokuSquare.prototype.arrangeClueMarks = function (gridSquare) {
  var arrangedClueMarks = [];
  for (var number = 1; number <= 9; number++) {
    if (this.clueMarksContainsNumber(number)) {
      arrangedClueMarks.push(number);
    } else {
      arrangedClueMarks.push(null);
    }
  }
  this.clueMarks = arrangedClueMarks;
};
SudokuSquare.prototype.clueMarksContainsNumber = function (number) {
  return _.contains(this.clueMarks, number);
};





module.exports = SudokuSquare;