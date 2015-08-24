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
    gridSquare.candidate = null;
  });
};

var hideNumbers = function (numberToHide) {
  _.each(_.take(_.shuffle(applicationData.grid), numberToHide), function (gridSquare) {
    gridSquare.isStatic = false;
  });
};

var setAllGridSquaresPassive = function () {
  _.each(applicationData.grid, function (gridSquare) {
    gridSquare.state = gridSquareStates.PASSIVE;
  });
};

var gridSquareSelected = function (gridSquare) {
  applicationData.selectedGridSquare = gridSquare;
  setAllGridSquaresPassive();
  if (gridSquare) {
    hightlightRelationships(gridSquare);
  }
};

var hightlightRelationships = function (gridSquare) {
  gridSquare.state = gridSquareStates.ACTIVE;
  _.each(gridSquare.relationships, function (relatedGridSquare) {
    relatedGridSquare.state = gridSquareStates.RELATED_TO_ACTIVE;
  });
};

var findGridSquareById = function (id) {
  return _.find(applicationData.grid, function (gridSquare) {
    return gridSquare.id === id;
  });
};

var moveSelectionLeft = function () {
  gridSquareSelected(applicationData.selectedGridSquare.leftNeighbor);
};

var moveSelectionUp = function () {
  gridSquareSelected(applicationData.selectedGridSquare.upperNeighbor);
};

var moveSelectionRight = function () {
  gridSquareSelected(applicationData.selectedGridSquare.rightNeighbor);
};

var moveSelectionDown = function () {
  gridSquareSelected(applicationData.selectedGridSquare.lowerNeighbor);
};

var unselectGridSquare = function () {
  gridSquareSelected(null);
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
      break;
    case actionTypes.GRID_SQUARE_SELECTED:
      gridSquareSelected(action.gridSquare);
      break;
    case actionTypes.LEFT_ARROW_KEY_PRESSED:
      moveSelectionLeft();
      break;
    case actionTypes.UP_ARROW_KEY_PRESSED:
      moveSelectionUp();
      break;
    case actionTypes.RIGHT_ARROW_KEY_PRESSED:
      moveSelectionRight();
      break;
    case actionTypes.DOWN_ARROW_KEY_PRESSED:
      moveSelectionDown();
      break;
    case actionTypes.ESC_KEY_PRESSED:
      unselectGridSquare();
      break;
    case actionTypes.SPACE_KEY_PRESSED:

      break;
    case actionTypes.SHIFT_ONE_KEY_PRESSED:

      break;
    case actionTypes.ONE_KEY_PRESSED:

      break;
    case actionTypes.SHIFT_TWO_KEY_PRESSED:

      break;
    case actionTypes.TWO_KEY_PRESSED:

      break;
    case actionTypes.SHIFT_THREE_KEY_PRESSED:

      break;
    case actionTypes.THREE_KEY_PRESSED:

      break;
    case actionTypes.SHIFT_FOUR_KEY_PRESSED:

      break;
    case actionTypes.FOUR_KEY_PRESSED:

      break;
    case actionTypes.SHIFT_FIVE_KEY_PRESSED:

      break;
    case actionTypes.FIVE_KEY_PRESSED:

      break;
    case actionTypes.SHIFT_SIX_KEY_PRESSED:

      break;
    case actionTypes.SIX_KEY_PRESSED:

      break;
    case actionTypes.SHIFT_SEVEN_KEY_PRESSED:

      break;
    case actionTypes.SEVEN_KEY_PRESSED:

      break;
    case actionTypes.SHIFT_EIGHT_KEY_PRESSED:

      break;
    case actionTypes.EIGHT_KEY_PRESSED:

      break;
    case actionTypes.SHIFT_NINE_KEY_PRESSED:

      break;
    case actionTypes.NINE_KEY_PRESSED:

      break;
  }
  applicationStore.emitChange();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = applicationStore;
