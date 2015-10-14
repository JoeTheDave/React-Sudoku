'use strict';

import dispatcher from '../flux/dispatcher';
import { actionTypes, keyCodes } from '../flux/constants';

export default {
	registerGlobalEventHandlers () {
		global.onkeydown = (event) => {
	    switch (event.keyCode) {
				case keyCodes.LEFT:
					dispatcher.dispatch({ actionType: actionTypes.MOVE_SELECTION_LEFT });
					break;
				case keyCodes.UP:
					dispatcher.dispatch({ actionType: actionTypes.MOVE_SELECTION_UP });
					break;
				case keyCodes.RIGHT:
					dispatcher.dispatch({ actionType: actionTypes.MOVE_SELECTION_RIGHT });
					break;
				case keyCodes.DOWN:
					dispatcher.dispatch({ actionType: actionTypes.MOVE_SELECTION_DOWN });
					break;
				case keyCodes.ESC:
					dispatcher.dispatch({ actionType: actionTypes.CLEAR_SELECTION });
					break;
				case keyCodes.SPACE:
					if (event.shiftKey) { dispatcher.dispatch({ actionType: actionTypes.CLEAR_CLUE_MARKS_FOR_SELECTED_GRID_SQUARE }); } 
					else if (event.ctrlKey) { dispatcher.dispatch({ actionType: actionTypes.CLEAR_ALL_CLUE_MARKS }); } 
					else { dispatcher.dispatch({ actionType: actionTypes.CLEAR_NUMBER }); }
					break;
				case keyCodes.ONE:
				case keyCodes.ONE_KEYPAD:
					dispatcher.dispatch({ actionType: (event.shiftKey ? actionTypes.INSERT_CLUE : actionTypes.INSERT_NUMBER), number: 1 });
					break;
				case keyCodes.TWO:
				case keyCodes.TWO_KEYPAD:
					dispatcher.dispatch({ actionType: (event.shiftKey ? actionTypes.INSERT_CLUE : actionTypes.INSERT_NUMBER), number: 2 });
					break;
				case keyCodes.THREE:
				case keyCodes.THREE_KEYPAD:
					dispatcher.dispatch({ actionType: (event.shiftKey ? actionTypes.INSERT_CLUE : actionTypes.INSERT_NUMBER), number: 3 });
					break;
				case keyCodes.FOUR:
				case keyCodes.FOUR_KEYPAD:
					dispatcher.dispatch({ actionType: (event.shiftKey ? actionTypes.INSERT_CLUE : actionTypes.INSERT_NUMBER), number: 4 });
					break;
				case keyCodes.FIVE:
				case keyCodes.FIVE_KEYPAD:
					dispatcher.dispatch({ actionType: (event.shiftKey ? actionTypes.INSERT_CLUE : actionTypes.INSERT_NUMBER), number: 5 });
					break;
				case keyCodes.SIX:
				case keyCodes.SIX_KEYPAD:
					dispatcher.dispatch({ actionType: (event.shiftKey ? actionTypes.INSERT_CLUE : actionTypes.INSERT_NUMBER), number: 6 });
					break;
				case keyCodes.SEVEN:
				case keyCodes.SEVEN_KEYPAD:
					dispatcher.dispatch({ actionType: (event.shiftKey ? actionTypes.INSERT_CLUE : actionTypes.INSERT_NUMBER), number: 7 });
					break;
				case keyCodes.EIGHT:
				case keyCodes.EIGHT_KEYPAD:
					dispatcher.dispatch({ actionType: (event.shiftKey ? actionTypes.INSERT_CLUE : actionTypes.INSERT_NUMBER), number: 8 });
					break;
				case keyCodes.NINE:
				case keyCodes.NINE_KEYPAD:
					dispatcher.dispatch({ actionType: (event.shiftKey ? actionTypes.INSERT_CLUE : actionTypes.INSERT_NUMBER), number: 9 });
					break;
				case keyCodes.QUESTION_MARK:
					if (event.shiftKey) { dispatcher.dispatch({ actionType: actionTypes.TOGGLE_ACTIVE_MARKS_MODE }); }
					if (event.ctrlKey) { dispatcher.dispatch({ actionType: actionTypes.SHOW_ANSWERS }); }
					break;
				default:
					break;
	    }
	  };
	}
};