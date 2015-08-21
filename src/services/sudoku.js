'use strict';

var _ = require('lodash');

var puzzleData = null;

var generatePuzzleData = function () {
	initializeGridData();
	return applicationData.grid;
};

var sudokuData = function () {
	this.grid = [];
	this.insertionAttempts = 0;
};

////////////////////////////////////////////////////////////////////

var insertionAttempts = 0;
var applicationData = {
	grid: []
};

var generatePuzzleData = function () {
	initializeGridData();
	return applicationData.grid;
};

var initializeGridData = function () {
	applicationData.grid = [];
  for (var x = 0; x <= 80; x++) {
    applicationData.grid.push(createGridSquare(x))
  }
  intializeGridRelationships();
  generatePuzzle();
};

var createGridSquare = function (index) {
  return {
    index: index,
    number: null,
    relationships: [],
    color: null
  };
};

var intializeGridRelationships = function () {
  _.each(applicationData.grid, function (gridSquare) {
    var rowStartIndex = gridSquare.index - gridSquare.index % 9;
    var colStartIndex = gridSquare.index % 9;
    var grid3x3StartIndex = gridSquare.index - (gridSquare.index % 27) + (gridSquare.index % 9) - (gridSquare.index % 3);
    for (var x = 0; x <= 8; x++) {
      establishGridSquareRelationship(gridSquare, getGridSquareByIndex(rowStartIndex + x));
      establishGridSquareRelationship(gridSquare, getGridSquareByIndex(colStartIndex + (x * 9)));
      establishGridSquareRelationship(gridSquare, getGridSquareByIndex(grid3x3StartIndex + (x % 3) + (Math.floor(x / 3) * 9)));
    }
  });
};

var generatePuzzle = function () {
  while (getUndefinedGridSquares().length > 0) {
    var gridSquare = getRandomUndefinedGridSquare();
    attemptNumberInsertion(gridSquare);
  }
};

var attemptNumberInsertion = function (gridSquare) {
  var sequence = generateRandomSequence();
  while (gridSquare.number === null && sequence.length > 0) {
    var candidate = sequence.pop();
    if (validateNumberInsertion(gridSquare, candidate)) {
      gridSquare.number = candidate;
    }
  }
  if (gridSquare.number === null) {
    forceNumberInsertion(gridSquare);
  }
  insertionAttempts++;
  if (insertionAttempts >= 200) {
    insertionAttempts = 0;
    clearRandomGridSquares(20);
  }
};

var validateNumberInsertion = function (gridSquare, number) {
  return calculateCandidateConflicts(gridSquare, number) === 0;
};

var forceNumberInsertion = function (gridSquare) {
  var candidateConflictsSummary = generateCandidateConflictsSummary(gridSquare);
  var numberToForce = candidateConflictsSummary[0].number;
  elmininateConflictsForNumber(gridSquare, numberToForce);
  gridSquare.number = numberToForce;
};

var calculateCandidateConflicts = function (gridSquare, number) {
  var conflicts = 0;
  _.each(gridSquare.relationships, function (relatedGridSquare) {
    if (relatedGridSquare.number === number) {
      conflicts++;
    }
  });
  return conflicts;
};

var generateCandidateConflictsSummary = function (gridSquare) {
  var summary = [];
  _.each(generateRandomSequence(), function (number) {
    summary.push({ number: number, conflicts: calculateCandidateConflicts(gridSquare, number) });
  });
  return _.sortBy(summary, function (conflictSummaryItem) {
    return conflictSummaryItem.conflicts;
  });
};

var clearRandomGridSquares = function (numberToClear) {
  var populatedGridSquares = _.take(_.shuffle(_.filter(applicationData.grid, function (gridSquare) {
    return gridSquare.number !== null;
  })), numberToClear);
  _.each(populatedGridSquares, function (gridSquare) {
    gridSquare.number = null;
  });
};

var elmininateConflictsForNumber = function (gridSquare, number) {
  _.each(gridSquare.relationships, function (relatedGridSquare) {
    if (relatedGridSquare.number === number) {
      relatedGridSquare.number = null;
    }
  });
};

var establishGridSquareRelationship = function (gridSquare, relatedGridSquare) {
  if((!_.contains(gridSquare.relationships, relatedGridSquare) && gridSquare.index !== relatedGridSquare.index)) {
    gridSquare.relationships.push(relatedGridSquare);
  }
};

var getGridSquareByIndex = function (index) {
  return _.find(applicationData.grid, function (gridSquare) {
    return gridSquare.index === index;
  });
};

var getUndefinedGridSquares = function () {
  return _.filter(applicationData.grid, function (gridSquare) {
    return gridSquare.number === null;
  });
};

var getRandomUndefinedGridSquare = function () {
  var undefinedGridSquares = getUndefinedGridSquares();
  if (undefinedGridSquares.length > 0) {
    var randomIndex = _.random(undefinedGridSquares.length - 1);
    return undefinedGridSquares[randomIndex];
  }
  return null;
};

var generateRandomSequence = function () {
  return _.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
};

module.exports = {
	generatePuzzleData: generatePuzzleData
}