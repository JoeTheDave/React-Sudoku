'use strict';

var React = require('react');
var _ = require('lodash')

var ClueMarks = React.createClass({
  propTypes: {
    marks: React.PropTypes.array.isRequired
  },
  markOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  clueMarkStyles: {
    float: 'left',
    fontSize: '8px'
  },
  render: function () {
    var self = this;
    return (
      <div>
        {this.markOptions.map(function(mark, index) {
          console.log();
          return (
            <div key={index} styles={self.clueMarkStyles}>{mark}</div>
          );
        })}
      </div>
    );
  }
});

module.exports = ClueMarks;
