'use strict';

var React = require('react');
var applicationActions = require('../actions/applicationActions');
var gridSquareStates = require('../flux/constants').gridSquareStates;
var Number = require('./number');
var ClueMarks = require('./clueMarks');

var GridSquare = React.createClass({
  propTypes: {
    squareData: React.PropTypes.object.isRequired
  },
  convertStateToClassName: function (state) {
    return state.split('_').join('-').toLowerCase();
  },
  composeClass: function () {
    var id = this.props.squareData.id;
    var className = 'grid-square ' + this.convertStateToClassName(this.props.squareData.state);
    if (this.props.squareData.hasConflicts()) {
      className += ' is-conflicted';
    }
    if ((id >= 27 && id <= 35) || (id >= 54 && id <= 62)) {
      className += ' top-border';
    }
    if (((id + 1) % 3 === 0) && ((id + 1) % 9 !== 0)) {
      className += ' right-border';
    }
    return className;
  },
  gridSquareSelected: function () {
    applicationActions.gridSquareSelected(this.props.squareData);
  },
  content: function () {
    if (this.props.squareData.isStatic || this.props.squareData.userInput) {
      return (<Number isStatic={this.props.squareData.isStatic} number={this.props.squareData.isStatic ? this.props.squareData.number : this.props.squareData.userInput} />);
    } else {
      return (<ClueMarks marks={this.props.squareData.clueMarks} />);
    }
  },
  render: function () {
    return (
      <div className={this.composeClass()} onClick={this.gridSquareSelected}>
        {this.content()}
      </div>
    );
  }
});

module.exports = GridSquare;