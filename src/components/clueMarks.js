'use strict';

var React = require('react');
var _ = require('lodash')

var ClueMarks = React.createClass({
  propTypes: {
    marks: React.PropTypes.array.isRequired
  },
  render: function () {
    var self = this;
    return (
      <div className="clue-marks">
        {this.props.marks.map(function(mark, index) {
          return (
            <div className="clue-mark" key={index}>{mark}</div>
          );
        })}
      </div>
    );
  }
});

module.exports = ClueMarks;
