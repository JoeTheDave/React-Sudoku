'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var actionTypes = require('../flux/constants').actionTypes;
var CHANGE_EVENT = require('../flux/constants').changeEvent;
var gridSquareStates = require('../flux/constants').gridSquareStates;
var dispatcher = require('../flux/dispatcher');
var applicationActions = require('../actions/applicationActions');
var sudokuDataService = require('../services/SudokuDataService');
var SudokuGrid = require('../models/sudokuGrid');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var applicationData = {
  sudokuGrid: {
    gridSquares: [] //throws an error in application component if this isn't initialized.  Dirty and needs to be fixed.
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var initialize = function () {
  sudokuDataService.generatePuzzleData().then(function (sudokuData) {
    applicationActions.initializeSudokuData(sudokuData);
  });
};

var initializeSudokuData = function (sudokuData) {
  applicationData.sudokuGrid = new SudokuGrid(sudokuData);
};

var selectGridSquare = function (sudokuSquare) {
  applicationData.sudokuGrid.setSelectedGridSquare(sudokuSquare);
};

var moveSelectionLeft = function () {
  applicationData.sudokuGrid.moveSelectionLeft();
};

var moveSelectionUp = function () {
  applicationData.sudokuGrid.moveSelectionUp();
};

var moveSelectionRight = function () {
  applicationData.sudokuGrid.moveSelectionRight();
};

var moveSelectionDown = function () {
  applicationData.sudokuGrid.moveSelectionDown();
};

var unselectGridSquare = function () {
  applicationData.sudokuGrid.unselectGridSquare();
};

var assignNumberToSelectedGridSquare = function (number) {
  applicationData.sudokuGrid.assignNumberToSelectedGridSquare(number);
};

var clearGridSquare = function () {
  applicationData.sudokuGrid.assignNumberToSelectedGridSquare(null);
};

var toggleClueMarkOnSelectedGridSquare = function (number) {
  applicationData.sudokuGrid.toggleClueMarkOnSelectedGridSquare(number);
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
  //console.log(action.actionType);
  switch (action.actionType) {

    case actionTypes.INITIALIZE_APPLICATION:
      initialize();
      applicationStore.emitChange();
      break;

    case actionTypes.INITIALIZE_SUDOKU_DATA:
      initializeSudokuData(action.sudokuData);
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
