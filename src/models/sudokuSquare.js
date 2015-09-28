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

module.exports = SudokuSquare;