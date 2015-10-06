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

var applicationData = {};

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

dispatcher.register(function (action) {
  switch (action.actionType) {

    case actionTypes.INITIALIZE_APPLICATION:
      sudokuDataService.generatePuzzleData().then(function (sudokuData) {
        applicationActions.initializeSudokuData(sudokuData);
      });
      applicationStore.emitChange();
      break;

    case actionTypes.INITIALIZE_SUDOKU_DATA:
      applicationData.sudokuGrid = new SudokuGrid(action.sudokuData);
      applicationStore.emitChange();
      break;

    case actionTypes.SELECT_GRID_SQUARE:
      applicationData.sudokuGrid.setSelectedGridSquare(action.gridSquare);
      applicationStore.emitChange();
      break;

    case actionTypes.MOVE_SELECTION_LEFT:
      applicationData.sudokuGrid.moveSelectionLeft();
      applicationStore.emitChange();
      break;

    case actionTypes.MOVE_SELECTION_UP:
      applicationData.sudokuGrid.moveSelectionUp();
      applicationStore.emitChange();
      break;

    case actionTypes.MOVE_SELECTION_RIGHT:
      applicationData.sudokuGrid.moveSelectionRight();
      applicationStore.emitChange();
      break;

    case actionTypes.MOVE_SELECTION_DOWN:
      applicationData.sudokuGrid.moveSelectionDown();
      applicationStore.emitChange();
      break;

    case actionTypes.CLEAR_SELECTION:
      applicationData.sudokuGrid.unselectGridSquare();
      applicationStore.emitChange();
      break;

    case actionTypes.CLEAR_NUMBER:
      applicationData.sudokuGrid.assignNumberToSelectedGridSquare(null);
      applicationStore.emitChange();
      break;

    case actionTypes.CLEAR_CLUE_MARKS_FOR_SELECTED_GRID_SQUARE:
      applicationData.sudokuGrid.clearClueMarksFromSelectedGridSquare();
      applicationStore.emitChange();
      break;

    case actionTypes.INSERT_CLUE:
      applicationData.sudokuGrid.toggleClueMarkOnSelectedGridSquare(action.number);
      applicationStore.emitChange();
      break;

    case actionTypes.INSERT_NUMBER:
      applicationData.sudokuGrid.assignNumberToSelectedGridSquare(action.number);
      applicationStore.emitChange();
      break;

    case actionTypes.TOGGLE_ACTIVE_MARKS_MODE:
      applicationData.sudokuGrid.toggleActiveMarksMode();
      applicationStore.emitChange();
      break;

    case actionTypes.CLEAR_ALL_CLUE_MARKS:
      applicationData.sudokuGrid.clearAllClueMarks();
      applicationStore.emitChange();
      break;

    case actionTypes.SHOW_ANSWERS:
      applicationData.sudokuGrid.toggleShowAnswersMode();
      applicationStore.emitChange();
      break;
  }
});

module.exports = applicationStore;
