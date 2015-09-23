'use strict';

var React = require('react');
var applicationActions = require('../actions/applicationActions');
var globalActions = require('../actions/globalActions')
var applicationStore = require('../stores/applicationStore');
var GridSquare = require('./gridSquare');

var Application = React.createClass({
  getInitialState: function() {
    return applicationStore.getData();
  },
  componentDidMount: function() {
    applicationStore.addChangeListener(this.updateState);
    applicationActions.initializeApplication();
    globalActions.registerGlobalEventHandlers();
  },
  updateState: function() {
    this.setState(applicationStore.getData());
  },
  render: function() {
    //console.log(this.state);
    return (
      <div className="application-component">
        {this.state.grid.map(function(gridSquare, index) {
          return (
            <GridSquare key={index} squareData={gridSquare} />
          );
        })}
        <div className="clear"></div>
      </div>
    );
  }
});

module.exports = Application;