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

// var addGridSquareProperties = function() {
//   _.each(applicationData.grid, function (gridSquare) {
//     gridSquare.state = gridSquareStates.PASSIVE;
//     gridSquare.isStatic = true;
//     gridSquare.userInput = null;
//     gridSquare.isConflicted = false;
//     gridSquare.clueMarks = [];
//     gridSquare.setStatusToPassive = function () {
//       this.state = gridSquareStates.PASSIVE;
//     };
//     gridSquare.setStatusToActive = function () {
//       this.state = gridSquareStates.ACTIVE;
//     };
//     gridSquare.setStatusToRelatedToActive = function () {
//       this.state = gridSquareStates.RELATED_TO_ACTIVE;
//     };
//   });
// };

// var hideNumbers = function (numberToHide) {
//   _.each(_.take(_.shuffle(applicationData.grid), numberToHide), function (gridSquare) {
//     gridSquare.isStatic = false;
//   });
// };

var selectGridSquare = function (sudokuSquare) {
  applicationData.sudokuGrid.setSelectedGridSquare(sudokuSquare);
  //updateGridHighlights();
};

// var updateGridHighlights = function () {
//   setAllGridSquaresPassive();
//   highlightRelationships(applicationData.selectedGridSquare);
//   //highlightConflicts();
//   highlightActiveGridSquare(applicationData.selectedGridSquare);
// };

// var setAllGridSquaresPassive = function () {
//   _.each(applicationData.grid, function (gridSquare) {
//     gridSquare.setStatusToPassive();
//   });
// };

var highlightRelationships = function (gridSquare) {
  if (gridSquare) {
    _.each(gridSquare.relationships, function (relatedGridSquare) {
      relatedGridSquare.setStatusToRelatedToActive();
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

// var highlightActiveGridSquare = function (gridSquare) {
//   if (gridSquare) {
//     gridSquare.setStatusToActive();
//   }
// };

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
  if (applicationData.selectedGridSquare && !applicationData.selectedGridSquare.isStatic)
  {
    applicationData.selectedGridSquare.userInput = number;
    updateGridHighlights();
  }
};

var eraseClueMarksForGridSquare = function (gridSquare) {
  gridSquare.clueMarks = [];

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
  arrangeClueMarksForGridSquare(applicationData.selectedGridSquare);
};

var addClueMarkToSelectedGridSquare = function (number) {
  applicationData.selectedGridSquare.clueMarks.push(number);
  arrangeClueMarksForGridSquare(applicationData.selectedGridSquare);
};

var arrangeClueMarksForGridSquare = function (gridSquare) {
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
