'use strict';

var React = require('react');
var applicationActions = require('../actions/applicationActions');
var applicationStore = require('../stores/applicationStore');
var GridSquare = require('./gridSquare');

var Application = React.createClass({
  getInitialState: function() {
    return applicationStore.getData();
  },
  componentDidMount: function() {
    applicationStore.addChangeListener(this.updateState);
    applicationActions.initializeApplication();
  },
  updateState: function() {
    this.setState(applicationStore.getData());
  },
  composeStyles: function () {
    return {
      width: '450px',
      margin: '100px auto',
      borderLeft: 'solid 1px #CCCCCC',
      borderBottom: 'solid 1px #CCCCCC'
    };
  },
  clearStyle: function () {
    return {
      clear: 'both'
    }
  },
  render: function() {
    //console.log(this.state);
    return (
      <div style={this.composeStyles()}>
        {this.state.grid.map(function(gridCell, index) {
          return (
            <GridSquare key={index} squareData={gridCell} />
          );
        })}
        <div style={this.clearStyle()}></div>
      </div>
    );
  }
});

module.exports = Application;
