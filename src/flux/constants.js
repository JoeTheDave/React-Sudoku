'use strict';

var keymirror = require('keymirror');

module.exports = {
  actionTypes: keymirror({
    INITIALIZE_APPLICATION: null,
    GRID_SQUARE_MOUSE_ENTERED: null,
    GRID_SQUARE_MOUSE_LEFT: null
  }),
  changeEvent: 'change',
  styleRules: {
  	colors: {
  		gray: '#E9E9E9',
  		yellow: '#FFFF00',
  		orange: '#FFAA00'
  	}
  }
};
