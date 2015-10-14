'use strict';

import React from 'react';
import applicationActions from '../actions/applicationActions';
import globalActions from '../actions/globalActions';
import applicationStore from '../stores/applicationStore';
import GridSquare from './gridSquare';

let Application = React.createClass({
  getInitialState: function () {
    return applicationStore.getData();
  },
  componentDidMount: function () {
    applicationStore.addChangeListener(this.updateState);
    applicationActions.initializeApplication();
    globalActions.registerGlobalEventHandlers();
  },
  updateState: function () {
    this.setState(applicationStore.getData());
  },
  content: function () {
    if (this.state.sudokuGrid) {
      let componentClass = 'application-component' +
        (this.state.sudokuGrid.activeMarksMode ? ' active-marks-mode' : '') +
        (this.state.sudokuGrid.showAnswers ? ' show-answers' : '') + 
        (this.state.sudokuGrid.puzzleIsComplete ? ' puzzle-complete' : '');
      return (
        <div className={componentClass}>
          {this.state.sudokuGrid.gridSquares.map((sudokuSquare, index) => {
            return (
              <GridSquare key={index} squareData={sudokuSquare} />
            );
          })}
          <div className="clear"></div>
        </div>
      );
    } else {
      return (<div></div>);
    }
  },
  render: function () {
    return this.content();
  }
});

export default Application;