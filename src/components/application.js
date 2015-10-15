'use strict';

import React from 'react';
import applicationActions from '../actions/applicationActions';
import globalActions from '../actions/globalActions';
import applicationStore from '../stores/applicationStore';
import GridSquare from './gridSquare';

class Application extends React.Component {
  constructor (props) {
    super(props);
    this.state = applicationStore.getData();
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount () {
    applicationStore.addChangeListener(this.updateState);
    applicationActions.initializeApplication();
    globalActions.registerGlobalEventHandlers();
  }

  updateState () {
    this.setState(applicationStore.getData());
  }

  render () {
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
  }

};

export default Application;