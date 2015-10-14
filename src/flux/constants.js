'use strict';

let keymirror = require('keymirror');

export const actionTypes = keymirror({
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
  TOGGLE_ACTIVE_MARKS_MODE: null,
  SELECT_GRID_SQUARE: null,
  SHOW_ANSWERS: null,
  CLEAR_ALL_CLUE_MARKS: null,
  CLEAR_CLUE_MARKS_FOR_SELECTED_GRID_SQUARE: null
});

export const changeEvent = 'change';

export const gridSquareStates = keymirror({
	PASSIVE: null,
	ACTIVE: null,
	RELATED_TO_ACTIVE: null
});

export const keyCodes = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ESC: 27,
    SPACE: 32,
    ONE: 49,
    ONE_KEYPAD: 97,
    TWO: 50,
    TWO_KEYPAD: 98,
    THREE: 51,
    THREE_KEYPAD: 99,
    FOUR: 52,
    FOUR_KEYPAD: 100,
    FIVE: 53,
    FIVE_KEYPAD: 101,
    SIX: 54,
    SIX_KEYPAD: 102,
    SEVEN: 55,
    SEVEN_KEYPAD: 103,
    EIGHT: 56,
    EIGHT_KEYPAD: 104,
    NINE: 57,
    NINE_KEYPAD: 105,
    QUESTION_MARK: 191
};

export default {
  actionTypes,
  changeEvent,
  gridSquareStates,
  keyCodes
};