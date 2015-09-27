'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var actionTypes = require('../flux/constants').actionTypes;
var CHANGE_EVENT = require('../flux/constants').changeEvent;
var gridSquareStates = require('../flux/constants').gridSquareStates;
var dispatcher = require('../flux/dispatcher');
var sudokuService = require('../services/Sudoku');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var applicationData = {
  grid: [],
  selectedGridSquare: null
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var initialize = function () {
  applicationData.grid = sudokuService.generatePuzzleData();
  addGridSquareProperties();
  hideNumbers(45);
};

var addGridSquareProperties = function() {
  _.each(applicationData.grid, function (gridSquare) {
    gridSquare.state = gridSquareStates.PASSIVE;
    gridSquare.isStatic = true;
    gridSquare.userInput = null;
    gridSquare.isConflicted = false;
    gridSquare.clueMarks = [];
  });
};

var hideNumbers = function (numberToHide) {
  _.each(_.take(_.shuffle(applicationData.grid), numberToHide), function (gridSquare) {
    gridSquare.isStatic = false;
  });
};

var selectGridSquare = function (gridSquare) {
  applicationData.selectedGridSquare = gridSquare;
  updateGridHighlights();
};

var updateGridHighlights = function () {
  setAllGridSquaresPassive();
  highlightRelationships(applicationData.selectedGridSquare);
  highlightConflicts();
  highlightActiveGridSquare(applicationData.selectedGridSquare);
};

var setAllGridSquaresPassive = function () {
  _.each(applicationData.grid, function (gridSquare) {
    gridSquare.state = gridSquareStates.PASSIVE;
  });
};

var highlightRelationships = function (gridSquare) {
  if (gridSquare) {
    _.each(gridSquare.relationships, function (relatedGridSquare) {
      relatedGridSquare.state = gridSquareStates.RELATED_TO_ACTIVE;
    });
  }
};

var highlightConflicts = function () {
  removeConflictsFromAllGridSquares();
  _.each(applicationData.grid, function (gridSquare) {
    _.each(gridSquare.relationships, function (relatedGridSquare) {
      var gridSquareIsInConflictWithRelatedGridSquare = gridSquare.userInput === relatedGridSquare.number || gridSquare.userInput === relatedGridSquare.userInput;
      var relatedGridSquareIsNotBlank = relatedGridSquare.isStatic || relatedGridSquare.userInput !== null;
      if (gridSquare.userInput !== null && gridSquareIsInConflictWithRelatedGridSquare && relatedGridSquareIsNotBlank) {
        gridSquare.isConflicted = true;
        relatedGridSquare.isConflicted = true;
      }
    });
  });
};

var removeConflictsFromAllGridSquares = function () {
  _.each(applicationData.grid, function (gridSquare) {
    gridSquare.isConflicted = false;
  });
};


var highlightActiveGridSquare = function (gridSquare) {
  if (gridSquare) {
    gridSquare.state = gridSquareStates.ACTIVE;
  }
};

var moveSelectionLeft = function () {
  selectGridSquare(applicationData.selectedGridSquare.leftNeighbor);
};

var moveSelectionUp = function () {
  selectGridSquare(applicationData.selectedGridSquare.upperNeighbor);
};

var moveSelectionRight = function () {
  selectGridSquare(applicationData.selectedGridSquare.rightNeighbor);
};

var moveSelectionDown = function () {
  selectGridSquare(applicationData.selectedGridSquare.lowerNeighbor);
};

var unselectGridSquare = function () {
  selectGridSquare(null);
};

var assignNumberToSelectedGridSquare = function (number) {
  applicationData.selectedGridSquare.userInput = number;
  updateGridHighlights();
};

var toggleClueMarkOnSelectedGridSquare = function (number) {
  if (_.contains(applicationData.selectedGridSquare.clueMarks, number)) {
    removeClueMarkFromSelectedGridSquare(number);
  } else {
    addClueMarkToSelectedGridSquare(number);
  }
};

var removeClueMarkFromSelectedGridSquare = function (number) {
  applicationData.selectedGridSquare.clueMarks = _.difference(applicationData.selectedGridSquare.clueMarks, [number]);
  arrangeClueMarks();
};

var addClueMarkToSelectedGridSquare = function (number) {
  applicationData.selectedGridSquare.clueMarks.push(number);
  arrangeClueMarks();
};

var arrangeClueMarks = function () {
  var arrangedClueMarks = [];
  for (var number = 1; number <= 9; number++) {
    if (slectedGridSquareClueMarksContainsNumber(number)) {
      arrangedClueMarks.push(number);
    } else {
      arrangedClueMarks.push(null);
    }
  }
  applicationData.selectedGridSquare.clueMarks = arrangedClueMarks;
};

var slectedGridSquareClueMarksContainsNumber = function (number) {
  return _.contains(applicationData.selectedGridSquare.clueMarks, number);
};

var clearGridSquare = function () {
  applicationData.selectedGridSquare.userInput = null;
  updateGridHighlights();
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var applicationStore = assign({}, EventEmitter.prototype, {
  getData: function () {
    return applicationData;
  },
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

dispatcher.register(function (action) {
  console.log(action.actionType);
  switch (action.actionType) {

    case actionTypes.INITIALIZE_APPLICATION:
      initialize();
      applicationStore.emitChange();
      break;

    case actionTypes.SELECT_GRID_SQUARE:
      selectGridSquare(action.gridSquare);
      applicationStore.emitChange();
      break;

    case actionTypes.MOVE_SELECTION_LEFT:
      moveSelectionLeft();
      applicationStore.emitChange();
      break;

    case actionTypes.MOVE_SELECTION_UP:
      moveSelectionUp();
      applicationStore.emitChange();
      break;

    case actionTypes.MOVE_SELECTION_RIGHT:
      moveSelectionRight();
      applicationStore.emitChange();
      break;

    case actionTypes.MOVE_SELECTION_DOWN:
      moveSelectionDown();
      applicationStore.emitChange();
      break;

    case actionTypes.CLEAR_SELECTION:
      unselectGridSquare();
      applicationStore.emitChange();
      break;

    case actionTypes.CLEAR_NUMBER:
      clearGridSquare();
      applicationStore.emitChange();
      break;

    case actionTypes.INSERT_CLUE:
      toggleClueMarkOnSelectedGridSquare(action.number);
      applicationStore.emitChange();
      break;

    case actionTypes.INSERT_NUMBER:
      assignNumberToSelectedGridSquare(action.number);
      applicationStore.emitChange();
      break;
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = applicationStore;
