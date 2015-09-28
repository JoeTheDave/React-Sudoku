'use strict';

var _ = require('lodash');
var gridSquareStates = require('../flux/constants').gridSquareStates;

var SudokuSquare = function (gridSquareData) {
	_.extend(this, gridSquareData);
	this.state = gridSquareStates.PASSIVE;
  this.isStatic = true;
  this.userInput = null;
  //this.isConflicted = false;
  this.clueMarks = [];
  this.sudokuGrid = null;
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

module.exports = SudokuSquare;