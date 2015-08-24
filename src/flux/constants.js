'use strict';

var keymirror = require('keymirror');

module.exports = {
  actionTypes: keymirror({
    INITIALIZE_APPLICATION: null,

    LEFT_ARROW_KEY_PRESSED: null,
    UP_ARROW_KEY_PRESSED: null,
    RIGHT_ARROW_KEY_PRESSED: null,
    DOWN_ARROW_KEY_PRESSED: null,
    ESC_KEY_PRESSED: null,
    SPACE_KEY_PRESSED: null,
    SHIFT_ONE_KEY_PRESSED: null,
    ONE_KEY_PRESSED: null,
    SHIFT_TWO_KEY_PRESSED: null,
    TWO_KEY_PRESSED: null,
    SHIFT_THREE_KEY_PRESSED: null,
    THREE_KEY_PRESSED: null,
    SHIFT_FOUR_KEY_PRESSED: null,
    FOUR_KEY_PRESSED: null,
    SHIFT_FIVE_KEY_PRESSED: null,
    FIVE_KEY_PRESSED: null,
    SHIFT_SIX_KEY_PRESSED: null,
    SIX_KEY_PRESSED: null,
    SHIFT_SEVEN_KEY_PRESSED: null,
    SEVEN_KEY_PRESSED: null,
    SHIFT_EIGHT_KEY_PRESSED: null,
    EIGHT_KEY_PRESSED: null,
    SHIFT_NINE_KEY_PRESSED: null,
    NINE_KEY_PRESSED: null,

    GRID_SQUARE_SELECTED: null
  }),
  changeEvent: 'change',
  gridSquareStates: keymirror({
		PASSIVE: null,
		ACTIVE: null,
		RELATED_TO_ACTIVE: null
  })
};
