'use strict';

var keymirror = require('keymirror');

module.exports = {
    actionTypes: keymirror({
        INITIALIZE_APPLICATION: null
    }),
    changeEvent: 'change'
};
