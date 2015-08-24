'use strict';

var React = require('react');
var applicationActions = require('../actions/applicationActions');

var GridSquare = React.createClass({
  propTypes: {
    squareData: React.PropTypes.object.isRequired
  },
  composeStyles: function () {
    var styles = {
      float: 'left',
      backgroundColor: this.props.squareData.color,
      fontWeight: 'bold',
      padding: '10px',
      fontSize: '24px',
      width: '50px',
      height: '50px',
      textAlign: 'center',
      boxSizing: 'border-box',
      fontFamily: 'verdana'
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
    return styles;
  },
  onMouseEnter: function () {
    applicationActions.gridSquareMouseEntered(this.props.squareData);
  },
  onMouseLeave: function () {
    applicationActions.gridSquareMouseLeft(this.props.squareData);
  },
  render: function () {
    return (
      <div style={this.composeStyles()} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        {this.props.squareData.number}
      </div>
    );
  }
});

module.exports = GridSquare;
