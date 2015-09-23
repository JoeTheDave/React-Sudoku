'use strict';

var React = require('react');
var applicationActions = require('../actions/applicationActions');
var gridSquareStates = require('../flux/constants').gridSquareStates;
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
    if (!this.props.squareData.isStatic) {
      className += ' is-user-input';
    }
    if (this.props.squareData.isConflicted) {
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
    if (this.props.squareData.isStatic) {
      return this.props.squareData.number;
    } else {
      if (this.props.squareData.userInput) {
        return this.props.squareData.userInput;
      } else {
        return (<ClueMarks marks={this.props.squareData.clueMarks} />);
      }
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