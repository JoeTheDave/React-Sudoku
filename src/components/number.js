'use strict';

import React from 'react';

class Number extends React.Component {
  constructor (props) {
    super(props);
  }
  
  composeClass () {
    let className = 'number';
    if (this.props.isStatic) {
      className += ' is-static';
    }
    return className;
  }

  render () {
    return (
      <div className={this.composeClass()}>
        {this.props.number}
      </div>
    );
  }

};

Number.propTypes = {
  number: React.PropTypes.number.isRequired,
  isStatic: React.PropTypes.bool.isRequired
}

export default Number;