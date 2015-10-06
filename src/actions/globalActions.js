'use strict';

var dispatcher = require('../flux/dispatcher');
var actionTypes = require('../flux/constants').actionTypes;

module.exports = {
	registerGlobalEventHandlers: function () {
		global.onkeydown = function(event) {
	    switch (event.keyCode) {
		case 37: //left
			dispatcher.dispatch({ actionType: actionTypes.MOVE_SELECTION_LEFT });
			break;
		case 38: //up
			dispatcher.dispatch({ actionType: actionTypes.MOVE_SELECTION_UP });
			break;
		case 39: //right
			dispatcher.dispatch({ actionType: actionTypes.MOVE_SELECTION_RIGHT });
			break;
		case 40: //down
			dispatcher.dispatch({ actionType: actionTypes.MOVE_SELECTION_DOWN });
			break;
		case 27: //esc
			dispatcher.dispatch({ actionType: actionTypes.CLEAR_SELECTION });
			break;
		case 32: //space
			if (event.shiftKey) {
				dispatcher.dispatch({ actionType: actionTypes.CLEAR_CLUE_MARKS_FOR_SELECTED_GRID_SQUARE });
			} else if (event.ctrlKey) {
				dispatcher.dispatch({ actionType: actionTypes.CLEAR_ALL_CLUE_MARKS });      	
			} else {
				dispatcher.dispatch({ actionType: actionTypes.CLEAR_NUMBER });
			}
			break;
		case 49: //1
		case 97:
			dispatcher.dispatch({ actionType: (event.shiftKey ? actionTypes.INSERT_CLUE : actionTypes.INSERT_NUMBER), number: 1 });
			break;
		case 50: //2
		case 98:
			dispatcher.dispatch({ actionType: (event.shiftKey ? actionTypes.INSERT_CLUE : actionTypes.INSERT_NUMBER), number: 2 });
			break;
		case 51: //3
		case 99:
			dispatcher.dispatch({ actionType: (event.shiftKey ? actionTypes.INSERT_CLUE : actionTypes.INSERT_NUMBER), number: 3 });
			break;
		case 52: //4
		case 100:
			dispatcher.dispatch({ actionType: (event.shiftKey ? actionTypes.INSERT_CLUE : actionTypes.INSERT_NUMBER), number: 4 });
			break;
		case 53: //5
		case 101:
			dispatcher.dispatch({ actionType: (event.shiftKey ? actionTypes.INSERT_CLUE : actionTypes.INSERT_NUMBER), number: 5 });
			break;
		case 54: //6
		case 102:
			dispatcher.dispatch({ actionType: (event.shiftKey ? actionTypes.INSERT_CLUE : actionTypes.INSERT_NUMBER), number: 6 });
			break;
		case 55: //7
		case 103:
			dispatcher.dispatch({ actionType: (event.shiftKey ? actionTypes.INSERT_CLUE : actionTypes.INSERT_NUMBER), number: 7 });
			break;
		case 56: //8
		case 104:
			dispatcher.dispatch({ actionType: (event.shiftKey ? actionTypes.INSERT_CLUE : actionTypes.INSERT_NUMBER), number: 8 });
			break;
		case 57: //9
		case 105:
			dispatcher.dispatch({ actionType: (event.shiftKey ? actionTypes.INSERT_CLUE : actionTypes.INSERT_NUMBER), number: 9 });
			break;
		case 191:
			if (event.shiftKey) {
				dispatcher.dispatch({ actionType: actionTypes.TOGGLE_ACTIVE_MARKS_MODE });
			}
			if (event.ctrlKey) {
				dispatcher.dispatch({ actionType: actionTypes.SHOW_ANSWERS });
			}
			break;
		default:
			break;
	    }
	  };
	}
};