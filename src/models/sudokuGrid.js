'use strict';

var _ = require('lodash');
var SudokuSquare = require('./sudokuSquare');

var SudokuGrid = function (sudokuPuzzleData) {
	this.gridSquares = [];
	this.initialize(sudokuPuzzleData);
};
SudokuGrid.prototype.initialize = function (sudokuPuzzleData) {
	var sudokuGrid = this;
	_.each(sudokuPuzzleData, function (gridSquareData) {
    sudokuGrid.gridSquares.push(new SudokuSquare(gridSquareData));
  });
};

module.exports = SudokuGrid;