'use strict';

import React from 'react';

let Number = React.createClass({
  propTypes: {
    number: React.PropTypes.number.isRequired,
    isStatic: React.PropTypes.bool.isRequired
  },
  composeClass: function () {
    let className = 'number';
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

export default Number;