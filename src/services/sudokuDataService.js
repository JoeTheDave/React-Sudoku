'use strict';

import _ from 'lodash';
import Q from 'q';

var generatePuzzleData = function () {
  var deferred = Q.defer();
	var puzzleData = new SudokuData();
	puzzleData.generate();
  deferred.resolve(puzzleData.grid);
	return deferred.promise;
};

class SudokuData {
  constructor () {
    this.grid = [];
  }

  generate () {
    this.createGridSquares();
    this.establishRelationships();
    this.establishDirectNeighborRelationships();
    this.populate();
    this.simplifyRelatedObjectsToIdReferences();
  }

  createGridSquares () {
    for (var id = 0; id <= 80; id++) {
      this.grid.push(new GridSquare(id))
    }
  }

  establishRelationships () {
    _.each(this.grid, (gridSquare) => {
      var rowStartId = gridSquare.id - gridSquare.id % 9;
      var colStartId = gridSquare.id % 9;
      var grid3x3StartId = gridSquare.id - (gridSquare.id % 27) + (gridSquare.id % 9) - (gridSquare.id % 3);
      for (var x = 0; x <= 8; x++) {
        gridSquare.establishRelationship(this.findGridSquareById(rowStartId + x));
        gridSquare.establishRelationship(this.findGridSquareById(colStartId + (x * 9)));
        gridSquare.establishRelationship(this.findGridSquareById(grid3x3StartId + (x % 3) + (Math.floor(x / 3) * 9)));
      }
    });
  }

  establishDirectNeighborRelationships () {
    _.each(this.grid, (gridSquare) => {
      if (gridSquare.id <= 8) {
        gridSquare.upperNeighbor = this.findGridSquareById(gridSquare.id + 72);
      } else {
        gridSquare.upperNeighbor = this.findGridSquareById(gridSquare.id - 9);
      }
      if (gridSquare.id % 9 === 8) {
        gridSquare.rightNeighbor = this.findGridSquareById(gridSquare.id - 8);
      } else {
        gridSquare.rightNeighbor = this.findGridSquareById(gridSquare.id + 1);
      }
      if (gridSquare.id >= 72) {
        gridSquare.lowerNeighbor = this.findGridSquareById(gridSquare.id - 72);
      } else {
        gridSquare.lowerNeighbor = this.findGridSquareById(gridSquare.id + 9);
      }
      if (gridSquare.id % 9 === 0) {
        gridSquare.leftNeighbor = this.findGridSquareById(gridSquare.id + 8);
      } else {
        gridSquare.leftNeighbor = this.findGridSquareById(gridSquare.id - 1);
      }
    });
  }

  populate () {
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
  }

  findGridSquareById (id) {
    return _.find(this.grid, (gridSquare) => {
      return gridSquare.id === id;
    });
  }

  hasUnpopulatedGridSquares () {
    return this.getUndefinedGridSquares().length !== 0;
  }

  getUndefinedGridSquares () {
    return _.filter(this.grid, (gridSquare) => {
      return gridSquare.number === null;
    });
  }

  getRandomUndefinedGridSquare () {
    var undefinedGridSquares = this.getUndefinedGridSquares();
    if (undefinedGridSquares.length > 0) {
      var randomIndex = _.random(undefinedGridSquares.length - 1);
      return undefinedGridSquares[randomIndex];
    }
    return null;
  }

  clearRandomGridSquares (numberToClear) {
    var populatedGridSquares = _.difference(this.grid, this.getUndefinedGridSquares());
    var gridSquaresToClear = _.take(_.shuffle(populatedGridSquares), numberToClear);
    _.each(gridSquaresToClear, (gridSquare) => {
      gridSquare.number = null;
    });
  }

  simplifyRelatedObjectsToIdReferences () {
    _.each(this.grid, (gridSquare) => {
      gridSquare.leftNeighbor = gridSquare.leftNeighbor.id;
      gridSquare.upperNeighbor = gridSquare.upperNeighbor.id;
      gridSquare.rightNeighbor = gridSquare.rightNeighbor.id;
      gridSquare.lowerNeighbor = gridSquare.lowerNeighbor.id;
      gridSquare.relationships = _.sortBy(_.pluck(gridSquare.relationships, 'id'));
    });
  };
	
};

class GridSquare {
  constructor (id) {
    this.id = id;
    this.number = null;
    this.relationships = [];
    this.upperNeighbor = null;
    this.rightNeighbor = null;
    this.lowerNeighbor = null;
    this.leftNeighbor = null;
  }

  establishRelationship (relatedGridSquare) {
    if((!this.alreadyHasRelationship(relatedGridSquare)) && this.id !== relatedGridSquare.id) {
      this.relationships.push(relatedGridSquare);
    }
  }

  alreadyHasRelationship (relatedGridSquare) {
    return _.contains(this.relationships, relatedGridSquare);
  }

  populate () {
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
  }

  generateRandomSequence () {
    return _.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  }

  isValidNumber (number) {
    return this.calculateCandidateConflicts(number) === 0;
  }

  calculateCandidateConflicts (number) {
    return _.filter(this.relationships, (relatedGridSquare) => {
      return relatedGridSquare.number === number;
    }).length;
  }

  forcePopulate () {
    var number = this.findNumberWithFewestConflicts();
    this.elmininateConflictsForNumber(number);
    this.number = number;
  }

  elmininateConflictsForNumber (number) {
    _.each(this.relationships, (relatedGridSquare) => {
      if (relatedGridSquare.number === number) {
        relatedGridSquare.number = null;
      }
    });
  }

  findNumberWithFewestConflicts () {
    var conflictSummary = [];
    _.each(this.generateRandomSequence(), (number) => {
      conflictSummary.push({ number: number, conflicts: this.calculateCandidateConflicts(number) });
    });
    var sortedConflictSummary = _.sortBy(conflictSummary, (conflictSummaryItem) => {
      return conflictSummaryItem.conflicts;
    });
    var test = _.first(sortedConflictSummary);
    return test.number;
  }
	
};

export default {
	generatePuzzleData: generatePuzzleData
}