'use strict';

var _ = require('lodash');
var puzzleData = null;

var generatePuzzleData = function () {
	puzzleData = new SudokuData();
	puzzleData.generate();
	return puzzleData.grid;
};

var SudokuData = function () {
	this.grid = [];
};
SudokuData.prototype.generate = function () {
	this.createGridSquares();
	this.establishRelationships();
  this.establishDirectNeighborRelationships();
	this.populate();
};
SudokuData.prototype.createGridSquares = function () {
	for (var id = 0; id <= 80; id++) {
    this.grid.push(new GridSquare(id))
  }
};
SudokuData.prototype.establishRelationships = function () {
	var self = this;
  _.each(this.grid, function (gridSquare) {
    var rowStartId = gridSquare.id - gridSquare.id % 9;
    var colStartId = gridSquare.id % 9;
    var grid3x3StartId = gridSquare.id - (gridSquare.id % 27) + (gridSquare.id % 9) - (gridSquare.id % 3);
    for (var x = 0; x <= 8; x++) {
      gridSquare.establishRelationship(self.findGridSquareById(rowStartId + x));
      gridSquare.establishRelationship(self.findGridSquareById(colStartId + (x * 9)));
      gridSquare.establishRelationship(self.findGridSquareById(grid3x3StartId + (x % 3) + (Math.floor(x / 3) * 9)));
    }
  });
};
SudokuData.prototype.establishDirectNeighborRelationships = function () {
  var self = this;
  _.each(this.grid, function (gridSquare) {
    if (gridSquare.id <= 8) {
      gridSquare.upperNeighbor = self.findGridSquareById(gridSquare.id + 72);
    } else {
      gridSquare.upperNeighbor = self.findGridSquareById(gridSquare.id - 9);
    }
    if (gridSquare.id % 9 === 8) {
      gridSquare.rightNeighbor = self.findGridSquareById(gridSquare.id - 8);
    } else {
      gridSquare.rightNeighbor = self.findGridSquareById(gridSquare.id + 1);
    }
    if (gridSquare.id >= 72) {
      gridSquare.lowerNeighbor = self.findGridSquareById(gridSquare.id - 72);
    } else {
      gridSquare.lowerNeighbor = self.findGridSquareById(gridSquare.id + 9);
    }
    if (gridSquare.id % 9 === 0) {
      gridSquare.leftNeighbor = self.findGridSquareById(gridSquare.id + 8);
    } else {
      gridSquare.leftNeighbor = self.findGridSquareById(gridSquare.id - 1);
    }
  });
};
SudokuData.prototype.populate = function () {
	var populationCycles = 0;
	while(this.hasUnpopulatedGridSquares()) {
		var gridSquare = this.getRandomUndefinedGridSquare();
		gridSquare.populate();
		populationCycles++;
		if (populationCycles >= 200) {
			this.clearRandomGridSquares(20);
			populationCycles -= 100;
		}
	}
};
SudokuData.prototype.findGridSquareById = function (id) {
  return _.find(this.grid, function (gridSquare) {
    return gridSquare.id === id;
  });
};
SudokuData.prototype.hasUnpopulatedGridSquares = function () {
	return this.getUndefinedGridSquares().length !== 0;
};
SudokuData.prototype.getUndefinedGridSquares = function () {
	return _.filter(this.grid, function (gridSquare) {
    return gridSquare.number === null;
  });
};
SudokuData.prototype.getRandomUndefinedGridSquare = function () {
  var undefinedGridSquares = this.getUndefinedGridSquares();
  if (undefinedGridSquares.length > 0) {
    var randomIndex = _.random(undefinedGridSquares.length - 1);
    return undefinedGridSquares[randomIndex];
  }
  return null;
};
SudokuData.prototype.clearRandomGridSquares = function (numberToClear) {
	var populatedGridSquares = _.difference(this.grid, this.getUndefinedGridSquares());
	var gridSquaresToClear = _.take(_.shuffle(populatedGridSquares), numberToClear);
  _.each(gridSquaresToClear, function (gridSquare) {
    gridSquare.number = null;
  });
};

var GridSquare = function(id) {
	this.id = id;
  this.number = null;
  this.relationships = [];
  this.upperNeighbor = null;
  this.rightNeighbor = null;
  this.lowerNeighbor = null;
  this.leftNeighbor = null;
};
GridSquare.prototype.establishRelationship = function (relatedGridSquare) {
	if((!this.alreadyHasRelationship(relatedGridSquare)) && this.id !== relatedGridSquare.id) {
    this.relationships.push(relatedGridSquare);
  }
};
GridSquare.prototype.alreadyHasRelationship = function (relatedGridSquare) {
	return _.contains(this.relationships, relatedGridSquare);
};
GridSquare.prototype.populate = function () {
	var sequence = this.generateRandomSequence();
  while (this.number === null && sequence.length > 0) {
    var candidate = sequence.pop();
    if (this.isValidNumber(candidate)) {
      this.number = candidate;
    }
  }
  if (this.number === null) {
  	this.forcePopulate();
  }
};
GridSquare.prototype.generateRandomSequence = function () {
  return _.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
};
GridSquare.prototype.isValidNumber = function (number) {
  return this.calculateCandidateConflicts(number) === 0;
};
GridSquare.prototype.calculateCandidateConflicts = function (number) {
  return _.filter(this.relationships, function (relatedGridSquare) {
    return relatedGridSquare.number === number;
  }).length;
};
GridSquare.prototype.forcePopulate = function () {
	var number = this.findNumberWithFewestConflicts();
  this.elmininateConflictsForNumber(number);
  this.number = number;
};
GridSquare.prototype.elmininateConflictsForNumber = function (number) {
  _.each(this.relationships, function (relatedGridSquare) {
    if (relatedGridSquare.number === number) {
      relatedGridSquare.number = null;
    }
  });
};
GridSquare.prototype.findNumberWithFewestConflicts = function () {
	var self = this;
  var conflictSummary = [];
  _.each(this.generateRandomSequence(), function (number) {
    conflictSummary.push({ number: number, conflicts: self.calculateCandidateConflicts(number) });
  });
  var sortedConflictSummary = _.sortBy(conflictSummary, function (conflictSummaryItem) {
    return conflictSummaryItem.conflicts;
  });
  var test = _.first(sortedConflictSummary);
  return test.number;
};

module.exports = {
	generatePuzzleData: generatePuzzleData
}