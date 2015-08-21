'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var actionTypes = require('../flux/constants').actionTypes;
var CHANGE_EVENT = require('../flux/constants').changeEvent;
var styleRules = require('../flux/constants').styleRules;
var dispatcher = require('../flux/dispatcher');
var sudokuService = require('../services/Sudoku.js');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var applicationData = {
  grid: []
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var initialize = function () {
  applicationData.grid = sudokuService.generatePuzzleData();
  resetAllGridSquareColors();
};

var resetAllGridSquareColors = function () {
  _.each(applicationData.grid, function (gridSquare) {
    gridSquare.color = styleRules.colors.gray;
  });
};

var hightlightRelationships = function (gridSquare) {
  gridSquare.color = styleRules.colors.yellow;
  _.each(gridSquare.relationships, function (relatedGridSquare) {
    relatedGridSquare.color = styleRules.colors.orange;
  });
};

var gridSquareHover = function (gridSquare) {
  hightlightRelationships(gridSquare);
};

var gridSquareExit = function (gridSquare) {
  resetAllGridSquareColors();
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
      break;
    case actionTypes.GRID_SQUARE_MOUSE_ENTERED:
      gridSquareHover(action.gridSquare);
      break;
    case actionTypes.GRID_SQUARE_MOUSE_LEFT:
      gridSquareExit(action.gridSquare);
      break;
  }
  applicationStore.emitChange();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = applicationStore;
