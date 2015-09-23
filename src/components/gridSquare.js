'use strict';

var React = require('react');
var applicationActions = require('../actions/applicationActions');
var gridSquareStates = require('../flux/constants').gridSquareStates;
var ClueMarks = require('./clueMarks');

var GridSquare = React.createClass({
  propTypes: {
    squareData: React.PropTypes.object.isRequired
  },
  composeStyles: function () {
    var styles = {
      float: 'left',
      fontWeight: 'bold',
      padding: '10px',
      fontSize: '24px',
      width: '50px',
      height: '50px',
      textAlign: 'center',
      boxSizing: 'border-box',
      fontFamily: 'verdana',
      cursor: 'pointer',

      userSelect: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none'
    };
    var id = this.props.squareData.id;
    if ((id >= 27 && id <= 35) || (id >= 54 && id <= 62)) {
      styles.borderTop = 'solid 5px #CCCCCC';
    } else {
      styles.borderTop = 'solid 1px #CCCCCC';
    }
    if (((id + 1) % 3 === 0) && ((id + 1) % 9 !== 0)) {
      styles.borderRight = 'solid 5px #CCCCCC';
    } else {
      styles.borderRight = 'solid 1px #CCCCCC';
    }
    switch (this.props.squareData.state) {
      case gridSquareStates.PASSIVE:
        styles.backgroundColor = '#E9E9E9';
        break;
      case gridSquareStates.ACTIVE:
        styles.backgroundColor = '#FFFFCC';
        break;
      case gridSquareStates.RELATED_TO_ACTIVE:
        styles.backgroundColor = '#C1D7DE';
        break;
    }
    if (!this.props.squareData.isStatic) {
      styles.color = '#0000FF';
    }
    if (this.props.squareData.isConflicted) {
      styles.textShadow = '3px -3px 30px rgba(255, 0, 0, 1), 3px 3px 30px rgba(255, 0, 0, 1), -3px 3px 30px rgba(255, 0, 0, 1), -3px -3px 30px rgba(255, 0, 0, 1)';
    }
    return styles;
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
      <div style={this.composeStyles()} onClick={this.gridSquareSelected}>
        {this.content()}
      </div>
    );
  }
});

module.exports = GridSquare;
