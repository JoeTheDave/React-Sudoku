'use strict';

var React = require('react');
var _ = require('lodash')

var ClueMarks = React.createClass({
  propTypes: {
    marks: React.PropTypes.array.isRequired
  },
  markOptions: [],//[1, 2, 3, 4, 5, 6, 7, 8, 9],
  render: function () {
    var self = this;
    return (
      <div>
        {this.props.marks.map(function(mark, index) {
          return (
            <div key={index}>{mark}</div>
          );
        })}
      </div>
    );
  }
});

module.exports = ClueMarks;
