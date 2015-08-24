'use strict';

var dispatcher = require('../flux/dispatcher');
var actionTypes = require('../flux/constants').actionTypes;

module.exports = {

	registerGlobalEventHandlers: function () {
		global.onkeydown = function(event) {
	    switch (event.keyCode) {
	      case 37:
	        dispatcher.dispatch({ actionType: actionTypes.LEFT_ARROW_KEY_PRESSED });
	        break;
	      case 38:
	        dispatcher.dispatch({ actionType: actionTypes.UP_ARROW_KEY_PRESSED });
	        break;
	      case 39:
	        dispatcher.dispatch({ actionType: actionTypes.RIGHT_ARROW_KEY_PRESSED });
	        break;
	      case 40:
	        dispatcher.dispatch({ actionType: actionTypes.DOWN_ARROW_KEY_PRESSED });
	        break;
	      case 27:
	        dispatcher.dispatch({ actionType: actionTypes.ESC_KEY_PRESSED });
	        break;
	      case 32:
	        dispatcher.dispatch({ actionType: actionTypes.SPACE_KEY_PRESSED });
	        break;
	      case 49:
	      	if (event.shiftKey) {
	        	dispatcher.dispatch({ actionType: actionTypes.SHIFT_ONE_KEY_PRESSED });
	      	} else {
	      		dispatcher.dispatch({ actionType: actionTypes.ONE_KEY_PRESSED });
	      	}
	        break;
	      case 50:
	        if (event.shiftKey) {
      			dispatcher.dispatch({ actionType: actionTypes.SHIFT_TWO_KEY_PRESSED });
	      	} else {
	      		dispatcher.dispatch({ actionType: actionTypes.TWO_KEY_PRESSED });
	      	}
	        break;
	      case 51:
	        if (event.shiftKey) {
      			dispatcher.dispatch({ actionType: actionTypes.SHIFT_THREE_KEY_PRESSED });
	      	} else {
	      		dispatcher.dispatch({ actionType: actionTypes.THREE_KEY_PRESSED });
	      	}
	        break;
	      case 52:
	        if (event.shiftKey) {
      			dispatcher.dispatch({ actionType: actionTypes.SHIFT_FOUR_KEY_PRESSED });
	      	} else {
	      		dispatcher.dispatch({ actionType: actionTypes.FOUR_KEY_PRESSED });
	      	}
	        break;
	      case 53:
	        if (event.shiftKey) {
      			dispatcher.dispatch({ actionType: actionTypes.SHIFT_FIVE_KEY_PRESSED });
	      	} else {
	      		dispatcher.dispatch({ actionType: actionTypes.FIVE_KEY_PRESSED });
	      	}
	        break;
	      case 54:
	        if (event.shiftKey) {
      			dispatcher.dispatch({ actionType: actionTypes.SHIFT_SIX_KEY_PRESSED });
	      	} else {
	      		dispatcher.dispatch({ actionType: actionTypes.SIX_KEY_PRESSED });
	      	}
	        break;
	      case 55:
	        if (event.shiftKey) {
      			dispatcher.dispatch({ actionType: actionTypes.SHIFT_SEVEN_KEY_PRESSED });
	      	} else {
	      		dispatcher.dispatch({ actionType: actionTypes.SEVEN_KEY_PRESSED });
	      	}
	        break;
	      case 56:
	        if (event.shiftKey) {
      			dispatcher.dispatch({ actionType: actionTypes.SHIFT_EIGHT_KEY_PRESSED });
	      	} else {
	      		dispatcher.dispatch({ actionType: actionTypes.EIGHT_KEY_PRESSED });
	      	}
	        break;
	      case 57:
	        if (event.shiftKey) {
      			dispatcher.dispatch({ actionType: actionTypes.SHIFT_NINE_KEY_PRESSED });
	      	} else {
	      		dispatcher.dispatch({ actionType: actionTypes.NINE_KEY_PRESSED });
	      	}
	        break;
	      default:
	        //console.log(event.keyCode);
	        break;
	    }
	  };
	}

};