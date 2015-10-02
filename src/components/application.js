'use strict';

var React = require('react');
var applicationActions = require('../actions/applicationActions');
var globalActions = require('../actions/globalActions')
var applicationStore = require('../stores/applicationStore');
var GridSquare = require('./gridSquare');

var Application = React.createClass({
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
      return (
        <div className="application-component">
          {this.state.sudokuGrid.gridSquares.map(function(sudokuSquare, index) {
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
    console.log(this.state);
    return this.content();
  }
});

module.exports = Application;