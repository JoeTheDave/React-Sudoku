'use strict';

var dispatcher = require('../flux/dispatcher');
var actionTypes = require('../flux/constants').actionTypes;

module.exports = {

	initializeApplication: function() {
    dispatcher.dispatch({
      actionType: actionTypes.INITIALIZE_APPLICATION
    });
	},

	gridSquareMouseEntered: function(gridSquare) {
    dispatcher.dispatch({
      actionType: actionTypes.GRID_SQUARE_MOUSE_ENTERED,
      gridSquare: gridSquare
    });
	},

	gridSquareMouseLeft: function(gridSquare) {
    dispatcher.dispatch({
      actionType: actionTypes.GRID_SQUARE_MOUSE_LEFT,
      gridSquare: gridSquare
    });
	}

};
