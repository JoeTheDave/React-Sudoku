'use strict';


import dispatcher from '../flux/dispatcher';
import { actionTypes } from '../flux/constants';

export default {

	initializeApplication () {
    dispatcher.dispatch({
      actionType: actionTypes.INITIALIZE_APPLICATION
    });
	},

  initializeSudokuData (sudokuData) {
    dispatcher.dispatch({
      actionType: actionTypes.INITIALIZE_SUDOKU_DATA,
      sudokuData: sudokuData
    });
  },

	gridSquareSelected (gridSquare) {
    dispatcher.dispatch({
      actionType: actionTypes.SELECT_GRID_SQUARE,
      gridSquare: gridSquare
    });
	}

};
