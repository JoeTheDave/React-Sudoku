'use strict';

var _ = require('lodash');
var SudokuSquare = require('./sudokuSquare');

var SudokuGrid = function (sudokuPuzzleData) {
	this.gridSquares = [];
	this.selectedGridSquare = null;
	this.initialize(sudokuPuzzleData);
};
SudokuGrid.prototype.initialize = function (sudokuPuzzleData) {
	var sudokuGrid = this;
	_.each(sudokuPuzzleData, function (sudokuSquareData) {
    sudokuGrid.gridSquares.push(new SudokuSquare(sudokuSquareData));
  });
  this.establishGridRelationships();
  this.hideNumbers(40);
};
SudokuGrid.prototype.establishGridRelationships = function () {
	var sudokuGrid = this;
	_.each(this.gridSquares, function (sudokuSquare) {
		sudokuSquare.establishRelationships(sudokuGrid);
	});
};
SudokuGrid.prototype.getSudokuSquareById = function (id) {
	return _.find(this.gridSquares, function (sudokuSquare) { 
		return sudokuSquare.id === id; 
	});
};
SudokuGrid.prototype.hideNumbers = function (numberToHide) {
	_.each(_.take(_.shuffle(this.gridSquares), numberToHide), function (sudokuSquare) {
    sudokuSquare.isStatic = false;
  });
};

SudokuGrid.prototype.moveSelectionLeft = function () {
	if (this.selectedGridSquare) {
		this.setSelectedGridSquare(this.selectedGridSquare.leftNeighbor);
	}
};
SudokuGrid.prototype.moveSelectionUp = function () {
	if (this.selectedGridSquare) {
		this.setSelectedGridSquare(this.selectedGridSquare.upperNeighbor);
	}
};
SudokuGrid.prototype.moveSelectionRight = function () {
	if (this.selectedGridSquare) {
		this.setSelectedGridSquare(this.selectedGridSquare.rightNeighbor);
	}
};
SudokuGrid.prototype.moveSelectionDown = function () {
	if (this.selectedGridSquare) {
		this.setSelectedGridSquare(this.selectedGridSquare.lowerNeighbor);
	}
};
SudokuGrid.prototype.unselectGridSquare = function () {
	this.setSelectedGridSquare(null);
};
SudokuGrid.prototype.setSelectedGridSquare = function (sudokuSquare) {
	this.selectedGridSquare = sudokuSquare;
	this.highlightGridSquaresBasedOnSelection();
};
SudokuGrid.prototype.highlightGridSquaresBasedOnSelection = function () {
  this.setAllGridSquaresPassive();
  if (this.selectedGridSquare) {
  	this.selectedGridSquare.highlightAsActive();
  }
};
SudokuGrid.prototype.setAllGridSquaresPassive = function () {
  _.each(this.gridSquares, function (sudokuSquare) {
    sudokuSquare.setStatusToPassive();
  });
};

module.exports = SudokuGrid;