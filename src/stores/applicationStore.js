'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var actionTypes = require('../flux/constants').actionTypes;
var CHANGE_EVENT = require('../flux/constants').changeEvent;
var dispatcher = require('../flux/dispatcher');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var applicationData = {
  grid: []
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var initializeGridData = function () {
  for (var x = 0; x <= 80; x++) {
    applicationData.grid.push(createGridSquare(x))
  }
};

var createGridSquare = function (index) {
  return {
    index: index,
    number: 0,
    relationships: [],
    color: 0
  };
};

var numberOfUndefinedGridCells = function () {
  var count = 0;
  for (var x = 0; x <= 80; x++) {
    count += applicationData.grid[x].number === 0 ? 1 : 0;
  }
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
  switch (action.actionType) {
    case actionTypes.INITIALIZE_APPLICATION:
      initializeGridData();
      break;
  }
  applicationStore.emitChange();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = applicationStore;
