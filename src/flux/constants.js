'use strict';

var keymirror = require('keymirror');

module.exports = {
  actionTypes: keymirror({
    INITIALIZE_APPLICATION: null,
    INITIALIZE_SUDOKU_DATA: null,

    MOVE_SELECTION_LEFT: null,
    MOVE_SELECTION_UP: null,
    MOVE_SELECTION_RIGHT: null,
    MOVE_SELECTION_DOWN: null,
    CLEAR_SELECTION: null,
    CLEAR_NUMBER: null,
    INSERT_NUMBER: null,
    INSERT_CLUE: null,

    SELECT_GRID_SQUARE: null
  }),
  changeEvent: 'change',
  gridSquareStates: keymirror({
		PASSIVE: null,
		ACTIVE: null,
		RELATED_TO_ACTIVE: null
  })
};
