'use strict';

var React = require('react');

var Number = React.createClass({
  propTypes: {
    number: React.PropTypes.number.isRequired,
    isStatic: React.PropTypes.bool.isRequired
  },
  composeClass: function () {
    var className = 'number';
    if (this.props.isStatic) {
      className += ' is-static';
    }
    return className;
  },
  render: function () {
    return (
      <div className={this.composeClass()}>
        {this.props.number}
      </div>
    );
  }
});

module.exports = Number;